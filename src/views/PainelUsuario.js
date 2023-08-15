import React, { useState, useEffect } from 'react';
import { Col, Card as BootstrapCard, Row, Container, Table } from 'react-bootstrap';
import axios from 'axios';
import './styles.dashboard.scss';

const PainelUsuario = () => {
  const [programas, setProgramas] = useState([]);
  const instituicaoNome = localStorage.getItem('instituicaoNome');

  useEffect(() => {
    axios.get(`https://fair-ruby-caterpillar-wig.cyclic.app/programas?instituicaoNome=${instituicaoNome}`)
      .then((response) => {
        setProgramas(response.data);
      });
  }, [instituicaoNome]);

  return (
    <Container>
      <Row>
      {
        programas.map((programa) => {
          const username = localStorage.getItem('username');
          const cpfRaw = localStorage.getItem('cpf');
          const cpf = cpfRaw.replace(/\D/g, ''); // Removendo pontos e traços
          const birthDateRaw = localStorage.getItem('birthDate');
          const birthDate = new Date(birthDateRaw).toLocaleDateString('pt-BR').replace(/\//g, '%2F');
          const linkForm = `${programa.link_form}?nome=${username}&instituicao=${instituicaoNome}&data=${birthDate}&cpf=${cpf}`;

          return (
            <BootstrapCard key={programa.id}>
              <BootstrapCard.Title>{programa.nome_programa}</BootstrapCard.Title>
              <BootstrapCard.Body>
                <a href={linkForm} target="_blank" rel="noreferrer">Link do Formulário</a>
              </BootstrapCard.Body>
            </BootstrapCard>
          );
        })
      }
      </Row>
    </Container>
  );
};

export default PainelUsuario;
