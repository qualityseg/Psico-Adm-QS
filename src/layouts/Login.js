import React, { useState, useEffect } from "react";
import axios from 'axios';
import styles from './Login.module.css';
import backgroundImage1 from './background-1.png';
import backgroundImage2 from './background-2.png';
import backgroundImage3 from './background-3.png';
import icon from './icone.png'; // Importando o icone

const images = [backgroundImage1, backgroundImage2, backgroundImage3];

const Login = (props) => {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [backgroundIndex, setBackgroundIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setBackgroundIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    axios.post('https://fair-ruby-caterpillar-wig.cyclic.app/login', { usuario, senha })
    .then(response => {
      console.log('Response from server:', response.data); // Log the response from the server
  
      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('username', usuario);
        localStorage.setItem('role', response.data.role);
        
        console.log('Role after login:', localStorage.getItem('role')); // Log the role after login
  
        props.history.push('/admin/dashboard');
      } else {
        alert('Login falhou');
      }
    });
  };
  
  
  

  
  return (
    <div className={styles.container} style={{backgroundImage: `url(${images[backgroundIndex]})`}}>
      <div className={styles.content}>
        <div className={styles.title}>
          <img src={icon} alt="Icon" className={styles.icon} /> {/* Adicionando o ícone */}
          QSLib | QualitySEG Painel 
        </div>
        <form onSubmit={handleLogin} className={styles.form}>
          <input type="text" value={usuario} onChange={(e) => setUsuario(e.target.value)} placeholder="Usuário" className={styles.input}/>
          <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="Senha" className={styles.input}/>
          <button type="submit" className={styles.button}>Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
