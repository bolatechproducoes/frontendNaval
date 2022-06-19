// Importa o react e as hooks useEffect e useState do React
import React, { useEffect, useState } from 'react';
// Importa o componente Link do react-router-dom
import { Link } from 'react-router-dom';
// Importa o metódo get do lodash
import { get } from 'lodash';
// Importa os componentes(fontes estilizadas) do react-icons/fa (font awesome)
import { FaUserCircle, FaEye, FaPlus } from 'react-icons/fa';

// Importa o componente estilizado Container
import { Container } from '../../styles/GlobalStyles';
// Importa os componentes de estilo BoatContainer, NovoBoat e ProfilePicture
import { BoatContainer, ProfilePicture, NovoBoat } from './styled';
// Importa o axios com as configurações de acesso ao backend
import axios from '../../services/axios';

// Importa o componente Loading
import Loading from '../../components/Loading';

// Exporta o componente Boats
export default function Boats() {
  // Cria o estado para armazenar as embarcações utilizando a hook useState
  const [boats, setBoats] = useState([]);
  // Cria o estado para armazenar o estado do loading utilizando a hook useState
  const [isLoading, setIsLoading] = useState(false);
  const [model, setModel] = useState([]);
  const [club, setClub] = useState([]);
  const [sailor, setSailor] = useState([]);
  const [ship, setShip] = useState([]);

  // Hook do React para carregar as embarcações quando o componente for montado
  useEffect(() => {
    // Função assincrona que busca os dados das embarcações no backend
    async function getData() {
      // Atribui o valor true ao estado isLoading ao iniciar a requisição ao backend
      setIsLoading(true);
      // Cria a constante response que espera(await) a resposta do backend com os dados das embarcações
      const response = await axios.get('/boat/');
      // Atualiza o estado com os dados das embarcações
      setBoats(response.data);
      const response2 = await axios.get('/model/');
      setModel(response2.data);
      const response3 = await axios.get('/club/');
      setClub(response3.data);
      const response4 = await axios.get('/sailor/');
      setSailor(response4.data);
      const response5 = await axios.get('/shipyard/');
      setShip(response5.data);

      // Atribui o valor false ao estado isLoading após receber a requisição do backend
      setIsLoading(false);
    }

    // Executa a função getData
    getData();
  }, []);

  const handleShip = (id) => {
    const shipname = ship.filter((ships) => ships.id === id);
    if (shipname.length > 0) {
      return shipname[0].nome;
    }
    return 'Não encontrado';
  };

  const handleModel = (id) => {
    const modelname = model.filter((models) => models.id === id);
    if (modelname.length > 0) {
      if (modelname[0].shipyard_id) {
        const modelship = `${String(modelname[0].nome)} - ${String(
          handleShip(modelname[0].shipyard_id)
        )}`;
        return modelship;
      }
      return modelname[0].nome;
    }
    return 'Não encontrado';
  };

  const handleClub = (id) => {
    const clubname = club.filter((clubs) => clubs.id === id);
    if (clubname.length > 0) {
      return clubname[0].nome;
    }
    return 'Não encontrado';
  };

  const handleSailor = (id) => {
    const sailorname = sailor.filter((sailors) => sailors.id === id);
    if (sailorname.length > 0) {
      return sailorname[0].nome;
    }
    return 'Não encontrado';
  };

  // Retorna o componente de Embarcações
  return (
    <Container>
      <Loading isLoading={isLoading} />

      <h1>Embarcações</h1>

      <NovoBoat to="/boat/">
        <FaPlus />
        Adicionar Embarcação
      </NovoBoat>

      <BoatContainer>
        {boats.map((boat) => (
          <div key={String(boat.id)}>
            <ProfilePicture>
              {get(boat, 'Fotos[0].url', false) ? (
                <img src={boat.Fotos[0].url} alt="" />
              ) : (
                <FaUserCircle size={36} />
              )}
            </ProfilePicture>

            <span>{boat.nome}</span>

            {boat.model_id ? (
              <span id={boat.model_id}>{handleModel(boat.model_id)}</span>
            ) : (
              <span>N/C</span>
            )}

            {get(boat, 'Owners[0].nome', false) ? (
              <span>{boat.Owners[0].nome}</span>
            ) : (
              <span>?</span>
            )}

            {get(boat, 'Owners[0].club_id', false) ? (
              <span>{handleClub(boat.Owners[0].club_id)}</span>
            ) : (
              <span>?</span>
            )}

            {boat.sailor_id ? (
              <span id={boat.sailor_id}>{handleSailor(boat.sailor_id)}</span>
            ) : (
              <span>N/C</span>
            )}

            <Link to={`/boat/${boat.id}/edit`}>
              <FaEye size={16} />
            </Link>
          </div>
        ))}
      </BoatContainer>
    </Container>
  );
}
