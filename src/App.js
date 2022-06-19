// Importa o react
import React from 'react';
// Importa o BrowserRouter do react-router-dom
import { Router } from 'react-router-dom';
// Importa o metódo ToastContainer do react-toastify
import { ToastContainer } from 'react-toastify';
// Importa o metódo Provider do react-redux
import { Provider } from 'react-redux';
// Importa o metódo PersistGate do redux-persist/integration/react
import { PersistGate } from 'redux-persist/integration/react';

// Importa o store com as configurações do redux e o persistor com as configurações do redux-persist
import store, { persistor } from './store';
// Importa o history
import history from './services/history';
// Importa o estilo global GlobalStyles
import GlobalStyle from './styles/GlobalStyles';
// Importa o componente Header
import Header from './components/Header';
// Importa o componente Routes
import Routes from './routes/index';
// Importa o componente SideBar
import SideBar from './components/SideBar';

// Componente App
function App() {
  // Retorna as rotas e componentes
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router history={history}>
          <Header />
          <SideBar />
          <Routes />
          <GlobalStyle />
          <ToastContainer autoClose={3000} className="toast-container" />
        </Router>
      </PersistGate>
    </Provider>
  );
}

// Exporta o componente App
export default App;
