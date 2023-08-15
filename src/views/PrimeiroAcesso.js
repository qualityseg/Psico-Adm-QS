import React, { useState } from 'react';
import { Container, Form, Button, Card, Alert, Col } from 'react-bootstrap'; // Importe os componentes necessários
import axios from 'axios';

const PrimeiroAcesso = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState('');

  const verifyUser = async () => {
    try {
      const response = await axios.post('https://fair-ruby-caterpillar-wig.cyclic.app/api/verifyUser', { name, email });
      if (response.data.success) {
        setVerified(true);
      } else {
        setError('Nome ou identificador incorretos');
      }
    } catch (error) {
      setError('Erro ao verificar usuário');
    }
  };

  const registerPassword = async () => {
    try {
      const response = await axios.post('https://fair-ruby-caterpillar-wig.cyclic.app/api/registerPassword', { name, email, senha });
      if (response.data.success) {
        window.location.href = '/UserLogin';
      } else {
        setError('Erro ao cadastrar senha');
      }
    } catch (error) {
      setError('Erro ao cadastrar senha');
    }
  };

  return (
    <div style={{ backgroundImage: 'url(https://imgur.com/AFbGNnn.png)', backgroundSize: 'cover', minHeight: '100vh' }}>
    <Container className="mt-5" >
      <Col md={{ span: 6, offset: 3 }} style={{ marginTop: '150px' }}>
        <Card>
          <Card.Body>
            <Card.Title>{!verified ? 'Verificação de Usuário' : 'Cadastro de Senha'}</Card.Title>
            <Form>
              {!verified ? (
                <>
                  <Form.Group>
                    <Form.Label>Nome</Form.Label>
                    <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </Form.Group>
                  <Button onClick={verifyUser}>Verificar</Button>
                </>
              ) : (
                <>
                  <Form.Group>
                    <Form.Label>Senha</Form.Label>
                    <Form.Control type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
                  </Form.Group>
                  <Button onClick={registerPassword}>Cadastrar senha</Button>
                </>
              )}
              {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Container>
    </div>
  );
};


export default PrimeiroAcesso;
