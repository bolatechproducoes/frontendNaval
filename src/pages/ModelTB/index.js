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

// Importa o axios
import axios from '../../services/axios';
// Importa o history
import history from '../../services/history';

// Importa o componente estilizado Container
import { Container } from '../../styles/GlobalStyles';
// Importa o componente estilizado Form
import { Form, Title } from './styled';
// Importa o componente estilizado Loading
import Loading from '../../components/Loading';
// Importa as ações definidas no arquivo actions.js
import * as actions from '../../store/modules/auth/actions';

// Exporta o componente ModelTB
export default function ModelTB({ match }) {
  // Cria a constante dispatch que executa o useDispatch
  const dispatch = useDispatch();

  // Cria a constante id que recebe o valor do id do usuário, caso não exista o valor é 0
  const id = get(match, 'params.id', '');
  // Cria a constante nome e a variavel de atribuição setNome que recebe o valor do nome do usuário
  const [nome, setNome] = useState('');
  // Cria a constante shipyardid e a variavel de atribuição setShipyardid que recebe o valor do id do modelo
  const [shipyardid, setShipyardid] = useState('');
  // Cria a constante shipyard e a variavel de atribuição setShipyard que recebe o valor do id do modelo
  const [shipyard, setShipyard] = useState('');
  // Cria a constante shipyard e a variavel de atribuição setShipyard que recebe o valor do id do modelo
  const [shipyards, setShipyards] = useState('');
  // Cria a constante shipyard e a variavel de atribuição setShipyard que recebe o valor do id do modelo
  const [shipyardsid, setShipyardsid] = useState('');

  // Cria a constante isLoading e a variavel de atribuição setIsLoading que recebe o valor do nome do usuário
  const [isLoading, setIsLoading] = useState();

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
        const { data } = await axios.get(`/model/${id}`);

        // Seta o estado do nome para o valor retornado pelo backend
        setNome(data.nome);
        // Seta o estado da regiao para o valor retornado pelo backend
        setShipyardid(data.shipyard_id);
        // Seta o valor de isLoading para false

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
  }, [id, shipyardid, shipyards]);

  // Metódo handleSubmit
  const handleSubmit = async (e) => {
    // Evita o comportamento padrão do formulário
    e.preventDefault();
    // cria a variavel formErrors que recebe o valor false
    let formErrors = false;

    // Verifica se o nome tem entre 3 e 50 caracteres
    if (nome.length < 3 || nome.length > 50) {
      // Gera a mensagem de erro com o toastify
      toast.error('O campo nome deve ter entre 3 e 50 caracteres');
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
        if (shipyardsid) {
          await axios.put(`/model/${id}`, {
            nome,
            shipyard_id: shipyardsid,
          });
        } else {
          await axios.put(`/model/${id}`, {
            nome,
          });
        }
        // Gera a mensagem de sucesso com o toastify
        toast.success('Modelo atualizado com sucesso');

        // Caso não exista id, cria uma nova embarcação
      } else {
        // Envia os dados para o backend criar um novo registro no banco de dados e salva os dados no status
        const { data } = await axios.post(`/model/`, {
          nome,
          shipyard_id: shipyardsid,
        });
        // Gera a mensagem de sucesso com o toastify
        toast.success('Modelo cadastrado com sucesso');
        // Redireciona o usuário para a página de edição do modelo criada
        history.push(`/model/${data.id}/edit/`);
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
    history.push('/models/');
  };

  // Cria o metódo handleDelete para excluir o marinheiro do banco de dados
  const handleDelete = async (e, ids) => {
    // Mantem o evento recebido
    e.preventDefault();

    // eslint-disable-next-line no-restricted-globals
    // eslint-disable-next-line no-alert
    if (window.confirm('Tem certeza que deseja excluir o modelo?')) {
      // Inicia a requisição ao backend para excluir o marinheiro
      try {
        // Configura o estado isLoading para true
        setIsLoading(true);
        // Deleta o registro da embarcação no banco de dados
        await axios.delete(`/model/${ids}`);
        toast.success('Modelo excluído com sucesso');
        setIsLoading(false);
        history.push('/models/');
      } catch (err) {
        // Cria a constante status que recebe o status do erro ou caso não haja erro, recebe um 0
        const status = get(err, 'response.status', 0);
        // Verifica se o status é 401
        if (status === 401) {
          // Exibe mensagem de erro utilizando o toastify
          toast.error('Você precisa fazer login');
        } else {
          // Exibe mensagem de erro utilizando o toastify
          toast.error('Erro ao excluir modelo');
        }
        // Configura o estado isLoading para false
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    async function getShips() {
      setIsLoading(false);
      if (!shipyards) {
        try {
          const response = await axios.get(`/shipyard/`);
          setShipyards(response.data);
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
          toast.error('Erro ao buscar os dados dos estaleiros');
        }
      }
    }
    getShips();
  }, [shipyards]);

  const handleChangeShip = (e) => {
    async function getName(shipid) {
      if (shipid) {
        try {
          const { data } = await axios.get(`/shipyard/${shipid}`);
          setShipyard(data.nome);
        } catch (error) {
          toast.error('Erro ao buscar os dados do estaleiro');
        }
      } else {
        setShipyard('');
      }
    }
    getName(e.target.value);
  };

  const handleClear = () => {
    setShipyard('');
  };

  // Retorna o componente Boat
  return (
    <Container>
      <Loading isLoading={isLoading} />

      <Title>{id ? 'Editar dados do Modelo' : 'Novo Modelo'}</Title>

      <Form onSubmit={handleSubmit}>
        <label htmlFor="nome">
          Nome do Modelo:
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Nome do Modelo"
          />
        </label>

        <label htmlFor="shipyard">
          Estaleiro:
          <input
            type="text"
            maxLength={0}
            autoComplete="on"
            onSelect={handleClear}
            value={shipyard}
            id={shipyardsid}
            list="ships"
            onChange={(e) => {
              setShipyard(handleChangeShip(e));
              setShipyardsid(e.target.value);
            }}
            placeholder="Selecione o estaleiro"
          />
        </label>
        {shipyards && (
          <datalist id="ships">
            {shipyards.map((ships) => (
              <option
                value={ships.id}
                aria-label={ships.id}
                key={ships.id}
                id={ships.id}
              >
                {ships.nome}
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
ModelTB.propTypes = {
  match: PropTypes.shape({}).isRequired,
};
