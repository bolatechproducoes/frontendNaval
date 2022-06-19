// Importa os metódos call, put, all e takeLatest do redux-saga/effects
import { call, put, all, takeLatest } from 'redux-saga/effects';
//
import { toast } from 'react-toastify';
// Importa as ações definidas no arquivo actions.js como actions
import * as actions from './actions';
// Importa os tipos definidos no arquivo types.js como types
import * as types from '../types';

// Constante que simula uma promisse para testar o saga
const requisicao = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 600);
  });

// O saga utiliza função geradora (function*)
function* exampleRequest() {
  try {
    // Chama a função requisicao utilizando o yield para aguardar a resposta (é tipo um await utilizado em promisses em função gerardora)
    yield call(requisicao);
    // Dispara a ação de sucesso
    yield put(actions.clicaBotaoSuccess());
  } catch {
    // Envia uma mensagem de erro utilizando o toastify
    toast.error('Erro ao clicar no botão');
    // Dispara a ação de erro
    yield put(actions.clicaBotaoFailure());
  }
}

// Exporta tudo(all) como padrão para ouvir as ações
export default all([takeLatest(types.BOTAO_CLICADO_REQUEST, exampleRequest)]);
