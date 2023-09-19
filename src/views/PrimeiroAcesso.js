import React, { useState } from 'react';
import { Container, Form, Button, Card, Alert, Col } from 'react-bootstrap'; // Importe os componentes necessários
import axios from 'axios';

const PrimeiroAcesso = () => {
  
  // Applying background image to the bodykkkk
  document.body.style.backgroundImage = "url('https://imgur.com/CrlSHBe.png')";
  document.body.style.backgroundSize = 'cover';
  document.body.style.height = '100vh';


  const [Email, setEmail] = useState('');
  const [Senha, setSenha] = useState('');
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState('');

  const verifyUser = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('https://ill-lime-gosling-wrap.cyclic.app/api/verifyUser', { Email });
      console.log("Resposta da API: ", response.data);  // Log para diagnóstico
  
      if (response.data.success) {
        console.log("Usuário verificado com sucesso. Atualizando estado 'verified'.");  // Log para diagnóstico
        setVerified(true);
      } else {
        console.log("Falha na verificação do usuário.");  // Log para diagnóstico
        setError('identificador incorreto.');
      }
    } catch (error) {
      console.log("Erro ao fazer a chamada da API: ", error);  // Log para diagnóstico
      setError('Erro ao verificar usuário');
    }
  };
  

  const registerPassword = async () => {
    try {
      const response = await axios.post('https://ill-lime-gosling-wrap.cyclic.app/api/registerPassword', { Email, Senha });
      if (response.data.success) {
        window.location.href = '/UserLogin';
      } else {
        setError('Erro ao cadastrar senha');
      }
    } catch (error) {
      console.log('Erro ao fazer a chamada da API: ', error);
      setError('Erro ao cadastrar senha');
    }
  };
  
  

  return (
  
    <Container className="mt-5" >
      <Col md={{ span: 6, offset: 3 }} style={{ marginTop: '50px' }}>
        <Card>
          <Card.Body>
           <img src="https://imgur.com/qwGDNx6.png" style={{ width: '100%', height: 'auto', marginBottom: '5px' }} alt="logo" />
           <hr style={{ borderTop: '1px solid #ccc', marginBottom: '20px' }} />
           
            <Card.Title as="h5" className="text-center">{!verified ? 'Primeiro Acesso' : 'Cadastro de Senha'}</Card.Title>
            <div style={{ height: '20px' }}></div>
            <Form>
              {!verified ? (
                <>
                
                  <Form.Group>
                    <Form.Label className="label-text">Email</Form.Label>
                    <Form.Control type="text" value={Email} onChange={(e) => setEmail(e.target.value)} />
                  </Form.Group>
                  <Button className="login-button w-100" type="submit" style={{ backgroundColor: '#85BB32' }} onClick={verifyUser}>Verificar</Button>
                </>
              ) : (
                <>
                  <Form.Group>
                    <Form.Label>Senha</Form.Label>
                    <Form.Control type="password" value={Senha} onChange={(e) => setSenha(e.target.value)} />
                  </Form.Group>
                  <Button className="login-button w-100" style={{ backgroundColor: '#85BB32' }} onClick={registerPassword}>Cadastrar senha</Button>
                </>
              )}
              {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Container>
   
  );
};


export default PrimeiroAcesso;
