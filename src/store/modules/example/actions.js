// Importa os tipos definidos no types.js
import * as types from '../types';

// Exporta o type da ação clicaBotaoRequest
export function clicaBotaoRequest() {
  // Retorna um objeto com o tipo da ação(type)
  return {
    type: types.BOTAO_CLICADO_REQUEST,
  };
}

// Exporta o type da ação clicaBotaoSuccess
export function clicaBotaoSuccess() {
  // Retorna um objeto com o tipo da ação(type)
  return {
    type: types.BOTAO_CLICADO_SUCCESS,
  };
}

// Exporta o type da ação clicaBotaoFailure
export function clicaBotaoFailure() {
  // Retorna um objeto com o tipo da ação(type)
  return {
    type: types.BOTAO_CLICADO_FAILURE,
  };
}
