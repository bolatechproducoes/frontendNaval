// Importa o metódo persistStore do redux-persist
import { persistStore } from 'redux-persist';
// Importa o metódo createStoree aplyMiddleware do Redux
import { createStore, applyMiddleware } from 'redux';
// Importa o metódo createSagaMiddleware do Redux-Saga
import createSagaMiddleware from 'redux-saga';

// Importa as configurações de armazenamento do redux-persist
import persistedReducers from './modules/reduxPersist';

// Importa todos os reducers combinados pelo rootReducer.js
import rootReducer from './modules/rootReducer';
// Importa as configurações do rootSaga.js
import rootSaga from './modules/rootSaga';

// Cria a constante sagaMiddleware que executa o metódo createSagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Cria a constante store que recebe o metódo createStore com o parametro rootReducer e aplica o sagaMiddleware
const store = createStore(
  persistedReducers(rootReducer),
  applyMiddleware(sagaMiddleware)
);

// Utiliza o metódo run do sagaMiddleware para executar o rootSaga.js
sagaMiddleware.run(rootSaga);

//
export const persistor = persistStore(store);
// Exporta a constante store que cria e gerencia o estado global da aplicação
export default store;
