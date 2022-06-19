// Importa o axios para comunicar com o backend
import axios from 'axios';

// Exporta como padrão o axios com a configuração de conexão com o backend
export default axios.create({
  baseURL: 'http://localhost:3001/',
});
