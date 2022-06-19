// Importa os tipos definidos no types.js
import * as types from '../types';

// Exporta o type da ação loginRequest
export function loginRequest(payload) {
  // Retorna um objeto com o tipo da ação(type)
  return {
    type: types.LOGIN_REQUEST,
    payload,
  };
}

// Exporta o type da ação loginSuccess
export function loginSuccess(payload) {
  // Retorna um objeto com o tipo da ação(type)
  return {
    type: types.LOGIN_SUCCESS,
    payload,
  };
}

// Exporta o type da ação loginFailure
export function loginFailure(payload) {
  // Retorna um objeto com o tipo da ação(type)
  return {
    type: types.LOGIN_FAILURE,
    payload,
  };
}

// Exporta o type da ação registerRequest
export function registerRequest(payload) {
  // Retorna um objeto com o tipo da ação(type)
  return {
    type: types.REGISTER_REQUEST,
    payload,
  };
}

// Exporta o type da ação registerUpdateSuccess
export function registerUpdateSuccess(payload) {
  // Retorna um objeto com o tipo da ação(type)
  return {
    type: types.REGISTER_UPDATE_SUCCESS,
    payload,
  };
}

// Exporta o type da ação registerCreateSuccess
export function registerCreatedSuccess(payload) {
  // Retorna um objeto com o tipo da ação(type)
  return {
    type: types.REGISTER_CREATED_SUCCESS,
    payload,
  };
}

// Exporta o type da ação registerFailure
export function registerFailure(payload) {
  // Retorna um objeto com o tipo da ação(type)
  return {
    type: types.REGISTER_FAILURE,
    payload,
  };
}
