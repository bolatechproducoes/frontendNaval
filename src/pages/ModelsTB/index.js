// Importa o react e as hooks useEffect e useState do React
import React, { useEffect, useState } from 'react';
// Importa o componente Link do react-router-dom
import { Link } from 'react-router-dom';
// Importa os componentes(fontes estilizadas) do react-icons/fa (font awesome)
import { FaEye, FaPlus } from 'react-icons/fa';

// Importa o componente estilizado Container
import { Container } from '../../styles/GlobalStyles';
// Importa os componentes de estilo ShipContainer, NovoBoat e ProfilePicture
import { ModelContainer, NovoModel } from './styled';
// Importa o axios com as configurações de acesso ao backend
import axios from '../../services/axios';

// Importa o componente Loading
import Loading from '../../components/Loading';

// Exporta o componente ModelsTB
export default function ModelsTB() {
  // Cria o estado para armazenar os modelos utilizando a hook useState
  const [modelstb, setModelstb] = useState([]);
  // Cria o estado para armazenar o estado do loading utilizando a hook useState
  const [isLoading, setIsLoading] = useState(false);
  const [ship, setShip] = useState([]);

  // Hook do React para carregar os modelos quando o componente for montado
  useEffect(() => {
    // Função assincrona que busca os dados dos modelos no backend
    async function getData() {
      // Atribui o valor true ao estado isLoading ao iniciar a requisição ao backend
      setIsLoading(true);
      // Cria a constante response que espera(await) a resposta do backend com os dados dos modelos
      const response = await axios.get('/model/');
      // Atualiza o estado com os dados dos modelos
      setModelstb(response.data);
      const response2 = await axios.get('/shipyard/');
      setShip(response2.data);

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

  // Retorna o componente de Embarcações
  return (
    <Container>
      <Loading isLoading={isLoading} />

      <h1>Modelos de Embarcações</h1>

      <NovoModel to="/model/">
        <FaPlus />
        Adicionar Modelo
      </NovoModel>

      <ModelContainer>
        {modelstb.map((modeltb) => (
          <div key={String(modeltb.id)}>
            <span>{modeltb.nome}</span>
            {modeltb.shipyard_id ? (
              <span id={modeltb.shipyard_id}>
                {handleShip(modeltb.shipyard_id)}
              </span>
            ) : (
              <span>N/C</span>
            )}

            <Link to={`/model/${modeltb.id}/edit`}>
              <FaEye size={16} />
            </Link>
          </div>
        ))}
      </ModelContainer>
    </Container>
  );
}
