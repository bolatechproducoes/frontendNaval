// Importa os metódos call, put, all e takeLatest do redux-saga/effects
import { call, put, all, takeLatest } from 'redux-saga/effects';
// Importa o metódo toast do toastify para gerar mensagens instantâneas
import { toast } from 'react-toastify';
// Importa o metódo get do lodash
import { get } from 'lodash';
// Importa as ações definidas no arquivo actions.js como actions
import * as actions from './actions';
// Importa os tipos definidos no arquivo types.js como types
import * as types from '../types';
// Importa o axios com suas configurações do arquivo axios.js
import axios from '../../../services/axios';
// Importa o history com suas configurações do arquivo history.js
import history from '../../../services/history';

// O saga utiliza função geradora (function*)
function* loginRequest({ payload }) {
  try {
    // Cria a constante response que envia o email e a senha para o backend para validar o login e gerar o token
    const response = yield call(axios.post, '/tokens', payload);
    // Executa a ação loginSuccess enviando os dados recebidos e o token gerado pelo backend
    yield put(actions.loginSuccess({ ...response.data }));

    // Envia a mensagem instantânea de sucesso utilizando o toastify
    toast.success('Login realizado com sucesso!');

    // Define o campo Authorization como padrão do axios com o valor do Bearer token gerado pelo backend
    axios.defaults.headers.Authorization = `Bearer ${response.data.token}`;

    // Redireciona o usuário para a página anterior utilizando o metódo push do history
    history.push(payload.prevPath);
  } catch (e) {
    // Envia mensagem de error utilizando o toastify
    toast.error('Usuário ou senha inválidos');

    // Dispara a ação loginFailure
    yield put(actions.loginFailure());
  }
}

// Função para salvar os dados de login (token e user) no localStorage
function persistRehydrate({ payload }) {
  const token = get(payload, 'auth.token', '');
  // Se não existir o token, retorna
  if (!token) return;
  // Define o campo Authorization como padrão do axios com o valor do Bearer token gerado pelo backend
  axios.defaults.headers.Authorization = `Bearer ${token}`;
}

// Função geradora loginRequest que salva os dados de um novo usuário ou atualiza os dados de um usuário já existente
// eslint-disable-next-line consistent-return
function* registerRequest({ payload }) {
  // Cria as constantes id, nome, email e password que recebem os dados do payload utilizando a desestruturação
  const { id, nome, email, password } = payload;

  try {
    // Verifica se existe a id do usuário logado
    if (id) {
      // Atualiza os dados do usuário utilizando o método put do axios e os metódos call e put do redux-saga/effects
      yield call(axios.put, '/users', {
        nome,
        email,
        password: password || undefined,
      });
      // Envia mensagen de sucesso após atualizar o usuário
      toast.success('Conta alterada com sucesso!');
      // Dispara a ação registerSuccess
      yield put(actions.registerUpdateSuccess({ nome, email, password }));
    } else {
      // Salva o novo usuário no banco de dados
      yield call(axios.post, '/users', {
        nome,
        email,
        password,
      });
      // Envia mensagen de sucesso após atualizar o usuário
      toast.success('Conta criada com sucesso!');
      // Dispara a ação registerSuccess
      yield put(actions.registerCreatedSuccess({ nome, email, password }));
      // Redireciona para o login
      history.push('/login');
    }
  } catch (e) {
    // Cria a constante errors que recebe o erro gerado pelo backend
    const errors = get(e, 'response.data.errors', []);
    // Cria a constante status que recebe o status gerado pelo backend
    const status = get(e, 'response.status', 0);

    // Verifica seo status do erro é o 401
    if (status === 401) {
      // Gera mensagem de erro com o toastify
      toast.error('Você precisa fazer login novamente');
      // Executa a ação loginFailure
      yield put(actions.loginFailure());
      // Redireciona para o login
      return history.push('/login');
    }

    // Verifica se o backend retornou algum erro
    if (errors.length > 0) {
      // Mostra em mensagem do toastify os erros gerados pelo backend
      errors.map((error) => toast.error(error));
    } else {
      // Caso não tenha retornado erros, mostra mensagem de erro genérico
      toast.error('Erro desconhecido');
    }

    // Executa a ação registerFailure
    yield put(actions.registerFailure());
  }
}

// Exporta tudo(all) como padrão para ouvir as ações
export default all([
  takeLatest(types.LOGIN_REQUEST, loginRequest),
  takeLatest(types.PERSIST_REHYDRATE, persistRehydrate),
  takeLatest(types.REGISTER_REQUEST, registerRequest),
]);
