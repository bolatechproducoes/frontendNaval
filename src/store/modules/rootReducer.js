// Importa o metódo combineReducers do Redux
import { combineReducers } from 'redux';

// Importa o exampleReducer
import auth from './auth/reducer';

// Exporta os reducers combinados
export default combineReducers({
  auth,
});
