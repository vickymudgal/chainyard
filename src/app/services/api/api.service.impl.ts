import axios, {AxiosInstance, AxiosResponse, AxiosRequestConfig, AxiosError} from 'axios';
import * as _ from 'lodash';

import Config from '@config';
import {APIService} from './api.service';

export class APIServiceImpl implements APIService {
  service: AxiosInstance
  constructor() {
    this.service = axios.create({
      baseURL: Config.apiEndpoint,
    });
    this.service.interceptors.request.use((request): AxiosRequestConfig => {
      // can modify request here ex- send auth token
      // request.headers['Access-Control-Allow-Origin'] = '*';
      return request;
    });

    this.service.interceptors.response.use(
      (response): AxiosResponse => {
        // handle response
        return response;
      },
      (error): Promise<AxiosError> => {
        // ex- logout user if statusCode is 401
        return Promise.reject(error);
      },
    );
  }

  protected static parseError(response: AxiosResponse): string {
    return _.get(response, 'response.data.error', '');
  }

  protected async get(path: string): Promise<AxiosResponse> {
    return await this.service.get(path);
  }

  protected async patch(path: string, payload: any): Promise<AxiosResponse> {
    return await this.service.patch(path, payload);
  }

  protected async put(path: string, payload: any): Promise<AxiosResponse> {
    return await this.service.put(path, payload);
  }

  protected async post(path: string, payload: any): Promise<AxiosResponse> {
    return await this.service.post(path, payload);
  }

  protected async postMedia(path: string, payload: any): Promise<AxiosResponse> {
    return await this.service.post(path, payload, {
      headers: {
        'accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        'Accept-Language': 'en-US,en;q=0.8',
        'Content-Type': `multipart/form-data; boundary=${payload._boundary}`,
      }
    });
  }

  protected async delete(path: string, payload: any): Promise<AxiosResponse> {
    return await this.service.delete(path, payload);
  }
}
