import axios, { AxiosRequestConfig } from 'axios';
import { showSuccess, handleError } from './toastify';
import Swal from 'sweetalert2';

// Tipado para los parámetros de las funciones
interface RequestOptions {
  params?: Record<string, any>;
  data?: any;
  success?: () => Promise<void> | void;
  reject?: () => Promise<void> | void;
  admin?: boolean;
  confirm?: boolean;
  confirmMessage?: string;
  successMessage?: string;
}

class Endpoints {
  private baseURL: string;
  private validHeader: boolean;

  constructor(baseURL: string, validHeader: boolean = false) {
    this.baseURL = baseURL;
    this.validHeader = validHeader;
  }

  private setAuthHeader(): AxiosRequestConfig {
    const token = localStorage.getItem('validToken');
    const config: AxiosRequestConfig = {
      headers: {},
    };
    if (token && this.validHeader) {
      config.headers!['x-access-token'] = token;
    }
    return config;
  }

  async get<T = any>(endpoint: string, {
    params = {},
    success,
    reject,
    admin = false,
  }: RequestOptions = {}): Promise<T> {
    try {
      const config = admin ? this.setAuthHeader() : {};
      const response = await axios.get<T>(`${this.baseURL}/${endpoint}`, {
        ...config,
        params,
      });
      if (success) await success();
      return response.data as T;
    } catch (error) {
      handleError(error);
      if (reject) await reject();
      throw error;
    }
  }

  async post<T = any>(endpoint: string, data: any = {}, {
    success,
    reject,
    admin = false,
    confirm = false,
    confirmMessage = '¿Deseas continuar?',
    successMessage = 'Operación exitosa',
  }: RequestOptions = {}): Promise<T | void> {
    const request = async () => {
      const config = admin ? this.setAuthHeader() : {};
      const response = await axios.post<T>(`${this.baseURL}/${endpoint}`, data, config);
      showSuccess(successMessage);
      if (success) await success();
      return response.data;
    };

    return confirm ? await this.#withConfirmation(confirmMessage, request) : await request();
  }

  async put<T = any>(endpoint: string, data: any = {}, {
    success,
    reject,
    admin = false,
    confirm = false,
    confirmMessage = '¿Deseas actualizar?',
    successMessage = 'Actualización exitosa',
  }: RequestOptions = {}): Promise<T | void> {
    const request = async () => {
      const config = admin ? this.setAuthHeader() : {};
      const response = await axios.put<T>(`${this.baseURL}/${endpoint}`, data, config);
      showSuccess(successMessage);
      if (success) await success();
      return response.data;
    };

    return confirm ? await this.#withConfirmation(confirmMessage, request) : await request();
  }

  async delete<T = any>(endpoint: string, {
    success,
    reject,
    admin = false,
    confirm = true,
    confirmMessage = '¿Estás seguro que deseas eliminar?',
    successMessage = 'Eliminación exitosa',
  }: RequestOptions = {}): Promise<T | void> {
    const request = async () => {
      const config = admin ? this.setAuthHeader() : {};
      const response = await axios.delete<T>(`${this.baseURL}/${endpoint}`, config);
      showSuccess(successMessage);
      if (success) await success();
      return response.data;
    };

    return confirm ? await this.#withConfirmation(confirmMessage, request) : await request();
  }

  // Métodos privados
  async #confirmDialog(message: string): Promise<boolean> {
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

  async #withConfirmation<T>(message: string, fn: () => Promise<T>): Promise<T | void> {
    const confirmed = await this.#confirmDialog(message);
    if (confirmed) return await fn();
  }
}

export default Endpoints;
