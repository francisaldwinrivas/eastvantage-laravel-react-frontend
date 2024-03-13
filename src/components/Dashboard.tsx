import React, { useEffect, useState } from 'react'
import { getUsers } from '../services/user'
import { DashboardProps, EditMode, Role, User } from '../interface'
import UserForm from './UserForm'
import UserTable from './UserTable'
import { ROLES } from '../constants'

const Dashboard = ({ setAccessToken, currentUser }: DashboardProps) => {
    const [addMode, setAddMode] = useState<boolean>(false)
    const [users, setUsers] = useState<User[]|null>(null)
    const isAdmin = currentUser?.roles.some(({ name }: Role) => name === ROLES[3])

    console.log('currentUser', currentUser);
    
    const populateList = async () => {
        const userList = await getUsers();
        setUsers(userList)
    }

    const logout = () => {
        setAccessToken(null);
        localStorage.removeItem('accessToken');
    }

    useEffect(() => {
        populateList()
    }, [])
    
    return (
        <div className="dashboard container">
            <div className="row mb-4">
                <div className="col-6"><h2>DASHBOARD</h2></div>
                <div className="col-6 text-right">
                    <button type="button" className="btn btn-outline-primary btn-md" onClick={logout}>LOGOUT</button>
                </div>
            </div>
            <p className="text-right">
                {!addMode && <button type="button" className="btn btn-primary btn-md" onClick={() => setAddMode(true)}>ADD USER</button>}
                {addMode && <button type="button" className="btn btn-secondary btn-md" onClick={() => setAddMode(false)}>BACK</button>}
            </p>

            {addMode && <UserForm setAddMode={setAddMode} populateList={populateList} />}

            {!addMode && <UserTable users={users} isAdmin={isAdmin} populateList={populateList}/>}
        </div>
    )
}

export default Dashboard;