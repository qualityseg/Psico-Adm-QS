import React, { useState, useEffect} from 'react';
import { Container, Form, Button, Card, Alert, Col } from 'react-bootstrap';
import axios from 'axios';
import { useHistory } from 'react-router-dom'; // Importe o useHistory
import styles from './Login.css'; // Importando o arquivo CSS
import NotificationAlert from "react-notification-alert"; // Import the notification component

const Login = () => {
  // Applying background image to the body
  useEffect(() => {
  document.body.style.backgroundImage = "url('https://imgur.com/CrlSHBe.png')";
    document.body.style.backgroundSize = 'cover';
    document.body.style.height = '100vh';

    // Cleanup function to remove the background image when the component is unmounted
    return () => {
      document.body.style.backgroundImage = null;
      document.body.style.backgroundSize = null;
      document.body.style.height = null;
    };
  }, []);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const history = useHistory(); // Utilize o hook useHistory
  const notificationAlertRef = React.useRef(null); // Reference for notification

   // Function to show notification
  const notify = (message, type) => {
    const options = {
      place: "tr",
      message: message,
      type: type,
      icon: "nc-icon nc-bell-55",
      autoDismiss: 7,
    };
    notificationAlertRef.current.notificationAlert(options);
  };
  const handleLogin = (e) => {
    e.preventDefault();
  
    axios
      .post("https://fair-ruby-caterpillar-wig.cyclic.app/api/user/login", {
        Email: email,
        senha: senha,
      })
      .then((response) => {
        if (response.data.success) {
          
          notify("Credenciais Corretas!", "success"); // Notify success
          
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
          
          notify("Credenciais Incorretas!", "danger"); // Notify failure
    
        }
      })
      .catch(error => {
        if (error.response && (error.response.status === 404 || error.response.status === 401)) {
          notify("Credenciais Incorretas!", "danger"); // Notify failure for 404 or 401 errors
        } else {
          console.error('An unexpected error occurred:', error);
        }
      });
  };
  
  
  return (
    <div><NotificationAlert ref={notificationAlertRef} />
    <Container className="login-container" style={{ height: '100vh', marginTop: '100px'}}>
      <Col md={{ span: 6, offset: 3 }}>
        <Card>
        <Card.Body>
          <img src="https://imgur.com/qwGDNx6.png" style={{ width: '100%', height: 'auto', marginBottom: '5px' }} alt="logo" />
          <hr style={{ borderTop: '1px solid #ccc', marginBottom: '20px' }} />
          <Card.Header as="h5" className="text-center">Painel Paciente</Card.Header>
          <div style={{ height: '20px' }}></div>
            <Form>
              <Form.Group>
                <Form.Label className="label-text">Usuário</Form.Label>
                <Form.Control type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
              </Form.Group>
              <Form.Group>
                <Form.Label className="label-text">Senha</Form.Label>
                <Form.Control type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
              </Form.Group>
              {error && <Alert variant="danger">{error}</Alert>}
              <Button className="login-button w-100" type="submit" style={{ backgroundColor: '#85BB32' }} variant="primary" onClick={handleLogin} block>Logar</Button>
            </Form>
            <div className="clickable-text">
              <a href="/PrimeiroAcesso" >Primeiro acesso</a>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Container>
    </div>
  );
};


export default Login;
