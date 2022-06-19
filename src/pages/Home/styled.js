// Importa o styled-components para permitir criar estilos de componentes (substitui o css)
import styled from 'styled-components';
// Importa o componente link do react-route-dom
import { Link } from 'react-router-dom';

// Exporta o componente estilizado HomeContainer, que estiliza o componente Link do react-route-dom
export const HomeContainer = styled(Link)`
  display: flex;
  align-items: center;
  margin: 55px;

  .icon {
    display: flex;
    align-items: center;
  }
`;

export const LinkContainer = styled.div`
  display: inline-flex;
  justify-content: space-around;
  position: relative;
  align-items: center;
  margin-left: 220px;
`;
