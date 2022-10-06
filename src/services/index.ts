import axios, { AxiosResponse } from 'axios';

import { API_URI } from '../config/globals';
import { Author } from '../types/defaults';
import { Project } from '../types/project';
import { Linktree } from '../types/linktree';
import { Email } from '../types/email';

const Services = {
  async getAuthor(): Promise<Author> {
    return axios.get(`${API_URI}/author`).then((res) => res.data);
  },
  async getProjects(
    params: { archived?: boolean; sort?: 'ASC' | 'DESC'; limit?: number } = {},
  ): Promise<{ projects: Project[] }> {
    return axios.get(`${API_URI}/projects`, { params }).then((res) => res.data);
  },
  async getLinktrees(): Promise<{ linktrees: Linktree[] }> {
    return axios.get(`${API_URI}/linktrees`).then((res) => res.data);
  },
  async postEmail(email: Email): Promise<AxiosResponse['data']> {
    return axios.post(`${API_URI}/email`, email).then((res) => res.data);
  },
};

export default Services;
