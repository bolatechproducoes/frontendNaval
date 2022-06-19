// Importa o react
import React from 'react';
// Importa o metódo get do lodash
import { get } from 'lodash';
// Importa o toastify para exibir mensagens instantâneas
import { toast } from 'react-toastify';
// Importa o propTypes para validar os tipos dos componentes
import PropTypes from 'prop-types';
// Importa o metódo useDispatch do react-redux
import { useDispatch } from 'react-redux';

// Importa o componente estilizado Container
import { Container } from '../../styles/GlobalStyles';
// Importa o componente estilizado Loading
import Loading from '../../components/Loading';
// Importa os componentes estilizados
import { Title, Form } from './styled';
// Importa o axios para acessar o backend
import axios from '../../services/axios';
// Importa o axios para acessar o backend
import history from '../../services/history';
// Importa as ações para atualizar o estado do arquivo actions.js
import * as actions from '../../store/modules/auth/actions';

// Exporta o componente Fotos
export default function Fotos({ match }) {
  // Cria a constante dispatch que executa o useDispatch
  const dispatch = useDispatch();
  // Cria a constante id que recebe o id do usuário através do metódo get do lodash
  const id = get(match, 'params.id', '');

  // Define o estado inicial do componente isLoading
  const [isLoading, setIsloading] = React.useState(false);
  // Define o estado inicial do componente foto
  const [foto, setFoto] = React.useState('');

  // Função que busca a foto do usuário no backend
  React.useEffect(() => {
    const getData = async () => {
      try {
        // Define o estado isLoading como true
        setIsloading(true);
        // Cria a constante data que recebe a foto do aluno do backend
        const { data } = await axios.get(`/boat/${id}`);
        // Atribui a foto do aluno encontrada no banco de dados ao estado foto, caso não exista atribui uma string vazia
        setFoto(get(data, 'Fotos[0].url', ''));
        // Define o estado isLoading como false
        setIsloading(false);
      } catch {
        // Caso ocorra um erro, exibe uma mensagem de erro
        toast.error('Erro ao buscar foto do aluno');
        // Define o estado isLoading como false
        setIsloading(false);
        // Redireciona o usuário para a página de home
        history.push('/');
      }
    };

    // Executa a função getData
    getData();
  }, [id]);

  // Cria o metódo handleChange
  const handleChange = async (e) => {
    // Cria a constante foto que recebe o arquivo selecionado
    const file = e.target.files[0];
    // Cria a constante fotoURL que cria uma URL para a foto do aluno
    const fotoURL = URL.createObjectURL(file);

    // Atribui a fotoURL ao estado foto
    setFoto(fotoURL);

    // Cria a constante formData que cria um novo formulário de dados
    const formData = new FormData();
    // Adiciona o id do aluno ao formulário
    formData.append('boat_id', id);
    // Adiciona a foto do aluno ao formulário
    formData.append('foto', file);

    try {
      // Define o estado isLoading como true
      setIsloading(true);

      // Envia a foto do aluno para o backend
      await axios.post('/fotos/', formData, {
        // Cria o cabeçalho(headers) para enviar o arquivo
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Envia uma mensagem de sucesso com o toastify
      toast.success('Foto da embaracação atualizada com sucesso');

      // Define o estado isLoading como false
      setIsloading(false);
    } catch (err) {
      // Define o estado isLoading como false
      setIsloading(false);
      // Cria a constante status que recebe o status do erro
      const { status } = get(err, 'response', '');
      // Envia uma mensagem de erro com o toastify
      toast.error('Erro ao enviar foto');

      // Se o status for 401 dispara a ação de loginFailure
      if (status === 401) dispatch(actions.loginFailure());
    }
  };

  // Retorna o componente de Fotos
  return (
    <Container>
      <Loading isLoading={isLoading} />
      <Title>Fotos</Title>

      <Form>
        <label htmlFor="foto">
          {foto ? <img src={foto} alt="Foto" /> : 'selecionar'}
          <input type="file" id="foto" onChange={handleChange} />
        </label>
      </Form>
    </Container>
  );
}

Fotos.propTypes = {
  match: PropTypes.shape({}).isRequired,
};
