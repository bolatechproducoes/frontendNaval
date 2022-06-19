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

// Importa o metódo isEmail do validator
import isEmail from 'validator/lib/isEmail';
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

// Exporta o componente Owner
export default function Owner({ match }) {
  // Cria a constante dispatch que executa o useDispatch
  const dispatch = useDispatch();

  // Cria a constante id que recebe o valor do id do usuário, caso não exista o valor é 0
  const id = get(match, 'params.id', '');
  // Cria a constante nome e a variavel de atribuição setNome que recebe o valor do nome do usuário
  const [nome, setNome] = useState('');
  // Cria a constante sobrenome e a variavel de atribuição setSobrenome que recebe o valor do nome do usuário
  const [sobrenome, setSobrenome] = useState('');
  // Cria a constante telefone e a variavel de atribuição setTelefone que recebe o valor do nome do usuário
  const [telefone, setTelefone] = useState('');
  // Cria a constante email e a variavel de atribuição setEmail que recebe o valor do nome do usuário
  const [email, setEmail] = useState('');
  const [clubs, setClubs] = useState('');
  const [clubsid, setClubsid] = useState(null);
  const [club, setClub] = useState('');
  const [clubid, setClubid] = useState('');

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
        const { data } = await axios.get(`/owner/${id}`);

        // Seta o estado do nome para o valor retornado pelo backend
        setNome(data.nome);
        // Seta o estado do sobrenome para o valor retornado pelo backend
        setSobrenome(data.sobrenome);
        // Seta o estado do telefone para o valor retornado pelo backend
        setTelefone(data.telefone);
        // Seta o estado do email para o valor retornado pelo backend
        setEmail(data.email);
        // Seta o estado do email para o valor retornado pelo backend
        setClubid(data.club_id);

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
  }, [id, clubid]);

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

    // Verifica se o sobrenome tem entre 3 e 50 caracteres
    if (sobrenome.length < 3 || sobrenome.length > 50) {
      // Gera a mensagem de erro com o toastify
      toast.error('O campo sobrenome deve ter entre 3 e 50 caracteres');
      // Altera o valor de formErrors para true
      formErrors = true;
    }
    // Verifica se a telefone tem entre 0 e 9 caracteres
    if (telefone.length < 0 || telefone.length > 9) {
      // Gera a mensagem de erro com o toastify
      toast.error('O campo telefone deve ter entre 0 e 9 caracteres');
      // Altera o valor de formErrors para true
      formErrors = true;
    }

    // Verifica se o email é válido
    if (!isEmail(email)) {
      // Gera a mensagem de erro com o toastify
      toast.error('E-mail inválido');
      // Altera o valor de formErrors para true
      formErrors = true;
    }

    // Caso ocorra algum erro no formulário, retorna
    if (formErrors) return;

    // Caso não tenha erros atualiza os dados do usuário no banco de dados
    try {
      // Seta o estado de isLoading para true
      setIsLoading(true);
      // Verifica se existe o id do proprietário, se existir edita os dados
      if (id) {
        // Envia os dados para o backend atualizar o banco de dados
        if (clubsid) {
          await axios.put(`/owner/${id}`, {
            nome,
            sobrenome,
            telefone,
            email,
            club_id: clubsid,
          });
        } else {
          await axios.put(`/owner/${id}`, {
            nome,
            sobrenome,
            telefone,
            email,
          });
        }
        // Gera a mensagem de sucesso com o toastify
        toast.success('Proprietário atualizado com sucesso');

        // Caso não exista id, cria um novo proprietário
      } else {
        // Envia os dados para o backend criar um novo registro no banco de dados e salva os dados no status
        const { data } = await axios.post(`/owner/`, {
          nome,
          sobrenome,
          telefone,
          email,
          club_id: clubsid,
        });
        // Gera a mensagem de sucesso com o toastify
        toast.success('Proprietário cadastrado com sucesso');
        // Redireciona o usuário para a página de edição da embracação criada
        history.push(`/owner/${data.id}/edit/`);
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
    history.push('/owners/');
  };

  // Cria o metódo handleDelete para excluir o marinheiro do banco de dados
  const handleDelete = async (e, ids) => {
    // Mantem o evento recebido
    e.preventDefault();

    // eslint-disable-next-line no-restricted-globals
    // eslint-disable-next-line no-alert
    if (window.confirm('Tem certeza que deseja excluir o proprietário?')) {
      // Inicia a requisição ao backend para excluir o marinheiro
      try {
        // Configura o estado isLoading para true
        setIsLoading(true);
        // Deleta o registro da embarcação no banco de dados
        await axios.delete(`/owner/${ids}`);
        toast.success('Proprietário excluído com sucesso');
        setIsLoading(false);
        history.push('/owners/');
      } catch (err) {
        // Cria a constante status que recebe o status do erro ou caso não haja erro, recebe um 0
        const status = get(err, 'response.status', 0);
        // Verifica se o status é 401
        if (status === 401) {
          // Exibe mensagem de erro utilizando o toastify
          toast.error('Você precisa fazer login');
        } else {
          // Exibe mensagem de erro utilizando o toastify
          toast.error('Erro ao excluir proprietário');
        }
        // Configura o estado isLoading para false
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    async function getClubs() {
      setIsLoading(false);
      if (!clubs) {
        try {
          const response = await axios.get(`/club/`);
          setClubs(response.data);
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
          toast.error('Erro ao buscar os dados dos clubes, marinas e piers');
        }
      }
    }
    getClubs();
  }, [clubs]);

  const handleChangeClub = (e) => {
    async function getName(clubids) {
      if (clubids) {
        try {
          const { data } = await axios.get(`/club/${clubids}`);
          setClub(data.nome);
        } catch (error) {
          toast.error('Erro ao buscar os dados do clube, marina ou piers');
        }
      } else {
        setClub('');
      }
    }
    getName(e.target.value);
  };

  const handleClear = () => {
    setClub('');
  };

  // Retorna o componente Owner
  return (
    <Container>
      <Loading isLoading={isLoading} />

      <Title>{id ? 'Editar dados do proprietário' : 'Novo Proprietário'}</Title>

      <Form onSubmit={handleSubmit}>
        <label htmlFor="nome">
          Nome do Proprietário:
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Nome do Proprietário"
          />
        </label>

        <label htmlFor="sobrenome">
          Sobrenome:
          <input
            type="text"
            value={sobrenome}
            onChange={(e) => setSobrenome(e.target.value)}
            placeholder="Sobrenome:"
          />
        </label>

        <label htmlFor="telefone">
          Telefone:
          <input
            type="text"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            placeholder="Telefone:"
          />
        </label>

        <label htmlFor="email">
          E-mail:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail:"
          />
        </label>

        <label htmlFor="club">
          Clube, marina ou pier:
          <input
            type="text"
            maxLength={0}
            autoComplete="on"
            onSelect={handleClear}
            value={club}
            id={clubsid}
            list="clubs"
            onChange={(e) => {
              setClub(handleChangeClub(e));
              setClubsid(e.target.value);
            }}
            placeholder="Selecione o clube, marina ou pier"
          />
        </label>
        {clubs && (
          <datalist id="clubs">
            {clubs.map((clubsids) => (
              <option
                value={clubsids.id}
                aria-label={clubsids.id}
                key={clubsids.id}
                id={clubsids.id}
              >
                {clubsids.nome}
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
Owner.propTypes = {
  match: PropTypes.shape({}).isRequired,
};
