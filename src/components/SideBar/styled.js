// Importa o componente link do react-route-dom
import { Link } from 'react-router-dom';
// Importa o styled-components
import styled from 'styled-components';
// Importa a primaryColor das configurações de cores
import { primaryColor } from '../../config/colors';

// Exporta a constante Nav que define a folha de estilos do componente <Nav>
export const Nav = styled.nav`
  width: 10%;
  height: 100%;
  background: ${primaryColor};
  padding: 0px;
  display: grid;
  align-items: flex;
  justify-content: center;
  color: #fff;
  position: fixed;
  justify-items: baseline;
  margin-top: -70px;
  z-index: 11;

  a {
    width: 100%;
    height: 80%;
    color: #fff;
    margin-top: -15px;
  }

  p {
    margin-top: -15px;
    font-size: 15px;
    justify-items: center;
  }
`;

// Exporta o componente estilizado MeuLink, que estiliza o componente Link do react-route-dom
export const MeuLink = styled(Link)`
  display: grid;
  align-items: center;
  justify-items: center;
`;
