import React, { useState } from 'react';
import { Form, Button, Card, Container, Col, Row, Alert  } from 'react-bootstrap';
import axios from 'axios';
import './NovosUsuarios.scss';

const NRs = () => {
  
  const [formData, setFormData] = useState({
    Nome: '',
    Sobrenome: '',
    Email: '',
    Data_de_Nascimento: '',
    Genero: '',
    Telefone: '',
    Telefone2: '',
    CPF: '',
    CNPJ: '',
    Matricula: '',
    Observacoes: '',
    Endereco: '',
    Numero: '',
    Complemento: '',
    Bairro: '',
    Cidade: '',
    Estado: '',
    Pais: 'Brasil',
    CEP: '',
    Unidade: '',
    Setor: '',
    Cargo: '',
    Instituicao: localStorage.getItem('instituicaoNome'),
    Acesso: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
    if (name === 'CEP') {
      const cep = value.replace(/\D/g, '');
      if (cep.length === 8) {
        axios.get(`https://viacep.com.br/ws/${cep}/json/`)
          .then(response => {
            const { logradouro, bairro, localidade, uf } = response.data;
            setFormData(prevState => ({
              ...prevState,
              Endereco: logradouro,
              Bairro: bairro,
              Cidade: localidade,
              Estado: uf,
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

  // Adicione este estado para gerenciar a notificação
  const [notification, setNotification] = useState(null);
  


  const handleSubmit = (e) => {
    e.preventDefault(); // Impede o comportamento padrão de recarregar a página
  
    // Verificação de validação para o campo "Acesso"
    if (!formData.Acesso || formData.Acesso === "Selecione..") {
      setNotification({ type: 'danger', message: 'Selecione o acesso do usuário.' });
      return;
    }


    // Envia os dados para o servidor
    axios.post('https://fair-ruby-caterpillar-wig.cyclic.app/register', formData)
      .then(response => {
        if (response.data.success) {
          // Mostra a notificação de sucesso se o usuário for criado com êxito
          setNotification({
            type: 'success',
            message: 'Sucesso ao cadastrar Novo Usuário',
          });
        } else {
          // Mostra a notificação de erro com a mensagem retornada pelo servidor
          // (por exemplo, "Usuario (Email de acesso) já existente na sua Instituição.")
          setNotification({
            type: 'danger',
            message: response.data.message,
          });
        }
      })
      .catch(error => {
        console.log(error);
        // Mostra a notificação de erro genérica se houver uma falha na solicitação
        setNotification({
          type: 'danger',
          message: 'Falha ao cadastrar Novo Usuário',
        });
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
              <Form.Label column md={2}>Nome*:</Form.Label>
              <Col md={10}><Form.Control type="text" name="Nome" onChange={handleChange} required/></Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column md={2}>Sobrenome*:</Form.Label>
              <Col md={10}><Form.Control type="text" name="Sobrenome" onChange={handleChange} required/></Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column md={2}>E-mail de acesso*:</Form.Label>
              <Col md={10}><Form.Control type="email" name="Email" onChange={handleChange} required/></Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column md={2}>Dt. Nascimento*:</Form.Label>
              <Col md={10}><Form.Control type="date" name="Data_de_Nascimento" onChange={handleChange} required/></Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column md={2}>Sexo:</Form.Label>
              <Col md={10}>
                <Form.Check type="radio" label="Masculino" name="Genero" value="male" onChange={handleChange} />
                <Form.Check type="radio" label="Feminino" name="Genero" value="female" onChange={handleChange} />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column md={2}>Telefone Pessoal*:</Form.Label>
              <Col md={10}><Form.Control type="tel" name="Telefone" onChange={handleChange} required/></Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column md={2}>Telefone Adicional:</Form.Label>
              <Col md={10}><Form.Control type="tel" name="Telefone2" onChange={handleChange} /></Col>
            </Form.Group>
          </Card.Body>
        </Card>

        <Card>
          <Card.Header>DOCUMENTOS</Card.Header>
          <Card.Body>
            <Form.Group as={Row}>
              <Form.Label column md={2}>CPF*:</Form.Label>
              <Col md={10}><Form.Control type="text" name="CPF" onChange={handleChange} required/></Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column md={2}>CNPJ:</Form.Label>
              <Col md={10}><Form.Control type="text" name="CNPJ" onChange={handleChange} /></Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column md={2}>Matrícula:</Form.Label>
              <Col md={10}><Form.Control type="text" name="Matricula" onChange={handleChange} /></Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column md={2}>Observações:</Form.Label>
              <Col md={10}><Form.Control as="textarea" name="Observacoes" onChange={handleChange} /></Col>
            </Form.Group>
          </Card.Body>
        </Card>

        <Card>
          <Card.Header>ENDEREÇO</Card.Header>
          <Card.Body>
            <Form.Group as={Row}>
              <Form.Label column md={2}>Logradouro*:</Form.Label>
              <Col md={10}><Form.Control type="text" name="Endereco" value={formData.Endereco} onChange={handleChange} required/></Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column md={2}>Número*:</Form.Label>
              <Col md={10}><Form.Control type="text" name="Numero" value={formData.Numero} onChange={handleChange} required/></Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column md={2}>Complemento:</Form.Label>
              <Col md={10}><Form.Control type="text" name="Complemento" value={formData.Complemento} onChange={handleChange} /></Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column md={2}>Bairro*:</Form.Label>
              <Col md={10}><Form.Control type="text" name="Bairro" value={formData.Bairro} onChange={handleChange} required/></Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column md={2}>Cidade*:</Form.Label>
              <Col md={10}><Form.Control type="text" name="Cidade" value={formData.Cidade} onChange={handleChange} required/></Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column md={2}>Estado*:</Form.Label>
              <Col md={10}>
                <Form.Control as="select" name="Estado" value={formData.Estado} onChange={handleChange} required>
                  <option value="">Selecione um estado</option>
                  {estados.map(estado => (
                    <option key={estado} value={estado}>{estado}</option>
                  ))}
                </Form.Control>
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column md={2}>País*:</Form.Label>
              <Col md={10}><Form.Control type="text" name="Pais" value={formData.Pais} onChange={handleChange} disabled required/></Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column md={2}>CEP*:</Form.Label>
              <Col md={10}><Form.Control type="text" name="CEP" value={formData.CEP} onChange={handleChange} required/></Col>
            </Form.Group>
          </Card.Body>
        </Card>

        <Card>
          <Card.Header>TRABALHO</Card.Header>
          <Card.Body>
            <Form.Group as={Row}>
              <Form.Label column md={2}>Unidade*:</Form.Label>
              <Col md={10}><Form.Control type="text" name="Unidade" onChange={handleChange} required/></Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column md={2}>Setor*:</Form.Label>
              <Col md={10}><Form.Control type="text" name="Setor" onChange={handleChange} required/></Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column md={2}>Cargo*:</Form.Label>
              <Col md={10}><Form.Control type="text" name="Cargo" onChange={handleChange} required/></Col>
            </Form.Group>
            <Form.Group>
              <Form.Label>INSTITUIÇÃO*:</Form.Label>
              <Form.Control
                type="text"
                name="Instituicao"
                value={formData.Instituicao}
                readOnly
              />
            </Form.Group>
          </Card.Body>
        </Card>

        
        <Card>
          <Card.Header>PERMISSÃO DE ACESSO</Card.Header>
          <Card.Body>
            <Form.Group as={Row}>
              <Form.Label column sm={9}>Acesso do Usuário:</Form.Label>
              <Col sm={10}>
                <Form.Select aria-label="Tipo de Acesso" onChange={e => setFormData({...formData, Acesso: e.target.value})}>
                  <option value="">Selecione...</option>
                  <option value="Paciente">Paciente</option>
                  <option value="Medico">Médico</option>
                </Form.Select>
              </Col>
            </Form.Group>
          </Card.Body>
        </Card>

        {notification && (
          <Alert variant={notification.type}>
            {notification.message}
          </Alert>
        )}
        
        <Button type="submit" variant="primary" className="mt-3" style={{ backgroundColor: "#85BB32", borderColor: "#85BB32" }}>Salvar</Button>
      </Form>
    </Container>
  );
}

export default NRs;