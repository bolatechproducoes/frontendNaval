// Importa o react e as hooks useEffect e useState do React
import React, { useEffect, useState } from 'react';
// Importa o componente Link do react-router-dom
import { Link } from 'react-router-dom';
// Importa os componentes(fontes estilizadas) do react-icons/fa (font awesome)
import { FaEye, FaPlus } from 'react-icons/fa';

// Importa o componente estilizado Container
import { Container } from '../../styles/GlobalStyles';
// Importa os componentes de estilo ShipContainer, NovoBoat e ProfilePicture
import { ClubContainer, NovoClub } from './styled';
// Importa o axios com as configurações de acesso ao backend
import axios from '../../services/axios';

// Importa o componente Loading
import Loading from '../../components/Loading';

// Exporta o componente Clubs
export default function Clubs() {
  // Cria o estado para armazenar as embarcações utilizando a hook useState
  const [clubs, setClubs] = useState([]);
  // Cria o estado para armazenar o estado do loading utilizando a hook useState
  const [isLoading, setIsLoading] = useState(false);

  // Hook do React para carregar as embarcações quando o componente for montado
  useEffect(() => {
    // Função assincrona que busca os dados das embarcações no backend
    async function getData() {
      // Atribui o valor true ao estado isLoading ao iniciar a requisição ao backend
      setIsLoading(true);
      // Cria a constante response que espera(await) a resposta do backend com os dados dos clubes
      const response = await axios.get('/club/');
      // Atualiza o estado com os dados dos clubes
      setClubs(response.data);
      // Atribui o valor false ao estado isLoading após receber a requisição do backend
      setIsLoading(false);
    }

    // Executa a função getData
    getData();
  }, []);

  // Retorna o componente de Embarcações
  return (
    <Container>
      <Loading isLoading={isLoading} />

      <h1>Clubes, Marinas e Piers</h1>

      <NovoClub to="/club/">
        <FaPlus />
        Adicionar Clube, Marina ou Pier
      </NovoClub>

      <ClubContainer>
        {clubs.map((club) => (
          <div key={String(club.id)}>
            <span>{club.nome}</span>
            <span>{club.coordenada}</span>
            <span>{club.regiao}</span>
            <span>{club.estado}</span>
            <span>{club.cidade}</span>

            <Link to={`/club/${club.id}/edit`}>
              <FaEye size={16} />
            </Link>
          </div>
        ))}
      </ClubContainer>
    </Container>
  );
}
