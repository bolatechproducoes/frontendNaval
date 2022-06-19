// Importa o styled-components para permitir criar estilos de componentes (substitui o css)
import styled from 'styled-components';
// Importa o componente link do react-route-dom
import { Link } from 'react-router-dom';

// Exporta o componente estilizado BoatContainer
export const BoatContainer = styled.div`
  margin-top: 20px;

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 0;
  }

  div + div {
    border-top: 1px solid #eee;
  }

  span {
    width: 13%;
  }
`;

// Exporta o componente estilizado ProfilePicture
export const ProfilePicture = styled.div`
  img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
  }
`;

// Exporta o componente estilizado NovoBoat, que estiliza o componente Link do react-route-dom
export const NovoBoat = styled(Link)`
  display: block;
  padding: 20px 0 10px 0;
`;
