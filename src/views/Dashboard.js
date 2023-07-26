import React, { useState, useEffect } from 'react';
import { Col, Card as BootstrapCard, Row, Container, Table } from 'react-bootstrap';
import axios from 'axios';
import './styles.dashboard.scss';

const Dashboard = () => {
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    const getUserCount = async () => {
      try {
        const response = await axios.get('https://fair-ruby-caterpillar-wig.cyclic.app/usercount');
        setUserCount(response.data.count);
      } catch (error) {
        console.error(error);
      }
    };

    getUserCount();
  }, []);

  return (
    <Container fluid>
      <Row className="mb-4 d-flex justify-content-center"> {/* Aqui foi adicionado as classes 'd-flex' e 'justify-content-center' */}
        <Col xs={12} md={4} className="mb-4">
          <BootstrapCard className="text-center card-btn h-100">
            <BootstrapCard.Body>
              <BootstrapCard.Title>Usuários Cadastrados</BootstrapCard.Title>
              <BootstrapCard.Text>Total de cadastros</BootstrapCard.Text>
              <BootstrapCard.Text className="display-4">{userCount}</BootstrapCard.Text> {/* Aqui está a contagem do usuário */}
            </BootstrapCard.Body>
          </BootstrapCard>
        </Col>
        <Col xs={12} md={4} className="mb-4">
          <BootstrapCard className="text-center card-btn h-100">
            <BootstrapCard.Body>
              <BootstrapCard.Title>Avaliações Realizadas</BootstrapCard.Title>
              <BootstrapCard.Text>Até o momento</BootstrapCard.Text>
            </BootstrapCard.Body>
          </BootstrapCard>
        </Col>
        <Col xs={12} md={4} className="mb-4">
          <BootstrapCard className="text-center card-btn h-100">
            <BootstrapCard.Body>
              <BootstrapCard.Title>Avaliações Realizadas Hoje</BootstrapCard.Title>
              <BootstrapCard.Text>Total</BootstrapCard.Text>
            </BootstrapCard.Body>
          </BootstrapCard>
        </Col>
        <Col xs={12} md={6} className="mb-4">
          <BootstrapCard className="card-btn card-stats h-100">
            <BootstrapCard.Body>
              <BootstrapCard.Title>Dispositivo Utilizado</BootstrapCard.Title>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Dispositivos</th>
                    <th>Quantidade</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Mobile</td>
                    <td>Placeholder</td>
                  </tr>
                  <tr>
                    <td>Desktop</td>
                    <td>Placeholder</td>
                  </tr>
                </tbody>
              </Table>
            </BootstrapCard.Body>
          </BootstrapCard>
        </Col>
        <Col xs={12} md={6} className="mb-4">
          <BootstrapCard className="card-btn card-stats h-100">
            <BootstrapCard.Body>
              <BootstrapCard.Title>Browsers Utilizados</BootstrapCard.Title>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Browsers</th>
                    <th>Quantidade</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Chrome</td>
                    <td>Placeholder</td>
                  </tr>
                  <tr>
                    <td>Firefox</td>
                    <td>Placeholder</td>
                  </tr>
                  <tr>
                    <td>Safari</td>
                    <td>Placeholder</td>
                  </tr>
                  <tr>
                    <td>Edge</td>
                    <td>Placeholder</td>
                  </tr>
                </tbody>
              </Table>
            </BootstrapCard.Body>
          </BootstrapCard>
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
