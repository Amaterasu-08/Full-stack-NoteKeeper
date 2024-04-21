import React from 'react'
import { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';
import "../styles/Form.css" 
import LoadingIndicator from './LoadingIndicator';

const Form = ({route, method}) => {

    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit =async (e)=>{
        setLoading(true)
        e.preventDefault();
        // prevent from submitting the form remove the default behaviour so we wont reload the page

        try{
            const res = await api.post(route, {username, password})
            if(method === "login"){
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/");
            }
            else{
                navigate("/login")
            }
        }catch(error){
            alert(error)
            console.log(error);
        }finally{
            setLoading(false)
        }
}
  return (
    <form onSubmit={handleSubmit}>
      <h1 className='form-container'> {method === 'login' ? "Login":"Register"} </h1>
      <input 
      className='form-input'
      type='text'
      value={username}
      onChange={(e)=> setUserName(e.target.value)}
      placeholder='Username'
      />
      
      <input 
      className='form-input'
      type='text'
      value={password}
      onChange={(e)=>{setPassword(e.target.value)}}
      placeholder='Password'
      />

      {loading && <LoadingIndicator />}

      <button className='form-button' type='submit'>
      {method === 'login' ? "Login":"Register"} 
      </button>
    </form>
  )
}

export default Form;
