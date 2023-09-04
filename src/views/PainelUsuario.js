import React, { useState, useEffect } from 'react';
import { Col, Card as BootstrapCard, Row, Container } from 'react-bootstrap';
import axios from 'axios';

const PainelUsuario = () => {
  const [programas, setProgramas] = useState([]);
  const instituicaoNome = localStorage.getItem('instituicaoNome');
  const username = localStorage.getItem('username');

  const formatCPF = (cpf) => {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  useEffect(() => {
    axios.get(`https://fair-ruby-caterpillar-wig.cyclic.app/programas?instituicaoNome=${instituicaoNome}`)
      .then((response) => {
        setProgramas(response.data);
      });
  }, [instituicaoNome]);

  return (
    <Container>
      <Row className="text-center mb-4"> {/* Centralizando o título */}
        <h1>Seja Bem Vindo(a) {username}</h1>
      </Row>
      <hr /> {/* Linha divisória */}
      <Row>
        {
          programas.map((programa) => {
            const cpfRaw = localStorage.getItem('cpf');
            const cpfFormatted = formatCPF(cpfRaw.replace(/\D/g, ''));
            const birthDateRaw = localStorage.getItem('birthDate');
            const dateObj = new Date(birthDateRaw);
            dateObj.setUTCMinutes(dateObj.getUTCMinutes() + dateObj.getTimezoneOffset());
            const birthDate = dateObj.toLocaleDateString('pt-BR').replace(/\//g, '%2F');
            const linkForm = `${programa.link_form}?nome=${username}&instituicao=${instituicaoNome}&data=${birthDate}&cpf=${cpfFormatted}`;


            return (
              <Col key={programa.id} sm={6} md={4} lg={3} className="programa-coluna mb-3"> {/* Tamanho ajustado e espaçamento entre colunas */}
                <BootstrapCard className="programa-card text-center" as="a" href={linkForm} target="_blank" rel="noreferrer">
                  <BootstrapCard.Title className="mt-2">{programa.nome_programa}</BootstrapCard.Title>
                  <BootstrapCard.Body>
                    Avaliação Disponível
                  </BootstrapCard.Body>
                </BootstrapCard>
              </Col>
            );
          })
        }
      </Row>
    </Container>
  );
};

export default PainelUsuario;
