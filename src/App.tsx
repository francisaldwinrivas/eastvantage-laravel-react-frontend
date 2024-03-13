import React, { useEffect, useState } from 'react';
import './App.css';
import Login from './components/Login';
import Dashboard from './components/Dashboard';


function App() {
  const savedAccessToken = localStorage.getItem('accessToken') ?? null;
  const [accessToken, setAccessToken] = useState<string|null>(savedAccessToken)
  

  // Save accessToken
  useEffect(() => localStorage.setItem('accessToken', accessToken!), [accessToken])
  
  return (
    <>
      {accessToken === null ? <Login setAccessToken={setAccessToken} /> : <Dashboard setAccessToken={setAccessToken}/>}
    </>
  );
}

export default App;
