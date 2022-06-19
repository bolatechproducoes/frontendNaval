// Importa o react e as hooks useEffect e useState do React
import React, { useEffect, useState } from 'react';
// Importa o componente Link do react-router-dom
import { Link } from 'react-router-dom';

// Importa os componentes(fontes estilizadas) do react-icons/fa (font awesome)
import { FaEye, FaPlus } from 'react-icons/fa';

// Importa o componente estilizado Container
import { Container } from '../../styles/GlobalStyles';
// Importa os componentes de estilo ShipContainer, NovoBoat e ProfilePicture
import { SailorContainer, NovoSailor } from './styled';
// Importa o axios com as configurações de acesso ao backend
import axios from '../../services/axios';

// Importa o componente Loading
import Loading from '../../components/Loading';

// Exporta o componente Sailors
export default function Sailors() {
  // Cria o estado para armazenar os marinheiros utilizando a hook useState
  const [sailors, setSailors] = useState([]);
  // Cria o estado para armazenar o estado do loading utilizando a hook useState
  const [isLoading, setIsLoading] = useState(false);

  // Hook do React para carregar os marinheiros quando o componente for montado
  useEffect(() => {
    // Função assincrona que busca os dados dos marinheiros no backend
    async function getData() {
      // Atribui o valor true ao estado isLoading ao iniciar a requisição ao backend
      setIsLoading(true);
      // Cria a constante response que espera(await) a resposta do backend com os dados dos marinheiros
      const response = await axios.get('/sailor/');
      // Atualiza o estado com os dados dos clubes
      setSailors(response.data);
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

      <h1>Marinheiros</h1>

      <NovoSailor to="/sailor/">
        <FaPlus />
        Adicionar Marinheiro
      </NovoSailor>

      <SailorContainer>
        {sailors.map((sailor) => (
          <div key={String(sailor.id)}>
            <span>{sailor.nome}</span>
            <span>{sailor.telefone}</span>
            <span>{sailor.email}</span>

            <Link to={`/sailor/${sailor.id}/edit`}>
              <FaEye size={16} />
            </Link>
          </div>
        ))}
      </SailorContainer>
    </Container>
  );
}
