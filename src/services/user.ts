import React from 'react';
import axios from 'axios';
import { UserFormInput } from '../interface';
// import { baseURL } from '../constants';

export const getUsers = () => axios.get(`/users`).then(res => res.data).catch(err => err)

export const addUser = (formData: UserFormInput) => axios.post(`/users`, {...formData}).then(res => res).catch(err => err.response)