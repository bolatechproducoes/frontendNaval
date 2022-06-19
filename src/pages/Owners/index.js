// Importa o react e as hooks useEffect e useState do React
import React, { useEffect, useState } from 'react';
// Importa o componente Link do react-router-dom
import { Link } from 'react-router-dom';
// Importa os componentes(fontes estilizadas) do react-icons/fa (font awesome)
import { FaEye, FaPlus } from 'react-icons/fa';

// Importa o componente estilizado Container
import { Container } from '../../styles/GlobalStyles';
// Importa os componentes de estilo ShipContainer, NovoBoat e ProfilePicture
import { OwnerContainer, NovoOwner } from './styled';
// Importa o axios com as configurações de acesso ao backend
import axios from '../../services/axios';

// Importa o componente Loading
import Loading from '../../components/Loading';

// Exporta o componente Owners
export default function Owners() {
  // Cria o estado para armazenar os proprietários utilizando a hook useState
  const [owners, setOwners] = useState([]);
  // Cria o estado para armazenar o estado do loading utilizando a hook useState
  const [isLoading, setIsLoading] = useState(false);
  const [club, setClub] = useState([]);
  const [boat, setBoat] = useState([]);

  // Hook do React para carregar os proprietários quando o componente for montado
  useEffect(() => {
    // Função assincrona que busca os dados dos proprietários no backend
    async function getData() {
      // Atribui o valor true ao estado isLoading ao iniciar a requisição ao backend
      setIsLoading(true);
      // Cria a constante response que espera(await) a resposta do backend com os dados dos proprietários
      const response = await axios.get('/owner/');
      // Atualiza o estado com os dados dos proprietários
      setOwners(response.data);
      const response2 = await axios.get('/club/');
      setClub(response2.data);
      const response3 = await axios.get('/boat/');
      setBoat(response3.data);

      // Atribui o valor false ao estado isLoading após receber a requisição do backend
      setIsLoading(false);
    }

    // Executa a função getData
    getData();
  }, []);

  const handleClub = (id) => {
    const clubname = club.filter((clubs) => clubs.id === id);
    if (clubname.length > 0) {
      return clubname[0].nome;
    }
    return 'Não encontrado';
  };

  const handleBoat = (id) => {
    const boatname = boat.filter((boats) => boats.id === id);
    if (boatname.length > 0) {
      return boatname[0].nome;
    }
    return 'Não encontrado';
  };

  // Retorna o componente de Embarcações
  return (
    <Container>
      <Loading isLoading={isLoading} />

      <h1>Proprietários</h1>

      <NovoOwner to="/owner/">
        <FaPlus />
        Adicionar Proprietário
      </NovoOwner>

      <OwnerContainer>
        {owners.map((owner) => (
          <div key={String(owner.id)}>
            <span>{owner.nome}</span>
            <span>{owner.sobrenome}</span>

            {owner.boat_id ? (
              <span id={owner.boat_id}>{handleBoat(owner.boat_id)}</span>
            ) : (
              <span>N/C</span>
            )}

            <span>{owner.email}</span>

            {owner.club_id ? (
              <span id={owner.club_id}>{handleClub(owner.club_id)}</span>
            ) : (
              <span>N/C</span>
            )}

            <Link to={`/owner/${owner.id}/edit`}>
              <FaEye size={16} />
            </Link>
          </div>
        ))}
      </OwnerContainer>
    </Container>
  );
}
