// Endpoints.d.ts
import axios, { AxiosResponse } from 'axios';

export default class Endpoints {
  constructor(baseURL: string, validHeader?: boolean);

  get<T = any>(
    endpoint: string,
    params?: Record<string, any>,
    successFunction?: () => Promise<void> | void,
    rejectFunction?: () => Promise<void> | void,
    admin?: boolean,
    confirmAlert?: boolean,
    messageConfirm?: string
  ): Promise<T>;

  post<T = any>(
    endpoint: string,
    data?: Record<string, any>,
    successFunction?: () => Promise<void> | void,
    admin?: boolean,
    rejectFunction?: () => Promise<void> | void,
    message?: string
  ): Promise<T>;

  put<T = any>(
    endpoint: string,
    data?: Record<string, any>,
    successFunction?: () => Promise<void> | void,
    admin?: boolean,
    rejectFunction?: () => Promise<void> | void,
    message?: string
  ): Promise<T>;

  delete<T = any>(
    endpoint: string,
    successFunction?: () => Promise<void> | void,
    admin?: boolean,
    rejectFunction?: () => Promise<void> | void,
    message?: string
  ): Promise<T>;
}
