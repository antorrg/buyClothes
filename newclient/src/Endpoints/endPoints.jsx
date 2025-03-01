import Endpoints from '../Utils/BaseEndpoints'
import axios from 'axios'

const usersApi = new Endpoints('/', false)

usersApi.get('users', )

api.get('productos', { categoria: 'electronica' }, () => {
    console.log('Función auxiliar ejecutada');
  }, true);