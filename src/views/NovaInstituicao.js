import React, { useState } from 'react';
import { Form, Button, Card, Container, Col, Row } from 'react-bootstrap';
import axios from 'axios';
import './NovaInstituicao.scss';

const NRs = () => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    birthDate: '',
    gender: '',
    phone: '',
    phone2: '',
    cpf: '',
    cnpj: '',
    registration: '',
    obs: '',
    address: '',
    number: '',
    complement: '',
    district: '',
    city: '',
    state: '',
    country: 'Brasil',
    zipCode: '',
    unit: '',
    sector: '',
    role: '',
    institution: '',
    accessRecovery: false,
    access: 'Visualizador',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
    if (name === 'zipCode') {
      const cep = value.replace(/\D/g, '');
      if (cep.length === 8) {
        axios.get(`https://viacep.com.br/ws/${cep}/json/`)
          .then(response => {
            const { logradouro, bairro, localidade, uf } = response.data;
            setFormData(prevState => ({
              ...prevState,
              address: logradouro,
              district: bairro,
              city: localidade,
              state: uf,
            }));
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  };

  const handleCheckChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const estados = [
    'Acre',
    'Alagoas',
    'Amapá',
    'Amazonas',
    'Bahia',
    'Ceará',
    'Distrito Federal',
    'Espírito Santo',
    'Goiás',
    'Maranhão',
    'Mato Grosso',
    'Mato Grosso do Sul',
    'Minas Gerais',
    'Pará',
    'Paraíba',
    'Paraná',
    'Pernambuco',
    'Piauí',
    'Rio de Janeiro',
    'Rio Grande do Norte',
    'Rio Grande do Sul',
    'Rondônia',
    'Roraima',
    'Santa Catarina',
    'São Paulo',
    'Sergipe',
    'Tocantins',
  ];

  const handleSubmit = (e) => {
    e.preventDefault(); // Impede o comportamento padrão de recarregar a página

    // Envia os dados para o servidor
    axios.post('http://localhost:5000/register', formData)
      .then(response => {
        console.log(response.data); // Exibe a resposta do servidor no console
        // Lógica adicional após o sucesso do salvamento no banco de dados
      })
      .catch(error => {
        console.log(error); // Exibe erros no console, se houver
        // Lógica adicional para tratar erros
      });
  };


  return (
    <Container>
      <h2 style={{ fontSize: "27px", fontWeight: "bold", marginBottom: "20px" }}>Cadastro de Novos Usuários</h2>
      <Form onSubmit={handleSubmit}> 
        <Card>
          <Card.Header>IDENTIFICAÇÃO</Card.Header>
          <Card.Body>
            <Form.Group as={Row}>
              <Form.Label column md={2}>Instituição*:</Form.Label>
              <Col md={10}><Form.Control type="text" name="instituicao" onChange={handleChange} required/></Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column md={2}>CNPJ*:</Form.Label>
              <Col md={10}><Form.Control type="text" name="cpnj" onChange={handleChange} required/></Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column md={2}>Inscrição Estadual*:</Form.Label>
              <Col md={10}><Form.Control type="text" name="inscricaoestadual" onChange={handleChange} required/></Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column md={2}>Razão Social*:</Form.Label>
              <Col md={10}><Form.Control type="text" name="razaosocial" onChange={handleChange} required/></Col>
            </Form.Group>
            
          </Card.Body>
        </Card>

        <Card>
          <Card.Header>ENDEREÇO</Card.Header>
          <Card.Body>
            <Form.Group as={Row}>
              <Form.Label column md={2}>Logradouro*:</Form.Label>
              <Col md={10}><Form.Control type="text" name="address" value={formData.address} onChange={handleChange} required/></Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column md={2}>Número*:</Form.Label>
              <Col md={10}><Form.Control type="text" name="number" value={formData.number} onChange={handleChange} required/></Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column md={2}>Complemento:</Form.Label>
              <Col md={10}><Form.Control type="text" name="complement" value={formData.complement} onChange={handleChange} /></Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column md={2}>Bairro*:</Form.Label>
              <Col md={10}><Form.Control type="text" name="district" value={formData.district} onChange={handleChange} required/></Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column md={2}>Cidade*:</Form.Label>
              <Col md={10}><Form.Control type="text" name="city" value={formData.city} onChange={handleChange} required/></Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column md={2}>Estado*:</Form.Label>
              <Col md={10}>
                <Form.Control as="select" name="state" value={formData.state} onChange={handleChange} required>
                  <option value="">Selecione um estado</option>
                  {estados.map(estado => (
                    <option key={estado} value={estado}>{estado}</option>
                  ))}
                </Form.Control>
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column md={2}>País*:</Form.Label>
              <Col md={10}><Form.Control type="text" name="country" value={formData.country} onChange={handleChange} disabled required/></Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column md={2}>CEP*:</Form.Label>
              <Col md={10}><Form.Control type="text" name="zipCode" value={formData.zipCode} onChange={handleChange} required/></Col>
            </Form.Group>
          </Card.Body>
        </Card>

        <Card>
          <Card.Header>CONTATOS</Card.Header>
          <Card.Body>
            <Form.Group as={Row}>
              </Form.Group>
          </Card.Body>
        </Card>

        
        <Card>
          <Card.Header>SETORES</Card.Header>
          <Card.Body>
            <Form.Group as={Row}>
              
            </Form.Group>
          </Card.Body>
        </Card>

        <Card>
          <Card.Header>CARGOS</Card.Header>
          <Card.Body>
            <Form.Group as={Row}>
              
            </Form.Group>
          </Card.Body>
        </Card>

        <Card>
          <Card.Header>USUÁRIOS</Card.Header>
          <Card.Body>
            <Form.Group as={Row}>
              
            </Form.Group>
          </Card.Body>
        </Card>

        <Card>
          <Card.Header>IMPORTAÇÃO</Card.Header>
          <Card.Body>
            <Form.Group as={Row}>
              <Form.Label column md={2}>Importação Simples*:</Form.Label>
              <Col md={10}><Form.Control type="text" name="instituicao" onChange={handleChange} required/></Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column md={2}>Importação por arquivo*:</Form.Label>
              <Col md={10}><Form.Control type="text" name="cpnj" onChange={handleChange} required/></Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column md={2}>Método de Importação*:</Form.Label>
              <Col md={10}><Form.Control type="text" name="inscricaoestadual" onChange={handleChange} required/></Col>
            </Form.Group>
        
            
          </Card.Body>
        </Card>

        <Card>
          <Card.Header>CONFIGURAÇÕES DE CADASTRO</Card.Header>
          <Card.Body>
            <Form.Group as={Row}>
              <Form.Label column md={2}>CPF Obrigatório*:</Form.Label>
              <Col md={10}><Form.Control type="text" name="instituicao" onChange={handleChange} required/></Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column md={2}>Telefone Obrigatório*:</Form.Label>
              <Col md={10}><Form.Control type="text" name="cpnj" onChange={handleChange} required/></Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column md={2}>Endereço Obrigatório*:</Form.Label>
              <Col md={10}><Form.Control type="text" name="inscricaoestadual" onChange={handleChange} required/></Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column md={2}>Dados Empresariais Obritatórios*:</Form.Label>
              <Col md={10}><Form.Control type="text" name="razaosocial" onChange={handleChange} required/></Col>
            </Form.Group>
            
          </Card.Body>
        </Card>

        <Card>
          <Card.Header>CONFIGURAÇÕES DE API</Card.Header>
          <Card.Body>
          <Form.Group as={Row}>
              <Form.Label column sm={9}>Solicitar recuperação de acesso:</Form.Label>
              <Col sm={3} className="d-flex align-items-center">
                <Form.Check type="checkbox" name="accessRecovery" inline onChange={handleCheckChange} />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column md={2}>Chave de Acesso à API Externa*:</Form.Label>
              <Col md={10}><Form.Control type="text" name="instituicao" onChange={handleChange} required/></Col>
            </Form.Group>
            
            
          </Card.Body>
        </Card>


        <Button type="submit" variant="primary" className="mt-3">Salvar</Button>
      </Form>
    </Container>
  );
}

export default NRs;