// Importa o storage do redux-persist para utilizar o localStorage e salvar sessão do usuário e demais dados
import storage from 'redux-persist/lib/storage';
// Importa o módulo persistReducer do redux-persist
import { persistReducer } from 'redux-persist';

// Exporta uma função padrão com as configurações de armazenamento do redux-persist, ['example] é a chave exportada pelo rootReducer.js
export default (reducers) => {
  const persistedReducer = persistReducer(
    {
      key: 'CONSUMO-API',
      storage,
      whitelist: ['auth'],
    },
    reducers
  );
  // Retorna a constante persistReducer com as configurações de armazenamento do redux-persist
  return persistedReducer;
};
