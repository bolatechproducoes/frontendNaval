// Importa o react e os metódos useState e useEffect
import React, { useState, useEffect } from 'react';
// Importa o metódo get do lodash
import { get } from 'lodash';

// Importa o prop-types
import PropTypes from 'prop-types';
// Importa o toastify
import { toast } from 'react-toastify';
// Importa o metódo useDispatch do react-redux
import { useDispatch } from 'react-redux';
// Importa icones do react-icons
import { FaUserCircle, FaEdit } from 'react-icons/fa';
// Importa o componente Link do react-router-dom
import { Link } from 'react-router-dom';

// Importa o axios
import axios from '../../services/axios';
// Importa o history
import history from '../../services/history';

// Importa o componente estilizado Container
import { Container } from '../../styles/GlobalStyles';
// Importa o componente estilizado Form
import { Form, ProfilePicture, Title } from './styled';
// Importa o componente estilizado Loading
import Loading from '../../components/Loading';
// Importa as ações definidas no arquivo actions.js
import * as actions from '../../store/modules/auth/actions';

// Exporta o componente Boat
export default function Boat({ match }) {
  // Cria a constante dispatch que executa o useDispatch
  const dispatch = useDispatch();

  // Cria a constante id que recebe o valor do id do usuário, caso não exista o valor é 0
  const id = get(match, 'params.id', '');
  // Cria a constante nome e a variavel de atribuição setNome que recebe o valor do nome do usuário
  const [nome, setNome] = useState('');
  // Cria a constante owner e a variavel de atribuição setOwner que recebe o valor do nome do usuário
  const [owner, setOwner] = useState('');
  // Cria a constante modelid e a variavel de atribuição setModelid que recebe o valor do id do modelo
  const [modelid, setModelid] = useState('');
  // Cria a constante sailorid e a variavel de atribuição setSailorid que recebe o valor do id do modelo
  const [sailorid, setSailorid] = useState('');
  // Cria a constante clubid e a variavel de atribuição setClubid que recebe o valor do id do modelo
  const [clubid, setClubid] = useState('');
  // Cria a constante club e a variavel de atribuição setClub que recebe o valor do id do modelo
  const [club, setClub] = useState('');
  // Cria a constante sailor e a variavel de atribuição setSailor que recebe o valor do id do modelo
  const [sailor, setSailor] = useState('');
  // Cria a constante modeltb e a variavel de atribuição setModeltb que recebe o valor do id do modelo
  const [modeltb, setModeltb] = useState('');
  // Cria a constante shipyardid e a variavel de atribuição setShipyardid que recebe o valor do id do modelo
  const [shipyardid, setShipyardid] = useState('');
  // Cria a constante shipyard e a variavel de atribuição setShipyard que recebe o valor do id do modelo
  const [shipyard, setShipyard] = useState('');
  const [owners, setOwners] = useState('');
  const [ownersid, setOwnersid] = useState('');
  const [sailors, setSailors] = useState('');
  const [sailorsid, setSailorsid] = useState('');
  const [modelstb, setModelstb] = useState('');
  const [modelsid, setModelsid] = useState('');

  // Cria a constante isLoading e a variavel de atribuição setIsLoading que recebe o valor do nome do usuário
  const [isLoading, setIsLoading] = useState();
  // Cria a constante foto e a variavel de atribuição setFoto que recebe o valor do nome do usuário
  const [foto, setFoto] = useState();

  // Busca o usuário pelo id e atribui os valores aos campos
  useEffect(() => {
    // Se não tiver id retorna
    if (!id) return;

    // Função assincrona getData que verifica se existe id e busca os dados do usuário no banco de dados
    async function getData() {
      try {
        // Seta o estado de isLoading para true
        setIsLoading(true);
        // Cria a constante data que recebe os dados do usuário enviados pelo backend
        const { data } = await axios.get(`/boat/${id}`);
        // Cria a constante Foto que recebe a url da foto do usuário
        const Foto = get(data, 'Fotos[0].url', '');
        // Cria a constante Owner que recebe o nome do proprietário do barco
        const Owner = get(data, 'Owners[0].nome', '');
        // Cria a constante Clubid que recebe o id do proprietário do barco
        const Clubid = get(data, 'Owners[0].club_id', '');

        // Atribui o valor da URL da foto ao estado foto
        setFoto(Foto);

        // Atribui o valor do nome do proprietário do barco ao estado owner
        setOwner(Owner);

        // Seta o estado do nome para o valor retornado pelo backend
        setNome(data.nome);

        // Seta o estado do modelid para o valor retornado pelo backend
        setModelid(data.model_id);

        // Seta o estado do sailorid para o valor retornado pelo backend
        setSailorid(data.sailor_id);

        // Atribui o valor do Clubid ao clubid
        setClubid(Clubid);

        const dadosClub = async (idclub) => {
          // Cria a constante data que recebe os dados do clube enviados pelo backend
          // eslint-disable-next-line no-shadow
          const { data } = await axios.get(`/club/${idclub}`);

          // Seta o estado do boatid para o valor retornado pelo backend
          setClub(data.nome);
        };

        if (clubid) {
          dadosClub(clubid);
        }

        const dadosSailor = async (idsailor) => {
          // Cria a constante data que recebe os dados do clube enviados pelo backend
          // eslint-disable-next-line no-shadow
          const { data } = await axios.get(`/sailor/${idsailor}`);

          // Seta o estado do boatid para o valor retornado pelo backend
          setSailor(data.nome);
        };

        if (sailorid) {
          dadosSailor(sailorid);
        }

        const dadosModel = async (idmodel) => {
          // Cria a constante data que recebe os dados do clube enviados pelo backend
          // eslint-disable-next-line no-shadow
          const { data } = await axios.get(`/model/${idmodel}`);

          // Seta o estado do boatid para o valor retornado pelo backend
          setModeltb(data.nome);

          // Seta o estado do shipyardid para o valor retornado pelo backend
          setShipyardid(data.shipyard_id);
        };

        if (modelid) {
          dadosModel(modelid);
        }

        const dadosShipyard = async (idshipyard) => {
          // Cria a constante data que recebe os dados do clube enviados pelo backend
          // eslint-disable-next-line no-shadow
          const { data } = await axios.get(`/shipyard/${idshipyard}`);

          // Seta o estado do boatid para o valor retornado pelo backend
          setShipyard(data.nome);
        };

        if (shipyardid) {
          dadosShipyard(shipyardid);
        }

        // Seta o valor de isLoading para false
        setIsLoading(false);
      } catch (err) {
        // Seta o valor de isLoading para false
        setIsLoading(false);
        // Cria a constante status que recebe o status do erro, caso não exista recebe 0
        const status = get(err, 'response.status', 0);
        // Cria a constante erros que recebe os erros do backend, caso não exista recebe 0
        const errors = get(err, 'response.data.errors', []);

        // Se o status for 400 manda as mensagens vindas do backend em avisos do toastify
        if (status === 400) errors.map((error) => toast.error(error));
        // Redireciona o usuário para a home
        history.push('/');
      }
    }

    // Executa a função getData
    getData();
  }, [clubid, id, sailorid, modelid, shipyardid]);

  // Metódo handleSubmit
  const handleSubmit = async (e) => {
    // Evita o comportamento padrão do formulário
    e.preventDefault();
    // cria a variavel formErrors que recebe o valor false
    let formErrors = false;

    // Verifica se o nome tem entre 3 e 50 caracteres
    if (nome.length < 3 || nome.length > 50) {
      // Gera a mensagem de erro com o toastify
      toast.error('O nome deve ter entre 3 e 50 caracteres');
      // Altera o valor de formErrors para true
      formErrors = true;
    }

    // Caso ocorra algum erro no formulário, retorna
    if (formErrors) return;

    // Caso não tenha erros atualiza os dados do usuário no banco de dados
    try {
      // Seta o estado de isLoading para true
      setIsLoading(true);
      // Verifica se existe o id do aluno, se existir edita os dados
      if (id) {
        // Envia os dados para o backend atualizar o banco de dados
        if (sailorsid) {
          await axios.put(`/boat/${id}`, {
            nome,
            sailor_id: sailorsid,
          });
        } else {
          await axios.put(`/boat/${id}`, {
            nome,
          });
        }
        if (ownersid) {
          await axios.put(`/owner/${ownersid}`, {
            boat_id: id,
          });
        }
        if (modelsid) {
          await axios.put(`/boat/${id}`, {
            model_id: modelsid,
          });
        }
        // Gera a mensagem de sucesso com o toastify
        toast.success('Embarcação atualizada com sucesso');
        // Redireciona o usuário para a página de edição da embracação criada
        history.push(`/boat/${id}/edit/`);

        // Caso não exista id, cria uma nova embarcação
      } else {
        // Envia os dados para o backend criar um novo registro no banco de dados e salva os dados no status
        const { data } = await axios.post(`/boat/`, {
          nome,
          sailor_id: sailorsid,
          model_id: modelsid,
        });
        if (ownersid) {
          await axios.put(`/owner/${ownersid}`, {
            boat_id: data.id,
          });
        }
        // Gera a mensagem de sucesso com o toastify
        toast.success('Embarcação cadastrado com sucesso');
        // Redireciona o usuário para a página de edição da embracação criada
        history.push(`/boat/${data.id}/edit/`);
      }
      // Seta o estado de isLoading para false
      setIsLoading(false);
    } catch (err) {
      // Cria a constante status que recebe o status do erro, caso não exista recebe 0
      const status = get(err, 'response.status', 0);
      // Cria a constante data que recebe os dados do erro, caso não exista recebe um objeto vazio
      const data = get(err, 'response.data', {});
      // Cria a constante errors que recebe os erros do backend, caso não exista recebe um array vazio
      const errors = get(data, 'errors', []);

      // Se existir erros no backend, gera a mensagem de erro com o toastify
      if (errors.length > 0) {
        // Gera as mensagens de erro com o toastify
        errors.map((erro) => toast.error(erro));
      } else {
        // Gera a mensagem de erro com o toastify
        toast.error('Erro desconhecido');
      }

      // Seta o estado de isLoading para false
      setIsLoading(false);

      // Verifica se o status do erro é o 401 e dispara a ação loginFailure caso seja um erro 401
      if (status === 401) dispatch(actions.loginFailure());
    }
  };

  const handleBack = () => {
    history.push('/boats/');
  };

  // Cria o metódo handleDelete para excluir o marinheiro do banco de dados
  const handleDelete = async (e, ids) => {
    // Mantem o evento recebido
    e.preventDefault();

    if (
      // eslint-disable-next-line no-restricted-globals
      // eslint-disable-next-line no-alert
      window.confirm('Tem certeza que deseja excluir a embarcação?')
    ) {
      // Inicia a requisição ao backend para excluir o marinheiro
      try {
        // Configura o estado isLoading para true
        setIsLoading(true);
        // Deleta o registro da embarcação no banco de dados
        await axios.delete(`/boat/${ids}`);
        toast.success('Embarcação excluída com sucesso');
        setIsLoading(false);
        history.push('/boats/');
      } catch (err) {
        // Cria a constante status que recebe o status do erro ou caso não haja erro, recebe um 0
        const status = get(err, 'response.status', 0);
        // Verifica se o status é 401
        if (status === 401) {
          // Exibe mensagem de erro utilizando o toastify
          toast.error('Você precisa fazer login');
        } else {
          // Exibe mensagem de erro utilizando o toastify
          toast.error('Erro ao excluir embarcação');
        }
        // Configura o estado isLoading para false
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    async function getOwners() {
      setIsLoading(false);
      if (!owners) {
        try {
          const response = await axios.get(`/owner/`);
          setOwners(response.data);
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
          toast.error('Erro ao buscar os dados dos proprietários');
        }
      }
    }
    getOwners();
  }, [owners]);

  const handleChangeOwner = (e) => {
    async function getName(ownerid) {
      if (ownerid) {
        try {
          const { data } = await axios.get(`/owner/${ownerid}`);
          setOwner(data.nome);
        } catch (error) {
          toast.error('Erro ao buscar os dados do estaleiro');
        }
      } else {
        setOwner('');
      }
    }
    getName(e.target.value);
  };

  const handleClear = () => {
    setOwner('');
  };

  useEffect(() => {
    async function getSailors() {
      setIsLoading(false);
      if (!sailors) {
        try {
          const response = await axios.get(`/sailor/`);
          setSailors(response.data);
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
          toast.error('Erro ao buscar os dados dos marinheiros');
        }
      }
    }
    getSailors();
  }, [sailors]);

  const handleChangeSailor = (e) => {
    // eslint-disable-next-line no-shadow
    async function getName(sailorid) {
      if (sailorid) {
        try {
          const { data } = await axios.get(`/sailor/${sailorid}`);
          setSailor(data.nome);
        } catch (error) {
          toast.error('Erro ao buscar os dados do marinheiro');
        }
      } else {
        setSailor('');
      }
    }
    getName(e.target.value);
  };

  const handleClearSailor = () => {
    setSailor('');
  };

  useEffect(() => {
    async function getModels() {
      setIsLoading(false);
      if (!modelstb) {
        try {
          const response = await axios.get(`/model/`);
          setModelstb(response.data);
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
          toast.error('Erro ao buscar os dados dos modelos de embaração');
        }
      }
    }
    getModels();
  }, [modelstb]);

  const handleChangeModel = (e) => {
    async function getName(modelidtb) {
      if (modelidtb) {
        try {
          const { data } = await axios.get(`/model/${modelidtb}`);
          setModeltb(data.nome);
        } catch (error) {
          toast.error('Erro ao buscar os dados do modelo de embarcação');
        }
      } else {
        setModeltb('');
      }
    }
    getName(e.target.value);
  };

  const handleClearModel = () => {
    setModeltb('');
  };

  const handleClickShip = () => {
    toast.error('O estaleiro é cadastrado na aba de modelos de embarcação');
  };

  const handleClickClub = () => {
    toast.error('O Clube é cadastrado na aba de clubes, marinas e piers');
  };

  // Retorna o componente Boat
  return (
    <Container>
      <Loading isLoading={isLoading} />

      <Title>{id ? 'Editar dados da embarcação' : 'Nova Embarcação'}</Title>

      {id && (
        <ProfilePicture>
          {foto ? <img src={foto} alt={nome} /> : <FaUserCircle size={180} />}
          <Link to={`/fotos/${id}`}>
            <FaEdit size={24} />
          </Link>
        </ProfilePicture>
      )}

      <Form onSubmit={handleSubmit}>
        <label htmlFor="nome">
          Nome da Embarcação:
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Nome da Embarcação"
          />
        </label>

        <label htmlFor="owner">
          Proprietário:
          <input
            type="text"
            maxLength={0}
            autoComplete="on"
            onSelect={handleClear}
            value={owner}
            id={ownersid}
            list="owners"
            onChange={(e) => {
              setOwner(handleChangeOwner(e));
              setOwnersid(e.target.value);
            }}
            placeholder="Selecione um proprietário"
          />
        </label>
        {owners && (
          <datalist id="owners">
            {owners.map((ownersList) => (
              <option
                value={ownersList.id}
                aria-label={ownersList.id}
                key={ownersList.id}
                id={ownersList.id}
              >
                {ownersList.nome}
              </option>
            ))}
          </datalist>
        )}

        <label htmlFor="modeltb">
          Modelo da Embarcação:
          <input
            type="text"
            maxLength={0}
            autoComplete="on"
            onSelect={handleClearModel}
            value={modeltb}
            id={modelsid}
            list="modelstb"
            onChange={(e) => {
              setModeltb(handleChangeModel(e));
              setModelsid(e.target.value);
            }}
            placeholder="Selecione o modelo da embarcação"
          />
        </label>
        {modelstb && (
          <datalist id="modelstb">
            {modelstb.map((models) => (
              <option
                value={models.id}
                aria-label={models.id}
                key={models.id}
                id={models.id}
              >
                {models.nome}
              </option>
            ))}
          </datalist>
        )}

        <label htmlFor="shipyard">
          Estaleiro:
          <input
            type="text"
            onClick={handleClickShip}
            readOnly
            value={shipyard}
            onChange={(e) => setShipyard(e.target.value)}
            placeholder="Estaleiro"
          />
        </label>

        <label htmlFor="club">
          Clube, marina ou pier da embarcação:
          <input
            type="text"
            onClick={handleClickClub}
            readOnly
            value={club}
            onChange={(e) => setClub(e.target.value)}
            placeholder="Clube, marina ou pier da embarcação"
          />
        </label>

        <label htmlFor="sailor">
          Marinheiro Responsável:
          <input
            type="text"
            maxLength={0}
            autoComplete="on"
            onSelect={handleClearSailor}
            value={sailor}
            id={sailorsid}
            list="sailors"
            onChange={(e) => {
              setSailor(handleChangeSailor(e));
              setSailorsid(e.target.value);
            }}
            placeholder="Selecione o marinheiro responsável"
          />
        </label>
        {sailors && (
          <datalist id="sailors">
            {sailors.map((sailorsList) => (
              <option
                value={sailorsList.id}
                aria-label={sailorsList.id}
                key={sailorsList.id}
                id={sailorsList.id}
              >
                {sailorsList.nome}
              </option>
            ))}
          </datalist>
        )}

        <div className="botoes">
          <button type="submit">Salvar Alterações</button>
          {id && (
            <button type="button" onClick={(e) => handleDelete(e, id)}>
              Deletar Registro
            </button>
          )}
          <button type="button" onClick={handleBack}>
            Voltar
          </button>
        </div>
      </Form>
    </Container>
  );
}

// Define o tipo dos props do componente Boat
Boat.propTypes = {
  match: PropTypes.shape({}).isRequired,
};
