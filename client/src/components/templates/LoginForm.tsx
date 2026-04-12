import React, { useState, Dispatch, SetStateAction } from 'react';
import { useNavigate } from "react-router-dom";
import { FormField } from '../molecules/FormField';
import { Button } from '../atoms/Button';
import { login } from '../../api/api';

// 1. Definisikan Interface Props
interface LoginFormProps {
  setToken: Dispatch<SetStateAction<string | null>>;
}

export const LoginForm: React.FC<LoginFormProps> = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const data = await login(email, password);
      localStorage.setItem('token', data.token);
      setToken(data.token); 
      console.log('User yang masuk:', data.username); 

      navigate('/');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'An error occurred')
    }
  };

  const Icon = {
    email: <i className="fa-regular fa-envelope text-[var(--Radeon--)]"></i>,
    password: <i className="fa-solid fa-eye text-[var(--Radeon--)]"></i>
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      <FormField
        name='email'
        type="email" 
        placeholder="Email" 
        icon={Icon.email} 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
      />
      <FormField
        name='password'
        type="password" 
        placeholder="Password" 
        icon={Icon.password} 
        value={password} 
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="pt-4">
        <Button type="submit" className="w-full">Login</Button>
      </div>
      {message && <div className="text-red-500">{message}</div>}
    </form>
  );
};