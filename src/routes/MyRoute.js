// Importa o react
import React from 'react';
// Importa os metódos Router e Redirect do react-router-dom
import { Route, Redirect } from 'react-router-dom';
// Importa o prop-types
import PropTypes from 'prop-types';
// Importa o metódo useSelector do react-redux
import { useSelector } from 'react-redux';

// Exporta o componente MyRoute
export default function MyRoute({ component: Component, isClosed, ...rest }) {
  // Cria a constante isLoggedIn que recebe seu valor do estado salvo no redux
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  // Verifica se a rota é fechada e se o usuario não esta logado
  if (isClosed && !isLoggedIn) {
    // Se a rota é fechada e o usuario não esta logado, redireciona para a rota de login e salva a rota atual
    // para que seja redirecionado depois do login (prevPath salva o caminho anterior no estado)
    return (
      <Redirect
        to={{ pathname: '/login', state: { prevPath: rest.location.pathname } }}
      />
    );
  }

  // Retorna o componente Route com as props passadas pelo rest e component (o comentário abaixo desliga na linha o eslint)
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Route {...rest} component={Component} />;
}

// Define o valor padrão da props isClosed como falso
MyRoute.defaultProps = {
  isClosed: false,
};

// Faz a validação das props importadas (component deve ser um elemento ou função e isClosed deve ser booleano)
MyRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
  isClosed: PropTypes.bool,
};
