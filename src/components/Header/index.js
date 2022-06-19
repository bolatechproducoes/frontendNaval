// Importa o react
import React from 'react';
// Importa a fonte FaHome FaSignInAlt, FaUserAlt, FaCircle e FaPowerOff do react-icons/fa  (icones fonte awesome)
import {
  FaHome,
  FaSignInAlt,
  FaUserAlt,
  FaCircle,
  FaPowerOff,
} from 'react-icons/fa';
// Importa o metódo Link do react-router-dom
import { Link } from 'react-router-dom';
// Importa os metódos useSelector e useDispatch do redux
import { useSelector, useDispatch } from 'react-redux';

// Importa as ações do auth/actions.js
import * as actions from '../../store/modules/auth/actions';
// Importa o history para poder redirecionar páginas
import history from '../../services/history';
// Importa o componente Nav
import { Nav } from './styled';

// Exporta o componente funcional Header
export default function Header() {
  // Cria a constante dispatch que executa o metódo dispatch do redux
  const dispatch = useDispatch();
  // Cria a constante isLoggedIn que recebe o valor do estado do redux
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  // Função handleLogout que desloga o usuário
  const handleLogout = (e) => {
    // Evita que o formulário seja submetido
    e.preventDefault();
    // eslint-disable-next-line no-alert
    // eslint-disable-next-line no-restricted-globals
    if (confirm('Deseja realmente sair?')) {
      // Dispara a ação de loginFailure que desloga o usuário
      dispatch(actions.loginFailure());
      // Redireciona para a home
      history.push('/');
    }
  };

  // Retorna o componente Header
  return (
    <Nav>
      <span className="nauti">Nautilus</span>
      <Link to="/">
        <FaHome size={24} />
      </Link>
      <Link to="/register">
        <FaUserAlt size={24} />
      </Link>

      {isLoggedIn ? (
        <Link onClick={handleLogout} to="/logout">
          <FaPowerOff size={24} />
        </Link>
      ) : (
        <Link to="/login">
          <FaSignInAlt size={24} />
        </Link>
      )}

      {isLoggedIn && (
        <div className="greenBall">
          <FaCircle size={24} color="#66ff33" />
        </div>
      )}

      {!isLoggedIn && (
        <div className="greenBall">
          <FaCircle size={24} color="#f32222" />
        </div>
      )}
    </Nav>
  );
}
