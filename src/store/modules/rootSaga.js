// Importa o metódo all do redux-saga/effects
import { all } from 'redux-saga/effects';

// Importa como example o sgas.js
import auth from './auth/sagas';

// Exporta a função geradora rootSaga
export default function* rootSaga() {
  return yield all([auth]);
}
