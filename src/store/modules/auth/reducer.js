// Importa o axios para fazer requisições ao backend
import axios from '../../../services/axios';
// Importa como types todos os tipos definidos no types.js
import * as types from '../types';

// Cria a constante initialState que define os estados iniciais
const initialState = {
  isLoggedIn: false,
  token: false,
  user: {},
  isLoading: false,
};

// Exporta a função padrão que recebe o estado e a ação e retorna o estado
export default function (state = initialState, action) {
  // Alterna entre os tipos de ação
  switch (action.type) {
    // Ação para requisição LOGIN_SUCCESS
    case types.LOGIN_SUCCESS: {
      // Cria a constante newState que recebe os dados enviados pelo backend (token e user)
      const newState = { ...state };
      // Altera o valor de isLoggedIn para true no estado da aplicação
      newState.isLoggedIn = true;
      // Altera o valor de token para o token recebido do backend
      newState.token = action.payload.token;
      // Altera o valor de user para o user recebido do backend
      newState.user = action.payload.user;
      // Altera o valor da props isLoading para false
      newState.isLoading = false;
      // Retorna o newState com os dados atualizados para o estado da aplicação
      return newState;
    }

    // Ação para requisição LOGIN_FAILURE
    case types.LOGIN_FAILURE: {
      // Apaga o token de autorização
      delete axios.defaults.headers.Authorization;
      // Cria a constante newState que recebe os dados do estado inicial da aplicação
      const newState = { ...initialState };
      // Retorna o novo estado
      return newState;
    }

    // Ação para requisição LOGIN_REQUEST
    case types.LOGIN_REQUEST: {
      // Cria a constante newState que recebe os dados do estado atual da aplicação
      const newState = { ...state };
      // Altera o valor da props isLoading para true
      newState.isLoading = true;
      // Retorna o newState com os dados atualizados para o estado da aplicação
      return newState;
    }

    // Ação para requisição REGISTER_UPDATE_SUCCESS
    case types.REGISTER_UPDATE_SUCCESS: {
      // Cria a constante newState que recebe os dados do estado atual da aplicação
      const newState = { ...state };
      // Atualiza o campo nome com a alteração feita pelo usuário
      newState.user.nome = action.payload.nome;
      // Atualiza o campo nome com a alteração feita pelo usuário
      newState.user.email = action.payload.email;
      // Altera o valor da props isLoading para false
      newState.isLoading = false;
      // Retorna o newState com os dados atualizados para o estado da aplicação
      return newState;
    }

    // Ação para requisição REGISTER_CREATED_SUCCESS
    case types.REGISTER_CREATED_SUCCESS: {
      // Cria a constante newState que recebe os dados do estado atual da aplicação
      const newState = { ...state };
      // Altera o valor da props isLoading para false
      newState.isLoading = false;
      // Retorna o newState com os dados atualizados para o estado da aplicação
      return newState;
    }

    // Ação para requisição REGISTER_FAILURE
    case types.REGISTER_FAILURE: {
      // Cria a constante newState que recebe os dados do estado atual da aplicação
      const newState = { ...state };
      // Altera o valor da props isLoading para false
      newState.isLoading = false;
      // Retorna o newState com os dados atualizados para o estado da aplicação
      return newState;
    }

    // Ação para requisição REGISTER_REQUEST
    case types.REGISTER_REQUEST: {
      // Cria a constante newState que recebe os dados do estado atual da aplicação
      const newState = { ...state };
      // Altera o valor da props isLoading para true
      newState.isLoading = true;
      // Retorna o newState com os dados atualizados para o estado da aplicação
      return newState;
    }

    default: {
      // Retorna o estado
      return state;
    }
  }
}
