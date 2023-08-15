import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useHistory } from 'react-router-dom'; // Importe o useHistory

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const history = useHistory(); // Utilize o hook useHistory

  const handleLogin = (e) => {
    e.preventDefault();
  
    axios
      .post("https://fair-ruby-caterpillar-wig.cyclic.app/api/user/login", {
        email: email,
        senha: senha,
      })
      .then((response) => {
        if (response.data.success) {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('username', response.data.username);
          localStorage.setItem('instituicaoNome', response.data.institution);
          localStorage.setItem('role', response.data.role);
          localStorage.setItem('birthDate', response.data.birthDate);
          localStorage.setItem('cpf', response.data.cpf);
  
          // Defina um tempo de expiração para os tokens
          setTimeout(() => {
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            localStorage.removeItem('instituicaoNome');
            localStorage.removeItem('role');
            localStorage.removeItem('birthDate');
            localStorage.removeItem('cpf');
          }, 3600000); // 1 hora
  
          history.push("/usuario/painel-usuarios");
        } else {
          setError('Falha na autenticação');
        }
      });
  };
  
  
  return (
    <Form>
      <Form.Group>
        <Form.Label>Usuário</Form.Label>
        <Form.Control type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Senha</Form.Label>
        <Form.Control type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
      </Form.Group>
      {error && <div className="alert alert-danger">{error}</div>}
      <Button onClick={handleLogin}>Logar</Button>
      <a href="/PrimeiroAcesso">Primeiro acesso</a>
    </Form>
  );
};

export default Login;
