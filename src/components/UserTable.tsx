import React from 'react'
import { User, UserList, Role } from '../interface';
import { deleteUser, getUsers } from '../services/user';


const UserTable = ( { users, isAdmin, setUsers }: UserList) => {
    const handleDelete = async (user: User) => {
        const { data } = await deleteUser(user);
        
        if(data.success) {
            const userList = await getUsers();
            setUsers(userList)
        }
    }

    return (
        <div className="user-table container">
            <table className="table">
            <thead>
                <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Roles</th>
                {isAdmin && <th scope="col"></th>}
                </tr>
            </thead>
            <tbody>
                {users?.length && users?.map((user: User) =>
                (
                    <tr key={user.id}>
                        <th scope="row">{user.id}</th>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.roles.map(({name}: Role)  => <dd>{name}</dd>)}</td>
                        {isAdmin && 
                            (<td>
                                <button type="button" className="btn btn-outline-danger btn-sm" onClick={e => handleDelete(user)}>DELETE</button>
                            </td>)
                        }
                    </tr>
                ))}
            </tbody>
            </table>
        </div>
    )
}

export default UserTable;