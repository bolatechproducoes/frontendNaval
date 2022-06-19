// Importa o react
import React from 'react';
// Importa a fonte FaHome FaSignInAlt, FaUserAlt, FaCircle e FaPowerOff do react-icons/fa  (icones fonte awesome)
import {
  FaLandmark,
  FaShip,
  FaIndustry,
  FaVest,
  FaUserTie,
  FaSwatchbook,
} from 'react-icons/fa';

// Importa o componente Nav
import { Nav, MeuLink } from './styled';

// Exporta o componente funcional SideBar
export default function SideBar() {
  // Retorna o componente SideBar
  return (
    <Nav>
      <MeuLink to="/clubs/">
        <FaLandmark size={30} />
        <p>Clubes</p>
      </MeuLink>

      <MeuLink to="/shipyards/">
        <FaIndustry size={30} />
        <p>Estaleiros</p>
      </MeuLink>

      <MeuLink to="/boats/">
        <FaShip size={30} />
        <p>Embarcações</p>
      </MeuLink>

      <MeuLink to="/sailors/">
        <FaVest size={30} />
        <p>Marinheiros</p>
      </MeuLink>

      <MeuLink to="/owners/">
        <FaUserTie size={30} />
        <p>Proprietários</p>
      </MeuLink>

      <MeuLink to="/models/">
        <FaSwatchbook size={30} />
        <p>Modelos</p>
      </MeuLink>
    </Nav>
  );
}
