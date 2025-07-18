import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import Header from '../components/Header';

function Home() {
  const navigate = useNavigate();
  const storedUser = sessionStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) return null; 

  return (
    <div className='bg-black min-h-[100vh]'>
     <Header />
     <div className='px-4 pb-[100px]'>
      <Dashboard user={user} />
    </div>
    </div>
   
  );
}

export default Home;
