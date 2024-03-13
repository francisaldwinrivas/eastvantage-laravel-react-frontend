import React from 'react'
import axios from 'axios'
import { LoginInput } from '../interface'

export const login = (formData: LoginInput) => axios.post('auth/login', {...formData}).then(res => res).catch(err => err.response)