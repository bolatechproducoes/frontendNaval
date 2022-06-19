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
// Importa o metódo isEmail do validator
import isFloat from 'validator/lib/isFloat';
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

// Exporta o componente Club
export default function Club({ match }) {
  // Cria a constante dispatch que executa o useDispatch
  const dispatch = useDispatch();

  // Cria a constante id que recebe o valor do id do usuário, caso não exista o valor é 0
  const id = get(match, 'params.id', '');
  // Cria a constante nome e a variavel de atribuição setNome que recebe o valor do nome do usuário
  const [nome, setNome] = useState('');
  // Cria a constante estado e a variavel de atribuição setSestado que recebe o valor do nome do usuário
  const [estado, setEstado] = useState('');
  // Cria a constante regiao e a variavel de atribuição setRegiao que recebe o valor do nome do usuário
  const [regiao, setRegiao] = useState('');
  // Cria a constante cidade e a variavel de atribuição setCidade que recebe o valor do nome do usuário
  const [cidade, setCidade] = useState('');
  // Cria a constante telefone e a variavel de atribuição setTelefone que recebe o valor do nome do usuário
  const [telefone, setTelefone] = useState('');
  // Cria a constante homepage e a variavel de atribuição setHomepage que recebe o valor do nome do usuário
  const [homepage, setHomepage] = useState('');
  // Cria a constante email e a variavel de atribuição setEmail que recebe o valor do nome do usuário
  const [email, setEmail] = useState('');
  // Cria a constante endereco e a variavel de atribuição setEndereco que recebe o valor do nome do usuário
  const [endereco, setEndereco] = useState('');
  // Cria a constante coordenada e a variavel de atribuição setCoordenada que recebe o valor do nome do usuário
  const [coordenada, setCoordenada] = useState('');
  // Cria a constante calado e a variavel de atribuição setCalado que recebe o valor do nome do usuário
  const [calado, setCalado] = useState('');

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
        const { data } = await axios.get(`/club/${id}`);

        // Seta o estado do nome para o valor retornado pelo backend
        setNome(data.nome);
        // Seta o estado da regiao para o valor retornado pelo backend
        setRegiao(data.regiao);
        // Seta o estado do estado para o valor retornado pelo backend
        setEstado(data.estado);
        // Seta o estado do cidade para o valor retornado pelo backend
        setCidade(data.cidade);
        // Seta o estado do telefone para o valor retornado pelo backend
        setTelefone(data.telefone);
        // Seta o estado da homepage para o valor retornado pelo backend
        setHomepage(data.homepage);
        // Seta o estado do email para o valor retornado pelo backend
        setEmail(data.email);
        // Seta o estado do endereco para o valor retornado pelo backend
        setEndereco(data.endereco);
        // Seta o estado do coordenada para o valor retornado pelo backend
        setCoordenada(data.coordenada);
        // Seta o estado do calado para o valor retornado pelo backend
        setCalado(data.calado_max);

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
  }, [id]);

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

    // Verifica se a região tem entre 1 e 25 caracteres
    if (regiao.length < 1 || regiao.length > 25) {
      // Gera a mensagem de erro com o toastify
      toast.error('O campo região deve ter entre 1 e 25 caracteres');
      // Altera o valor de formErrors para true
      formErrors = true;
    }

    // Verifica se o estado tem entre 2 e 50 caracteres
    if (estado.length < 2 || estado.length > 50) {
      // Gera a mensagem de erro com o toastify
      toast.error('O campo estado deve ter entre 2 e 50 caracteres');
      // Altera o valor de formErrors para true
      formErrors = true;
    }

    // Verifica se a cidade tem entre 3 e 50 caracteres
    if (cidade.length < 3 || cidade.length > 50) {
      // Gera a mensagem de erro com o toastify
      toast.error('O campo cidade deve ter entre 2 e 50 caracteres');
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

    // Verifica se o calado é do tipo float
    if (calado && !isFloat(calado)) {
      // Gera a mensagem de erro com o toastify
      toast.error('O valor do calado deve ser do tipo float');
      // Altera o valor de formErrors para true
      formErrors = true;
    }

    // Verifica se o endereco tem entre 3 e 255 caracteres
    if (endereco.length < 3 || endereco.length > 255) {
      // Gera a mensagem de erro com o toastify
      toast.error('O campo endereco deve ter entre 3 e 255 caracteres');
      // Altera o valor de formErrors para true
      formErrors = true;
    }

    // Verifica se a homepage tem entre 0 e 255 caracteres
    if (homepage.length < 0 || homepage.length > 255) {
      // Gera a mensagem de erro com o toastify
      toast.error('O campo homepage deve ter entre 0 e 255 caracteres');
      // Altera o valor de formErrors para true
      formErrors = true;
    }

    // Verifica se a coordenada tem entre 0 e 50 caracteres
    if (coordenada.length < 0 || coordenada.length > 50) {
      // Gera a mensagem de erro com o toastify
      toast.error('O campo coordenada deve ter entre 0 e 255 caracteres');
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
        await axios.put(`/club/${id}`, {
          nome,
          coordenada,
          regiao,
          estado,
          cidade,
          telefone,
          calado_max: calado,
          homepage,
          email,
          endereco,
        });
        // Gera a mensagem de sucesso com o toastify
        toast.success('Clube, marina ou pier atualizado com sucesso');

        // Caso não exista id, cria uma nova embarcação
      } else {
        // Envia os dados para o backend criar um novo registro no banco de dados e salva os dados no status
        const { data } = await axios.post(`/club/`, {
          nome,
          coordenada,
          regiao,
          estado,
          cidade,
          telefone,
          calado_max: calado,
          homepage,
          email,
          endereco,
        });
        // Gera a mensagem de sucesso com o toastify
        toast.success('Clube, marina ou pier cadastrado com sucesso');
        // Redireciona o usuário para a página de edição da embracação criada
        history.push(`/club/${data.id}/edit/`);
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
    history.push('/clubs/');
  };

  // Cria o metódo handleDelete para excluir o marinheiro do banco de dados
  const handleDelete = async (e, ids) => {
    // Mantem o evento recebido
    e.preventDefault();

    if (
      // eslint-disable-next-line no-restricted-globals
      // eslint-disable-next-line no-alert
      window.confirm('Tem certeza que deseja excluir o clube, marina ou pier?')
    ) {
      // Inicia a requisição ao backend para excluir o marinheiro
      try {
        // Configura o estado isLoading para true
        setIsLoading(true);
        // Deleta o registro da embarcação no banco de dados
        await axios.delete(`/club/${ids}`);
        toast.success('Clube, marina ou pier excluído com sucesso');
        setIsLoading(false);
        history.push('/clubs/');
      } catch (err) {
        // Cria a constante status que recebe o status do erro ou caso não haja erro, recebe um 0
        const status = get(err, 'response.status', 0);
        // Verifica se o status é 401
        if (status === 401) {
          // Exibe mensagem de erro utilizando o toastify
          toast.error('Você precisa fazer login');
        } else {
          // Exibe mensagem de erro utilizando o toastify
          toast.error('Erro ao excluir clube, marina ou pier');
        }
        // Configura o estado isLoading para false
        setIsLoading(false);
      }
    }
  };

  // Retorna o componente Boat
  return (
    <Container>
      <Loading isLoading={isLoading} />

      <Title>
        {id
          ? 'Editar dados do clube, marina ou pier'
          : 'Novo clube, marina ou pier'}
      </Title>

      <Form onSubmit={handleSubmit}>
        <label htmlFor="nome">
          Nome do Clube, Marina ou Pier:
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Nome do Clube, Marina ou Pier"
          />
        </label>

        <label htmlFor="coordenada">
          Coordenada:
          <input
            type="text"
            value={coordenada}
            onChange={(e) => setCoordenada(e.target.value)}
            placeholder="Coordenada:"
          />
        </label>

        <label htmlFor="regiao">
          Região:
          <input
            type="text"
            value={regiao}
            onChange={(e) => setRegiao(e.target.value)}
            placeholder="Região do Clube, Marina ou Pier:"
          />
        </label>

        <label htmlFor="estado">
          Estado:
          <input
            type="text"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            placeholder="Estado:"
          />
        </label>

        <label htmlFor="cidade">
          Cidade:
          <input
            type="text"
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
            placeholder="Cidade:"
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

        <label htmlFor="calado">
          Calado Máximo Permitido:
          <input
            type="text"
            value={calado}
            onChange={(e) => setCalado(e.target.value)}
            placeholder="Calado Máximo:"
          />
        </label>

        <label htmlFor="homepage">
          Homepage:
          <input
            type="text"
            value={homepage}
            onChange={(e) => setHomepage(e.target.value)}
            placeholder="Homepage:"
          />
        </label>

        <label htmlFor="email">
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail:"
          />
        </label>

        <label htmlFor="endereco">
          Endereço:
          <input
            type="text"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
            placeholder="Endereço:"
          />
        </label>

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
Club.propTypes = {
  match: PropTypes.shape({}).isRequired,
};
