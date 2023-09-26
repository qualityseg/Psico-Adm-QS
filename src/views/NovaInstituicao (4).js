import React, { useState , useEffect } from 'react';
import { Form, Button, Card, Container, Col, Row } from 'react-bootstrap';
import axios from 'axios';
import './NovaInstituicao.scss';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { cpf, cnpj } from 'cpf-cnpj-validator'; 


const NRs = () => {
  const [importPath, setImportPath] = React.useState('');
  const [sectors, setSectors] = useState([{ name: '' }]); // Corrigido
  const [positions, setPositions] = useState([{ name: '' }]); // Corrigido
  const [users, setUsers] = useState([{ name: '', identifier: '', status: 'Registrando' }]); // Corrigido
  const [contacts, setContacts] = useState([{ name: '', phone: '', category: '' }]); // Corrigido
  const [units, setUnits] = useState([{ name: '' }]); // Corrigido

 

  function addUser() {
    setFormData(prevState => ({
      ...prevState,
      users: [...prevState.users, { name: '', identifier: '', status: 'Registrando' }],
    }));
  }
  
  function removeUser(index) {
    setUsers(users.filter((user, i) => i !== index));
  }
  
  function handleUserChange(e, index, field) {
    const newUsers = [...users];
    newUsers[index][field] = e.target.value;
    setUsers(newUsers);
  }
  

  const handleSectorChange = (e, index) => {
    const newSectors = [...sectors];
    newSectors[index] = e.target.value;
    setSectors(newSectors);
  }
  
  const handlePositionChange = (e, index) => {
    const newPositions = [...positions];
    newPositions[index] = e.target.value;
    setPositions(newPositions);
  }
  
  const addSector = () => {
    setSectors([...sectors, '']);
  }
  
  const addPosition = () => {
    setPositions([...positions, '']);
  }
  
  const removeSector = (index) => {
    const newSectors = [...sectors];
    newSectors.splice(index, 1);
    setSectors(newSectors);
  }
  
  const removePosition = (index) => {
    const newPositions = [...positions];
    newPositions.splice(index, 1);
    setPositions(newPositions);
  }
  
  const handleImportChangeSectors = (e) => {
    setImportPathSectors(e.target.value);
  }
  
  const handleImportChangePositions = (e) => {
    setImportPathPositions(e.target.value);
  }
  

  const handleImportChange = (e) => {
    setImportPath(e.target.value);
  }
  const [formData, setFormData] = useState({
    instituicao: '',
    cnpj: '',
    inscricao_estadual: '',
    razao_social: '',
    logradouro: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: '',
    cep: '',
    contatos: [],
    units: [],
    sectors: [],
    positions: [], // Adicionado
    users: [],
  });
  

  // Adicione uma nova unidade
  const addUnit = () => {
    setFormData(prevState => ({
      ...prevState,
      units: [...prevState.units, ''],
    }));
  };

  // Remova uma unidade existente
  const removeUnit = (indexToRemove) => {
    setFormData(prevState => ({
      ...prevState,
      units: prevState.units.filter((_, index) => index !== indexToRemove),
    }));
  };

  // Atualize uma unidade existente
  const handleUnitChange = (e, index) => {
    const { value } = e.target;

    setFormData(prevState => {
      const newUnits = [...prevState.units];
      newUnits[index] = value;
      return { ...prevState, units: newUnits };
    });
  };

  const [categories, setCategories] = useState(["--SELECIONE--", "Administrativo", "Técnico", "Cobrança", "Especifique.."]);


  const addContact = () => {
    setFormData(prevState => ({
      ...prevState,
      contacts: [...prevState.contacts, { category: '', phone: '' }],
    }));
  };

  
  const handleContactChange = (e, index) => {
    const { name, value } = e.target;
    const newContacts = [...contacts];
  
    // Se não existe um objeto de contato neste índice, crie um
    if (!newContacts[index]) {
      newContacts[index] = {};
    }

    newContacts[index][name] = value;
    setContacts(newContacts);

    // Verificar se "--SELECIONE--" foi selecionado
    if (value === '--SELECIONE--') {
      alert('Por favor, selecione uma categoria.');
      return; // Não faça nada se "--SELECIONE--" for selecionado
    }
  
    // Adicionar nova categoria se a opção 'Especifique..' foi selecionada
    if (name === 'category' && value === 'Especifique..') {
      const newCategory = prompt('Por favor, especifique a nova categoria:');
      if (newCategory) {
        setCategories([...categories, newCategory]);
        setFormData(prevState => {
          const newContacts = [...prevState.contacts];
          newContacts[index][name] = newCategory;
          return { ...prevState, contacts: newContacts };
        });
      }
    } else {
      setFormData(prevState => {
        const newContacts = [...prevState.contacts];
        newContacts[index][name] = value;
        return { ...prevState, contacts: newContacts };
      });
    }
  };
  
  
  

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    // Aqui removemos a validação de CPF e CNPJ porque isso será feito na função handleSubmit
  
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
  

  

  const removeContact = (indexToRemove) => {
    setFormData(prevState => ({
      ...prevState,
      contacts: prevState.contacts.filter((_, index) => index !== indexToRemove),
    }));
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

  
  
    
  function isValidEmail(email) {
    const regex = /^[\\w-]+(\\.[\\w-]+)*@([\\w-]+\\.)+[a-zA-Z]{2,7}$/;
    return regex.test(email);
  }
    

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Extract the values from formData
    let {
      instituicao,
      cnpj: cnpjValue,
      inscricao_estadual,
      razao_social,
      logradouro,
      numero,
      complemento,
      bairro,
      cidade,
      estado,
      cep,
      contatos,
      unidades,
      setores,
      usuarios
    } = formData;
  
    // Se "contatos" estiver indefinido, defina-o como um array vazio
    contatos = contatos || [];
  
    // Se "unidades" estiver indefinido, defina-o como um array vazio
    unidades = unidades || [];
  
    // Se "setores" estiver indefinido, defina-o como um array vazio
    setores = setores || [];
  
    // Se "usuarios" estiver indefinido, defina-o como um array vazio
    usuarios = usuarios || [];
    const data = {
      instituicao: {
        id: '', // Se necessário
        instituicao: instituicao,
        cnpj: cnpjValue,
        inscricao_estadual: inscricao_estadual,
        razao_social: razao_social,
        logradouro: logradouro,
        numero: numero,
        complemento: complemento,
        bairro: bairro,
        cidade: cidade,
        estado: estado,
        cep: cep,
      },
      contatos: contatos.map((contact) => ({
        id: '', // Se necessário
        instituicao_id: '', // Se necessário
        categoria: contact.category,
        nome_completo: contact.name,
        telefone: contact.phone,
      })),
      unidades: unidades.map((unit) => ({
        id: '', // Se necessário
        instituicao_id: '', // Se necessário
        nome: unit,
      })),
      setores: setores.map((setor) => ({
        id: '', // Se necessário
        unidade_id: '', // Se necessário
        nome: setor,
      })),
      cargos: cargos.map((cargo) => ({
        id: '', // Se necessário
        setor_id: '', // Se necessário
        nome: cargo,
      })),
      usuarios: usuarios.map((user) => ({
        id: '', // Se necessário
        cargo_id: '', // Se necessário
        nome: user.name,
        identificador: user.identifier,
        telefone: user.phone, // Assumindo que o telefone é armazenado na propriedade 'phone'
      })),
    };
  
    try {
      const response = await axios.post('https://sparkling-capris-bass.cyclic.app/nova-instituicao', data);
  
      if (response.data.success) {
        alert('Instituição criada com sucesso!');
      } else {
        alert('Erro ao criar instituição!');
      }
    } catch (error) {
      console.error(error);
      alert('Erro ao criar instituição!');
    }
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
            <Col md={10}><Form.Control type="text" name="cnpj" onChange={handleChange} required/></Col>
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
                    value={contact.name || ''}
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

          
        <Card>
          <Card.Header>
              UNIDADES
              <span style={{ cursor: 'pointer', float: 'right' }} onClick={addUnit}>ADICIONAR</span>
          </Card.Header>
          <Card.Body>
              {formData.units.map((unit, index) => (
                  <div key={index}>
                      <Form.Group as={Row}>
                          <Form.Label column md={2}>Unidade:</Form.Label>
                          <Col md={10}>
                              <OverlayTrigger
                                  placement="top"
                                  delay={{ show: 250, hide: 400 }}
                                  overlay={
                                      <Tooltip id={`tooltip-top`}>
                                          Adicione um item por linha. Registros duplicados ou linhas em branco serão ignorados automaticamente.
                                      </Tooltip>
                                  }
                              >
                                  <Form.Control 
                                      type="text"
                                      name="unit"
                                      value={unit}
                                      onChange={(e) => handleUnitChange(e, index)}
                                  />
                              </OverlayTrigger>
                          </Col>
                      </Form.Group>
                      <Form.Group as={Row}>
                          <Col md={{ offset: 2, span: 10 }}>
                              <Button onClick={() => removeUnit(index)} style={{ margin: '3px' }}>REMOVER</Button>
                          </Col>
                      </Form.Group>
                      <hr />
                  </div>
              ))}
              
          </Card.Body>
      </Card>



        
      <Card>
        <Card.Header>
          SETORES
          <span style={{ cursor: 'pointer', float: 'right' }} onClick={addSector}>ADICIONAR</span>
        </Card.Header>
        <Card.Body>
          {sectors.map((sector, index) => (
            <div key={index}>
              <Form.Group as={Row}>
                <Form.Label column md={2}>Setor:</Form.Label>
                <Col md={10}>
                  <Form.Control 
                    type="text"
                    value={sector}
                    onChange={(e) => handleSectorChange(e, index)}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Col md={{ offset: 2, span: 10 }}>
                  <Button onClick={() => removeSector(index)} style={{ margin: '3px' }}>REMOVER</Button>
                </Col>
              </Form.Group>
              <hr />
            </div>
          ))}
         
        </Card.Body>
      </Card>


      <Card>
        <Card.Header>
          CARGOS
          <span style={{ cursor: 'pointer', float: 'right' }} onClick={addPosition}>ADICIONAR</span>
        </Card.Header>
        <Card.Body>
          {positions.map((position, index) => (
            <div key={index}>
              <Form.Group as={Row}>
                <Form.Label column md={2}>Cargo:</Form.Label>
                <Col md={10}>
                  <Form.Control 
                    type="text"
                    value={position}
                    onChange={(e) => handlePositionChange(e, index)}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Col md={{ offset: 2, span: 10 }}>
                  <Button onClick={() => removePosition(index)} style={{ margin: '3px' }}>REMOVER</Button>
                </Col>
              </Form.Group>
              <hr />
            </div>
          ))}
        
        </Card.Body>
      </Card>


      <Card>
        <Card.Header>
          USUÁRIOS
          <span style={{ cursor: 'pointer', float: 'right', marginLeft: '25px' }} onClick={addUser}>ADICIONAR</span>
          

        </Card.Header>
        <Card.Body>
          {users.map((user, index) => (
            <div key={index}>
              <Form.Group as={Row}>
                <Form.Label column md={2}>Nome:</Form.Label>
                <Col md={10}>
                  <Form.Control 
                    type="text"
                    name="name"
                    value={user.name}
                    onChange={(e) => handleUserChange(e, index, 'name')}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column md={2}>Identificador:</Form.Label>
                <Col md={10}>
                  <Form.Control 
                    type="text"
                    name="identifier"
                    value={user.identifier}
                    placeholder="CPF ou E-Mail"
                    onChange={(e) => handleUserChange(e, index, 'identifier')}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Col md={{ offset: 2, span: 10 }}>
                  <Button onClick={() => removeUser(index)} style={{ margin: '3px' }}>REMOVER</Button>
                </Col>
              </Form.Group>
              <hr />
            </div>
          ))}
        </Card.Body>
      </Card>




        <Button type="submit" variant="primary" className="mt-3">Salvar</Button>
      </Form>
    </Container>
  );
}

export default NRs;