// Importa o react
import React from 'react';
// Importa o metódo toast do react-toastify para gerar as mensagens ao usuário
import { toast } from 'react-toastify';
// Importa o metódo is email do validator
import { isEmail } from 'validator';
// Importa os metódos useDispath e useSelector do react-redux
import { useDispatch, useSelector } from 'react-redux';
// Importa o metódo get do lodash
import { get } from 'lodash';
import { Link } from 'react-router-dom';

// Importa o componente estilizado Container
import { Container } from '../../styles/GlobalStyles';
// Importa o componente estilizado Form
import { Form } from './styled';
// Importa tudo auth/actions.js como actions
import * as actions from '../../store/modules/auth/actions';

// Importa o componente Loading
import Loading from '../../components/Loading';

// Exporta o componente Login
export default function Login(props) {
  // Cria a constante dispath que serve como disparador de ações
  const dispatch = useDispatch();

  // Cria a constante prevPath que recebe o caminho anterior da rota e caso não receba nada, recebe '/'
  const prevPath = get(props, 'location.state.prevPath', '/');

  // Cria a constante isLoading que recebe o estado do auth/isLoading utilizando a hook useSelector
  const isLoading = useSelector((state) => state.auth.isLoading);

  // Cria o estado do valor do input email
  const [email, setEmail] = React.useState('');
  // Cria o estado do valor do input senha
  const [password, setPassword] = React.useState('');

  // Função handleSubmit que recebe o evento de submit do formulário, verifica campos e envia para o backend
  const handleSubmit = (e) => {
    // Evita que a página seja recarregada com o evento submit padrão do formulário
    e.preventDefault();
    // Cria a variavel formErrors com o valor inicial false
    let formErrors = false;

    // Utiliza o metódo isEmail do validator para verificar se o email é válido
    if (!isEmail(email)) {
      // Seta o formErrors como true
      formErrors = true;
      // Exibe a mensagem de erro utilizando o toastify
      toast.error('E-mail inválido');
    }

    // Verifica se a senha tem entre 6 e 50 caracteres
    if (password.length < 6 || password.length > 50) {
      // Seta o formErrors como true
      formErrors = true;
      // Exibe a mensagem de erro utilizando o toastify
      toast.error('Senha inválida');
    }

    // Se for verificado erros retorna sem acessar o backend
    if (formErrors) return;

    // Dispara a ação loginRequest para iniciar a saga do redux e realizar o login
    dispatch(actions.loginRequest({ email, password, prevPath }));
  };

  // Retorna o componente de login
  return (
    <Container>
      <Loading isLoading={isLoading} />

      <h1>Login</h1>

      <Form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Seu e-mail"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Sua senha"
        />

        <button type="submit">Acessar</button>

        <div className="toRegister">
          <p>
            Ainda não tem conta? Clique <Link to="/register/">aqui</Link> para
            criar uma conta
          </p>
        </div>
      </Form>
    </Container>
  );
}
