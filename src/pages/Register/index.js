// Importa o react e o metódo useState
import React, { useState } from 'react';
// Importa o metódo toast do react-toastify para gerar as mensagens ao usuário
import { toast } from 'react-toastify';
// Importa o metódo is email do validator
import { isEmail } from 'validator';
// Importa os metódos useSelector e useDispatch do react-redux
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

// Importa o componente estilizado Container
import { Container } from '../../styles/GlobalStyles';
// Importa o componente estilizado Form
import { Form } from './styled';
// Importa o componente Loading
import Loading from '../../components/Loading';
// Importa todas as ações do auth/actions
import * as actions from '../../store/modules/auth/actions';

// Exporta o componente Register
export default function Register() {
  // Cria constante dispatch que executa o useDispatch
  const dispatch = useDispatch();

  // Cria a constante id que recebe o id dos dados do usuário do estado do redux
  const id = useSelector((state) => state.auth.user.id);
  // Cria a constante nomeStored que recebe o nome dos dados do usuário do estado do redux
  const nomeStored = useSelector((state) => state.auth.user.nome);
  // Cria a constante emailStored que recebe o email dos dados do usuário do estado do redux
  const emailStored = useSelector((state) => state.auth.user.email);
  // Cria a constante isLoading que recebe o valor dos dados do usuário do estado do redux
  const isLoading = useSelector((state) => state.auth.isLoading);

  // Cria a constante de estado para o nome que inicia como uma string vazia
  const [nome, setNome] = useState('');
  // Cria a constante de estado para o email que inicia como uma string vazia
  const [email, setEmail] = useState('');
  // Cria a constante de estado para a senha que inicia como uma string vazia
  const [password, setPassword] = useState('');
  // Cria o estado para armazenar o estado do loading utilizando a hook useState

  // Verifica se o usuário esta logado e pega seus dados
  React.useEffect(() => {
    // Se não houver um id no estado do redux encerra
    if (!id) return;
    // Atribui o nome vindo do estado do redux a constante de valor do input
    setNome(nomeStored);
    // Atribui o email vindo do estado do redux a constante de valor do input
    setEmail(emailStored);
    // Recebe os valores definidos para emailStored, nomeStored e id
  }, [emailStored, nomeStored, id]);

  // Função assincrona handleSubmit que recebe o evento de submit do formulário, verifica campos e envia para o backend
  async function handleSubmit(e) {
    // Evita que a página seja recarregada com o evento submit padrão do formulário
    e.preventDefault();
    // Cria a variavel formErrors com o valor inicial false
    let formErrors = false;

    // Verifica se o nome tem entre 3 e 255 caracteres
    if (nome.length < 3 || nome.length > 255) {
      // Seta o formErrors como true
      formErrors = true;
      // Exibe a mensagem de erro utilizando o toastify
      toast.error('O nome deve ter entre 3 e 255 caracteres');
    }

    // Utiliza o metódo isEmail do validator para verificar se o email é válido
    if (!isEmail(email)) {
      // Seta o formErrors como true
      formErrors = true;
      // Exibe a mensagem de erro utilizando o toastify
      toast.error('E-mail inválido');
    }

    // Verifica se o usuário esta logado e verifica se a senha tem entre 6 e 50 caracteres
    if (!id && (password.length < 6 || password.length > 50)) {
      // Seta o formErrors como true
      formErrors = true;
      // Exibe a mensagem de erro utilizando o toastify
      toast.error('A senha deve ter entre 6 e 50 caracteres');
    }

    // Se for verificado erros retorna sem acessar o backend
    if (formErrors) return;

    if (id && password !== '') {
      // eslint-disable-next-line no-restricted-globals
      if (!confirm('Você tem certeza que deseja alterar sua senha?')) {
        return;
      }
    }

    if (emailStored) {
      if (emailStored !== email) {
        if (
          // eslint-disable-next-line no-restricted-globals
          !confirm(
            'Você tem certeza que deseja alterar seu email? Você terá que sair do sistema fazer login novamente com seu novo email'
          )
        ) {
          return;
        }
      }
    }

    // Executa a ação registerRequest enviando os dados do formulário
    dispatch(actions.registerRequest({ nome, email, password, id }));
  }

  // Retorna o componente de Register
  return (
    <Container>
      <Loading isLoading={isLoading} />

      <h1>{id ? 'Editar dados' : 'Crie sua conta'}</h1>

      <Form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="nome">
          Nome:
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Seu nome"
          />
        </label>

        <label htmlFor="email">
          E-mail:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Seu e-mail"
          />
        </label>

        <label htmlFor="password">
          Senha:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Sua senha"
          />
        </label>

        <button type="submit">
          {id ? 'Salvar Alterações' : 'Criar conta'}
        </button>

        {!id && (
          <div className="toRegister">
            <p>
              Já tem conta? Clique <Link to="/login/">aqui</Link> para fazer o
              login
            </p>
          </div>
        )}
      </Form>
    </Container>
  );
}
