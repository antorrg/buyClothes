import axios from 'axios';
import { showSuccess, handleError } from './toastify';
import Swal from 'sweetalert2';

class Endpoints {
  constructor(baseURL, validHeader = false) {
    this.baseURL = baseURL;
    this.validHeader = validHeader;
  }
   // Métodos privados
   async #confirmDialog(message) {
    const result = await Swal.fire({
      title: message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar'
    });
    return result.isConfirmed;
  }

  async #withConfirmation(message, fn) {
    const confirmed = await this.#confirmDialog(message);
    if (confirmed) return await fn();
  }

  setAuthHeader() {
    const token = localStorage.getItem('validToken');
    const config = { headers: {} };
    if (token && this.validHeader) {
      config.headers['x-access-token'] = `${token}`;
    }
    return config;
  }

  async get(endpoint, {
    params = {},
    success = null,
    reject = null,
    admin = false
  } = {}) {
    try {
      const config = admin ? this.setAuthHeader() : {};
      const response = await axios.get(`${this.baseURL}/${endpoint}`, {
        ...config,
        params,
      });
      if (success) await success();
      return response.data.results;
    } catch (error) {
      handleError(error);
      if (reject) await reject();
      throw error;
    }
  }

  async post(endpoint, data = {}, {
    success = null,
    reject = null,
    admin = false,
    confirm = false,
    confirmMessage = '¿Deseas continuar?',
    successMessage = 'Operación exitosa'
  } = {}) {
    const request = async () => {
      try{
      const config = admin ? this.setAuthHeader() : {};
      const response = await axios.post(`${this.baseURL}/${endpoint}`, data, config);
      showSuccess(successMessage);
      if (success) await success();
      return response.data;
    } catch (error) {
      handleError(error);
      if (reject) await reject();
      throw error;
    }
    };

    return confirm ? await this.#withConfirmation(confirmMessage, request) : await request();
  }

  async put(endpoint, data = {}, {
    success = null,
    reject = null,
    admin = false,
    confirm = false,
    confirmMessage = '¿Deseas actualizar?',
    successMessage = 'Actualización exitosa'
  } = {}) {
    const request = async () => {
      try{
      const config = admin ? this.setAuthHeader() : {};
      const response = await axios.put(`${this.baseURL}/${endpoint}`, data, config);
      showSuccess(successMessage);
      if (success) await success();
      return response.data;
    } catch (error) {
      handleError(error);
      if (reject) await reject();
      throw error;
    }
    };

    return confirm ? await this.#withConfirmation(confirmMessage, request) : await request();
  }

  async delete(endpoint, {
    success = null,
    reject = null,
    admin = false,
    confirm = true,
    confirmMessage = '¿Estás seguro que deseas eliminar?',
    successMessage = 'Eliminación exitosa'
  } = {}) {
    const request = async () => {
      try{
      const config = admin ? this.setAuthHeader() : {};
      const response = await axios.delete(`${this.baseURL}/${endpoint}`, config);
      showSuccess(successMessage);
      if (success) await success();
      return response.data;
    } catch (error) {
      handleError(error);
      if (reject) await reject();
      throw error;
    }
    };

    return confirm ? await this.#withConfirmation(confirmMessage, request) : await request();
  }

 
}

export default Endpoints;
