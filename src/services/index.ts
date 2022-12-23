import axios, { AxiosResponse } from 'axios';

import getEnv from '@/utils/server/env';
import {
  GetAuthorResponseBody,
  GetLinktreesResponseBody,
  GetProjectsRequestQueryParameter,
  GetProjectsResponseBody,
  CreateEmailRequestBodyParameters,
} from './types';

const Services = {
  async getAuthor(): Promise<GetAuthorResponseBody> {
    return axios.get(`${getEnv().API_URI}/author`).then((res) => res.data);
  },
  async getProjects(
    params: GetProjectsRequestQueryParameter = {},
  ): Promise<GetProjectsResponseBody> {
    return axios.get(`${getEnv().API_URI}/projects`, { params }).then((res) => res.data);
  },
  async getLinktrees(): Promise<GetLinktreesResponseBody> {
    return axios.get(`${getEnv().API_URI}/linktrees`).then((res) => res.data);
  },
  async postEmail(body: CreateEmailRequestBodyParameters): Promise<AxiosResponse['data']> {
    return axios.post('/api/email', body).then((res) => res.data);
  },
};

export * from './types';

export default Services;
