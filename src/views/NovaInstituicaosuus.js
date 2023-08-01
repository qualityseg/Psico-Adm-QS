import React, { useState } from 'react';
import { Form, Button, Col, Row, Card } from 'react-bootstrap';
import cep from 'cep-promise';

const NovaInstituicao = () => {
  const initialFormState = {
    nome: '',
    cnpj: '',
    cep: '',
    logradouro: '',
    bairro: '',
    cidade: '',
    estado: '',
    numero: '',
    complemento: '',
    contatos: [],
  };
  
  const initialContactState = {
    categoria: '',
    nome: '',
    telefone: '',
  };
  
  const [formData, setFormData] = useState(initialFormState);
  const [contactData, setContactData] = useState(initialContactState);
  const [categories, setCategories] = useState(["--SELECIONAR--", "Administrativo", "Tecnico", "Cobrança", "Especifique.."]);

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleContactChange = (event, index) => {
    const updatedContacts = [...formData.contatos];
    updatedContacts[index][event.target.name] = event.target.value;
    setFormData({ ...formData, contatos: updatedContacts });
  };

  const handleCepChange = async (event) => {
    const cepValue = event.target.value;
    setFormData({ ...formData, cep: cepValue });

    if (cepValue.length === 8) {
      try {
        const result = await cep(cepValue);
        const { street, neighborhood, city, state } = result;
        setFormData({ ...formData, cep: cepValue, logradouro: street, bairro: neighborhood, cidade: city, estado: state });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const addContact = () => {
    setFormData({ ...formData, contatos: [...formData.contatos, { ...contactData }] });
  };

  const removeContact = (index) => {
    const updatedContacts = [...formData.contatos];
    updatedContacts.splice(index, 1);
    setFormData({ ...formData, contatos: updatedContacts });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulário submetido", formData);
  };

  // Função de validação para CNPJ
function validaCNPJ(cnpj) {
  cnpj = cnpj.replace(/[^\d]+/g,'');

  if(cnpj === '') return false;
  
  if (cnpj.length !== 14)
      return false;

  // Elimina CNPJs invalidos conhecidos
  if (cnpj === "00000000000000" || 
      cnpj === "11111111111111" || 
      cnpj === "22222222222222" || 
      cnpj === "33333333333333" || 
      cnpj === "44444444444444" || 
      cnpj === "55555555555555" || 
      cnpj === "66666666666666" || 
      cnpj === "77777777777777" || 
      cnpj === "88888888888888" || 
      cnpj === "99999999999999")
      return false;
       
  // Valida DVs
  let tamanho = cnpj.length - 2;
  let numeros = cnpj.substring(0,tamanho);
  let digitos = cnpj.substring(tamanho);
  let soma = 0;
  let pos = tamanho - 7;
  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2)
          pos = 9;
  }
  let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
  if (resultado !== digitos.charAt(0))
      return false;
       
  tamanho = tamanho + 1;
  numeros = cnpj.substring(0,tamanho);
  soma = 0;
  pos = tamanho - 7;
  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2)
          pos = 9;
  }
  resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
  if (resultado !== digitos.charAt(1))
        return false;
         
  return true;
}

// Função de validação para CPF
function validaCPF(cpf) {  
  cpf = cpf.replace(/[^\d]+/g,'');    
  if(cpf === '') return false; 
  // Elimina CPFs invalidos conhecidos    
  if (cpf.length !== 11 || 
      cpf === "00000000000" || 
      cpf === "11111111111" || 
      cpf === "22222222222" || 
      cpf === "33333333333" || 
      cpf === "44444444444" || 
      cpf === "55555555555" || 
      cpf === "66666666666" || 
      cpf === "77777777777" || 
      cpf === "88888888888" || 
      cpf === "99999999999")
          return false;       
  // Valida 1o digito 
  let add = 0;    
  for (let i=0; i < 9; i ++)       
      add += parseInt(cpf.charAt(i)) * (10 - i);  
      let rev = 11 - (add % 11);  
      if (rev === 10 || rev === 11)     
          rev = 0;    
      if (rev !== parseInt(cpf.charAt(9)))     
          return false;       
  // Valida 2o digito 
  add = 0;    
  for (let i = 0; i < 10; i ++)        
      add += parseInt(cpf.charAt(i)) * (11 - i);  
  rev = 11 - (add % 11);  
  if (rev === 10 || rev === 11) 
      rev = 0;    
  if (rev !== parseInt(cpf.charAt(10)))
      return false;       
  return true;   
}

  return (
    <Container>
      <Row>
        <Col md={12}>
          <Form onSubmit={handleSubmit}> 
            <Card>
              <Card.Header>IDENTIFICAÇÃO</Card.Header>
              <Card.Body>
                <Form.Group as={Row}>
                  <Form.Label column md={2}>Instituição*:</Form.Label>
                  <Col md={10}><Form.Control type="text" name="instituicao" value={formData.instituicao} onChange={(e) => handleChange(e, 'instituicao')} required/></Col>
                </Form.Group>
                <Form.Group as={Row}>
                  <Form.Label column md={2}>CNPJ*:</Form.Label>
                  <Col md={10}><Form.Control type="text" name="cnpj" onChange={e => {if (!validaCNPJ(e.target.value)) alert('CNPJ inválido!'); handleChange(e)}} required/></Col>
                </Form.Group>
                <Form.Group as={Row}>
                  <Form.Label column md={2}>Inscrição Estadual*:</Form.Label>
                  <Col md={10}><Form.Control type="text" name="inscricaoEstadual" value={formData.inscricaoEstadual} onChange={(e) => handleChange(e, 'inscricaoEstadual')} required/></Col>
                </Form.Group>
                <Form.Group as={Row}>
                  <Form.Label column md={2}>Razão Social*:</Form.Label>
                  <Col md={10}><Form.Control type="text" name="razaoSocial" value={formData.razaoSocial} onChange={(e) => handleChange(e, 'razaoSocial')} required/></Col>
                </Form.Group>
              </Card.Body>
            </Card>
            
            <Card>
              <Card.Header>ENDEREÇO</Card.Header>
              <Card.Body>
                <Form.Group as={Row}>
                  <Form.Label column md={2}>CEP*:</Form.Label>
                  <Col md={10}><Form.Control type="text" name="cep" value={formData.cep} onChange={handleCepChange} required/></Col>
                </Form.Group>
                <Form.Group as={Row}>
                  <Form.Label column md={2}>Logradouro*:</Form.Label>
                  <Col md={10}><Form.Control type="text" name="logradouro" value={formData.logradouro} onChange={(e) => handleChange(e, 'logradouro')} required/></Col>
                </Form.Group>
                <Form.Group as={Row}>
                  <Form.Label column md={2}>Número*:</Form.Label>
                  <Col md={10}><Form.Control type="text" name="numero" value={formData.numero} onChange={(e) => handleChange(e, 'numero')} required/></Col>
                </Form.Group>
                <Form.Group as={Row}>
                  <Form.Label column md={2}>Complemento:</Form.Label>
                  <Col md={10}><Form.Control type="text" name="complemento" value={formData.complemento} onChange={(e) => handleChange(e, 'complemento')}/></Col>
                </Form.Group>
                <Form.Group as={Row}>
                  <Form.Label column md={2}>Bairro*:</Form.Label>
                  <Col md={10}><Form.Control type="text" name="bairro" value={formData.bairro} onChange={(e) => handleChange(e, 'bairro')} required/></Col>
                </Form.Group>
                <Form.Group as={Row}>
                  <Form.Label column md={2}>Cidade*:</Form.Label>
                  <Col md={10}><Form.Control type="text" name="cidade" value={formData.cidade} onChange={(e) => handleChange(e, 'cidade')} required/></Col>
                </Form.Group>
                <Form.Group as={Row}>
                  <Form.Label column md={2}>Estado*:</Form.Label>
                  <Col md={10}><Form.Control type="text" name="estado" value={formData.estado} onChange={(e) => handleChange(e, 'estado')} required/></Col>
                </Form.Group>
                <Form.Group as={Row}>
                  <Form.Label column md={2}>País*:</Form.Label>
                  <Col md={10}><Form.Control type="text" name="pais" value={formData.pais} onChange={(e) => handleChange(e, 'pais')} required/></Col>
                </Form.Group>
              </Card.Body>
            </Card>

            <Card>
              <Card.Header>
                CONTATOS
                <span style={{ cursor: 'pointer', float: 'right' }} onClick={addContact}>ADICIONAR</span>
              </Card.Header>
              <Card.Body>
                {formData.contacts.map((contact, index) => (
                  <div key={index}>
                    <Form.Group as={Row}>
                      <Form.Label column md={2}>Categoria:</Form.Label>
                      <Col md={10}>
                        <Form.Control 
                          as="select"
                          name="category"
                          value={contact.category}
                          onChange={(e) => handleContactChange(e, index)}
                        >
                          {categories.map(category => (
                            <option key={category} value={category}>{category}</option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                      <Form.Label column md={2}>Nome Completo:</Form.Label>
                      <Col md={10}>
                        <Form.Control 
                          type="text"
                          name="name"
                          value={contact.name}
                          onChange={(e) => handleContactChange(e, index)}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                      <Form.Label column md={2}>Telefone:</Form.Label>
                      <Col md={10}>
                        <Form.Control 
                          type="text"
                          name="phone"
                          value={contact.phone}
                          onChange={(e) => handleContactChange(e, index)}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                      <Col md={{ offset: 2, span: 10 }}>
                        <Button onClick={() => removeContact(index)} style={{ margin: '3px' }}>REMOVER</Button>
                      </Col>
                    </Form.Group>
                    <hr />
                  </div>
                ))}
              </Card.Body>
            </Card>
            
            <Button type="submit">Enviar</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
  

export default NovaInstituicao;
