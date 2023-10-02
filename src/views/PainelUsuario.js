import React, { useState, useEffect } from 'react';
import { Col, Card as BootstrapCard, Row, Container } from 'react-bootstrap';
import axios from 'axios';

const PainelUsuario = () => {
  const [programas, setProgramas] = useState([]);
  const instituicaoNome = localStorage.getItem('instituicaoNome');
  const username = localStorage.getItem('username');
  const [avaliacaoRealizada, setAvaliacaoRealizada] = useState({});

  const formatCPF = (cpf) => {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  // Função para atualizar o estado de avaliação baseada no CPF
  const atualizarAvaliacao = (cpf) => {
    setAvaliacaoRealizada({ ...avaliacaoRealizada, [cpf]: true });
  };

  useEffect(() => {
    axios.get(`https://smoggy-pike-jumper.cyclic.app/programas?instituicaoNome=${instituicaoNome}`)
      .then((response) => {
        setProgramas(response.data);
      });
  }, [instituicaoNome]);

  useEffect(() => {
    const cpf = localStorage.getItem('cpf');
    const instituicaoNome = localStorage.getItem('instituicaoNome');
    
    axios.get(`https://smoggy-pike-jumper.cyclic.app/checkAvaliacao?cpf=${cpf}&instituicaoNome=${instituicaoNome}`)
      .then(response => {
        if (response.data.avaliacaoRealizada) {
          atualizarAvaliacao(cpf);
        }
      })
      .catch(error => {
        console.error('Erro ao verificar a avaliação:', error, error.response);
      });
  }, []);
  
  return (
    <Container>
      <Row className="text-center mb-4">
        <h1>Seja Bem Vindo(a) {username}</h1>
      </Row>
      <hr />
      <Row>
        {programas.map((programa) => {
          const cpfRaw = localStorage.getItem('cpf');
          const cpfFormatted = formatCPF(cpfRaw.replace(/\D/g, ''));
          const birthDateRaw = localStorage.getItem('birthDate');
          const dateObj = new Date(birthDateRaw);
          dateObj.setUTCMinutes(dateObj.getUTCMinutes() + dateObj.getTimezoneOffset());
          const birthDate = dateObj.toLocaleDateString('pt-BR').replace(/\//g, '%2F');
          const linkForm = `${programa.link_form}?nome=${username}&instituicao=${instituicaoNome}&data=${birthDate}&cpf=${cpfFormatted}`;

          return (
            <Col key={programa.id} sm={6} md={4} lg={3} className="programa-coluna mb-3">
              <BootstrapCard
                className={`programa-card text-center ${avaliacaoRealizada[cpfRaw] ? 'disabled' : ''}`}
                as={avaliacaoRealizada[cpfRaw] ? 'div' : 'a'}
                href={avaliacaoRealizada[cpfRaw] ? '#' : linkForm}
                target="_blank"
                rel="noreferrer"
              >
                <BootstrapCard.Title className="mt-2">{programa.nome_programa}</BootstrapCard.Title>
                <BootstrapCard.Body>
                  {avaliacaoRealizada[cpfRaw] ? 'Avaliação REALIZADA' : 'Avaliação Disponível'}
                </BootstrapCard.Body>
              </BootstrapCard>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default PainelUsuario;
