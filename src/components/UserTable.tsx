import React from 'react'
import { User, UserList, Role } from '../interface';


const UserTable = ( { users }: UserList) => {

    console.log('userList', users);

    return (
        <div className="user-table container">
            <table className="table">
            <thead>
                <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Roles</th>
                </tr>
            </thead>
            <tbody>
                {users?.length && users?.map((user: User) =>
                (
                    <tr>
                        <th scope="row">{user.id}</th>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.roles.map(({name}: Role)  => <dd>{name}</dd>)}</td>
                    </tr>
                ))}
            </tbody>
            </table>
        </div>
    )
}

export default UserTable;