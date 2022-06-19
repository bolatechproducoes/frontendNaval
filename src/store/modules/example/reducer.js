// Importa como types todos os tipos definidos no types.js
import * as types from '../types';

// Cria a constante initialState que define os estados iniciais
const initialState = {
  botaoClicado: false,
};

// Exporta a função padrão que recebe o estado e a ação e retorna o estado
export default function (state = initialState, action) {
  // Alterna entre os tipos de ação
  switch (action.type) {
    // Executa caso o tipo da ação seja BOTAO_CLICADO_SUCCESS
    case types.BOTAO_CLICADO_SUCCESS: {
      // console.log('Sucesso');
      // Cria a constante newState que recebe o estado atual
      const newState = { ...state };
      // Altera o valor boleano do estado botaoClicado
      newState.botaoClicado = !newState.botaoClicado;
      // Retorna o newState
      return newState;
    }
    // Executa caso o tipo da ação seja BOTAO_CLICADO_FAILURE
    case types.BOTAO_CLICADO_FAILURE: {
      //
      // console.log('Deu erro');
      return state;
    }
    // Executa caso o tipo da ação seja BOTAO_CLICADO_REQUEST
    case types.BOTAO_CLICADO_REQUEST: {
      //
      // console.log('Estou fazendo a requisição');
      return state;
    }

    default: {
      // Retorna o estado
      return state;
    }
  }
}
