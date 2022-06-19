// Importa o react e as hooks useEffect e useState do React
import React from 'react';

// Importa os componentes(fontes estilizadas) do react-icons/fa (font awesome)
import {
  FaLandmark,
  FaIndustry,
  FaShip,
  FaVest,
  FaUserTie,
  FaSwatchbook,
} from 'react-icons/fa';

// Importa o componente estilizado Container
import { Container } from '../../styles/GlobalStyles';
// Importa os componentes de estilo ShipContainer, NovoBoat e ProfilePicture
import { HomeContainer, LinkContainer } from './styled';

// Exporta o componente Home
export default function Home() {
  // Retorna o componente de Home
  return (
    <Container>
      <LinkContainer>
        <HomeContainer to="/clubs/">
          <div className="icon">
            <FaLandmark size={250} />
          </div>
        </HomeContainer>
        <HomeContainer to="/shipyards/">
          <div className="icon">
            <FaIndustry size={250} />
          </div>
        </HomeContainer>
        <HomeContainer to="/boats/">
          <div className="icon">
            <FaShip size={250} />
          </div>
        </HomeContainer>
      </LinkContainer>
      <LinkContainer>
        <HomeContainer to="/sailors/">
          <div className="icon">
            <FaVest size={250} />
          </div>
        </HomeContainer>
        <HomeContainer to="/owners/">
          <div className="icon">
            <FaUserTie size={250} />
          </div>
        </HomeContainer>
        <HomeContainer to="/models/">
          <div className="icon">
            <FaSwatchbook size={250} />
          </div>
        </HomeContainer>
      </LinkContainer>
    </Container>
  );
}
