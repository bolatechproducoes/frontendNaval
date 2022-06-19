// Importa o react
import React from 'react';
// Importa o prop-types
import PropTypes from 'prop-types';

// Importa o styled.js com o estilo CSS dos componentes
import { Container } from './styled';

// Exporta o componente Loading
export default function Loading({ isLoading }) {
  // Se não estiver carregando retorna um fragmento (<></>) vazio
  if (!isLoading) return <></>;
  // Retorna o componente que será renderizado
  return (
    <Container>
      <div />
      <span>Carregando ...</span>
    </Container>
  );
}

// Define o tipo padrão da props isLoading como falso
Loading.defaultProps = {
  isLoading: false,
};

// Define o tipo da props isLoading como booleano
Loading.propTypes = {
  isLoading: PropTypes.bool,
};
