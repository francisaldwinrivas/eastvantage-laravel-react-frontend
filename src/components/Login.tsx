import React, { useEffect, useState } from 'react'
import { useForm, SubmitHandler  } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from 'yup'
import { LoginInput, LoginProps } from '../interface';
import { login } from '../services/auth';


function Login({  
    setAccessToken
}: LoginProps) {
    const [postError, setPostError] = useState<string|null>(null);

    const schema = Yup.object().shape({
        email: Yup.string().email().required('Please provide your email'),
        password: Yup.string().required('Please provide your password'),
    }).required();

    const { register, handleSubmit, formState: { errors } } = useForm<LoginInput>({
        resolver: yupResolver(schema)
    });

    const setAuthData = (accessToken: string) => {
        localStorage.setItem('accessToken', accessToken)
        setAccessToken(accessToken)
    }
    

    const onSubmit : SubmitHandler<LoginInput> = async (formData: LoginInput) => {
        const { data } = await login(formData)
        return data.success ? setAuthData(data.access_token) : setPostError(data.message);
    }

    return (
        <div className="login container">
            <div id="login-form">
                <div className="mb-4 text-center">
                    <h4>WELCOME</h4>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {postError && <p className="form-error">{postError}</p>}
                    <div className="form-group">
                        <p>Email: <input type="email" className="form-control" {...register('email')}/></p>
                        {errors.email && <p className="form-error">{errors.email.message}</p>}
                    </div>
                    <div className="form-group">
                        <p>Password: <input type="password" className="form-control" {...register('password')} /></p>
                        {errors.password && <p className="form-error">{errors.password.message}</p>}
                    </div>
                    <div className="form-group text-right">
                        <button type="submit" className="btn btn-primary btn-lg">Login</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;