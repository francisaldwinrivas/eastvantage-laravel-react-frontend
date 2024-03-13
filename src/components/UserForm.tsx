import React, { useEffect, useState } from 'react'
import { useForm, SubmitHandler, Controller  } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from 'yup'
import { UserFormProps, UserFormInput } from '../interface';
import Select from 'react-select'
import { OPTIONS } from '../constants';
import { addUser, getUsers } from '../services/user';



const UserForm = ({ setAddMode, setUsers }: UserFormProps) => {
    const [postError, setPostError] = useState<string|null>(null);

    const schema = Yup.object().shape({
        name: Yup.string().required('Name field is required'),
        email: Yup.string().email().required('Email field is required'),
        password: Yup.string().required('Please provide the password'),
        password_confirmation: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match').required('Please provide the password'),
        roles: Yup.array()
        .of(Yup.number().required())
        .min(1, 'Please select role/s')
        .required('Please select role/s')
    }).required();

    const { register, control, handleSubmit, setValue, setError, formState: { errors } } = useForm<UserFormInput>({
        resolver: yupResolver(schema)
    });
    
    
    const onSubmit : SubmitHandler<UserFormInput> = async (formData: UserFormInput) => {
        const { data } = await addUser(formData);
        // console.log(response)

        if(data.errors) {
            for (const [k, value] of Object.entries(data.errors)) {
                const key = k as keyof UserFormInput
                setError(`${key}`, { message: `${value}`})
            }
        } else {
            if(data.success) {
                const userList = await getUsers()
                setUsers(userList)
                setAddMode(false)
            } else {
                setPostError(data.message);
            }
        }
    }

    return (
        <div className="user container">
            <div id="user-form">
                <div className="mb-4 text-center">
                    <h4>ADD NEW USER</h4>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {postError && <p className="form-error">{postError}</p>}
                    <div className="form-group">
                        <p>Name: <input type="text" className="form-control" {...register('name')}/></p>
                        {errors.name && <p className="form-error">{errors.name.message}</p>}
                    </div>
                    <div className="form-group">
                        <p>Email: <input type="email" className="form-control" {...register('email')}/></p>
                        {errors.email && <p className="form-error">{errors.email.message}</p>}
                    </div>
                    <div className="form-group">
                        <p>Password: <input type="password" className="form-control" {...register('password')} /></p>
                        {errors.password && <p className="form-error">{errors.password.message}</p>}
                    </div>
                    <div className="form-group">
                        <p>Confirm Password: <input type="password" className="form-control" {...register('password_confirmation')} /></p>
                        {errors.password_confirmation && <p className="form-error">{errors.password_confirmation.message}</p>}
                    </div>
                    <div className="form-group">
                        <p className="mb-0">Roles:</p>
                        <Controller
                            control={control}
                            defaultValue={OPTIONS.map(c => c.value)}
                            name="roles"
                            render={({ field: { onChange, value }}) => (
                                <div className="mb-2">
                                    <Select
                                        value={OPTIONS.filter(c => value.includes(c.value))}
                                        onChange={val => onChange(val.map(c => c.value))}
                                        options={OPTIONS}
                                        isMulti
                                    />
                                </div>
                            )}
                        />
                        {errors.roles && <p className="form-error">{errors.roles.message}</p>}
                    </div>
                    <div className="form-group text-right">
                        <button type="submit" className="btn btn-primary btn-md">REGISTER</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UserForm;