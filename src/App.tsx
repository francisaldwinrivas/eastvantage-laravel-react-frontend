import React, { useEffect, useState } from 'react';
import './App.css';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { User } from './interface';


function App() {
  const savedAccessToken = localStorage.getItem('accessToken') ?? null;
  const [accessToken, setAccessToken] = useState<string|null>(savedAccessToken)
  const [currentUser, setCurrentUser] = useState<User|null>(null)
  

  // Save accessToken
  useEffect(() => localStorage.setItem('accessToken', accessToken!), [accessToken])
  
  return (
    <>
      {accessToken === null ? <Login setAccessToken={setAccessToken} setCurrentUser={setCurrentUser} /> : <Dashboard setAccessToken={setAccessToken} currentUser={currentUser} />}
    </>
  );
}

export default App;
