import React, { useState, useEffect } from 'react';
import { Col, Card as BootstrapCard, Row, Container, Table } from 'react-bootstrap';
import axios from 'axios';
import './styles.dashboard.scss';

const Dashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const [evaluationsCount, setEvaluationsCount] = useState(0);
  const [evaluationsTodayCount, setEvaluationsTodayCount] = useState(0);

  useEffect(() => {
    const instituicaoNome = localStorage.getItem('instituicaoNome');

    // Chamada de API para obter a contagem das avaliações
    axios.get(`https://smoggy-pike-jumper.cyclic.app/api/evaluations/count?instituicaoNome=${instituicaoNome}`)
      .then(response => {
        setEvaluationsCount(response.data.total);
        setEvaluationsTodayCount(response.data.today);
      })
      .catch(error => {
        console.error("Erro ao recuperar contagens de avaliações:", error);
      });
  }, []);

  useEffect(() => {
    // Recuperar o nome da instituição do localStorage
    const institutionName = localStorage.getItem('instituicaoNome');
    
    // Fazer uma chamada de API para obter a contagem de usuários por instituição
    axios.get(`https://smoggy-pike-jumper.cyclic.app/api/UserCountByInstitution?instituicaoNome=${institutionName}`)
      .then(response => {
        // Atualizar o estado com a contagem de usuários
        setUserCount(response.data.count);
      })
      .catch(error => {
        console.error('Erro ao buscar a contagem de usuários:', error);
      });
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
              <BootstrapCard.Text className="display-4">{evaluationsCount}</BootstrapCard.Text> 
            </BootstrapCard.Body>
          </BootstrapCard>
        </Col>
        <Col xs={12} md={4} className="mb-4">
          <BootstrapCard className="text-center card-btn h-100">
            <BootstrapCard.Body>
              <BootstrapCard.Title>Avaliações Realizadas Hoje</BootstrapCard.Title>
              <BootstrapCard.Text>Total</BootstrapCard.Text>
              <BootstrapCard.Text className="display-4">{evaluationsTodayCount}</BootstrapCard.Text> 
            </BootstrapCard.Body>
          </BootstrapCard>
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
