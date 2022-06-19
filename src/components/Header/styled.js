// Importa o styled-components
import styled from 'styled-components';
// Importa a primaryColor das configurações de cores
import { primaryColor } from '../../config/colors';

// Exporta a constante Nav que define a folha de estilos do componente <Nav>
export const Nav = styled.nav`
  background: ${primaryColor};
  top: 0;
  right: 0;
  left: 0;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  position: fixed;
  z-index: 10;

  a {
    color: #fff;
    margin: 0 10px 0 0;
    font-weight: bold;
    position: center;
  }

  .greenBall {
    position: relative;
    margin-left: 800px;
  }

  .nauti {
    margin-right: 800px;
    font-family: sans-serif;
    font-size: 26px;
  }
`;
