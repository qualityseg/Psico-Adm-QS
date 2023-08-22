import React, { useState } from 'react';
import { Form, Button, Card, Container, Col, Row, Alert } from 'react-bootstrap';
import './NovaInstituicao.scss';
import axios from 'axios';

const isValidCNPJ = (cnpj) => {
  cnpj = cnpj.replace(/[^\d]+/g, '');

  if (cnpj === '' || cnpj.length !== 14) return false;

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
  let size = cnpj.length - 2;
  let numbers = cnpj.substring(0, size);
  let digits = cnpj.substring(size);
  let sum = 0;
  let pos = size - 7;
  for (let i = size; i >= 1; i--) {
    sum += numbers.charAt(size - i) * pos--;
    if (pos < 2) pos = 9;
  }
  let result = sum % 11 < 2 ? 0 : 11 - sum % 11;
  if (result !== parseInt(digits.charAt(0))) return false;

  size = size + 1;
  numbers = cnpj.substring(0, size);
  sum = 0;
  pos = size - 7;
  for (let i = size; i >= 1; i--) {
    sum += numbers.charAt(size - i) * pos--;
    if (pos < 2) pos = 9;
  }
  result = sum % 11 < 2 ? 0 : 11 - sum % 11;
  if (result !== parseInt(digits.charAt(1))) return false;

  return true;
}


const NovaInstituicao = () => {
  const [formData, setFormData] = useState({
    instituicao: '',
    cnpj: '',
    inscricaoEstadual: '',
    razaoSocial: '',
    logradouro: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: '',
    pais: '',
    cep: ''
  });
  const [contatos, setContatos] = useState([{
    categoria: '',
    nomeCompleto: '',
    telefone: '',
    categoriaEspecifica: ''
  }]);
  const [unidades, setUnidades] = useState(['']);

  const handleAddUnidade = () => {
    setUnidades([...unidades, '']);
  };

  const handleUnidadeChange = (e, index) => {
    const updatedUnidades = [...unidades];
    updatedUnidades[index] = e.target.value;
    setUnidades(updatedUnidades);
  };

  const handleChange = (e, field, index = null) => {
    const { name, value } = e.target;

    if (field === 'contatos' && index !== null) { 
        const updatedContatos = [...contatos];
        updatedContatos[index][name] = value;
        setContatos(updatedContatos);
    } else if (field === 'usuarios' && index !== null) {
        const updatedUsuarios = [...usuarios];
        updatedUsuarios[index][name] = value;
        setUsuarios(updatedUsuarios);
    } else {
        setFormData({
            ...formData,
            [name]: value
        });
    }
};


  
  
  const [endereco, setEndereco] = useState({
    cep: '',
    logradouro: '',
    bairro: '',
    cidade: '',
    estado: '',
    pais: 'Brasil'
  });

  const handleChangeEndereco = (e) => {
    const { name, value } = e.target;
    setEndereco(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const estadosBrasileiros = [
    { sigla: "", nome: "--SELECIONE--" },
    { sigla: "AC", nome: "Acre" },
    { sigla: "AL", nome: "Alagoas" },
    { sigla: "AP", nome: "Amapá" },
    { sigla: "AM", nome: "Amazonas" },
    { sigla: "BA", nome: "Bahia" },
    { sigla: "CE", nome: "Ceará" },
    { sigla: "DF", nome: "Distrito Federal" },
    { sigla: "ES", nome: "Espírito Santo" },
    { sigla: "GO", nome: "Goiás" },
    { sigla: "MA", nome: "Maranhão" },
    { sigla: "MT", nome: "Mato Grosso" },
    { sigla: "MS", nome: "Mato Grosso do Sul" },
    { sigla: "MG", nome: "Minas Gerais" },
    { sigla: "PA", nome: "Pará" },
    { sigla: "PB", nome: "Paraíba" },
    { sigla: "PR", nome: "Paraná" },
    { sigla: "PE", nome: "Pernambuco" },
    { sigla: "PI", nome: "Piauí" },
    { sigla: "RJ", nome: "Rio de Janeiro" },
    { sigla: "RN", nome: "Rio Grande do Norte" },
    { sigla: "RS", nome: "Rio Grande do Sul" },
    { sigla: "RO", nome: "Rondônia" },
    { sigla: "RR", nome: "Roraima" },
    { sigla: "SC", nome: "Santa Catarina" },
    { sigla: "SP", nome: "São Paulo" },
    { sigla: "SE", nome: "Sergipe" },
    { sigla: "TO", nome: "Tocantins" }
];


  const handleCepChange = async (e) => {
    const cep = e.target.value.replace('-', '');

    setEndereco(prevState => ({
      ...prevState,
      cep: cep,
    }));

    // Validação do CEP
    if (cep.length === 8) {
        // Você pode usar uma API como ViaCEP ou similar para buscar o endereço
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const enderecoData = await response.json();

        if (!enderecoData.erro) {
            setEndereco({
                cep: enderecoData.cep,
                logradouro: enderecoData.logradouro,
                bairro: enderecoData.bairro,
                cidade: enderecoData.localidade,
                estado: enderecoData.uf,
                pais: 'Brasil'
            });
        } else {
            // Trate o erro aqui (CEP inválido ou não encontrado)
            console.error('CEP inválido ou não encontrado');
        }
    }
};
  

  const handleAddContato = () => {
    setContatos([...contatos, {
      categoria: '',
      nomeCompleto: '',
      telefone: '',
      categoriaEspecifica: ''
    }]);
  };

  const [setores, setSetores] = useState(['']);
  const [cargos, setCargos] = useState(['']);

  const handleAddSetor = () => {
    setSetores([...setores, '']);
  };
  
  const handleSetorChange = (e, index) => {
    const updatedSetores = [...setores];
    updatedSetores[index] = e.target.value;
    setSetores(updatedSetores);
  };
  
  const handleAddCargo = () => {
    setCargos([...cargos, '']);
  };
  
  const handleCargoChange = (e, index) => {
    const updatedCargos = [...cargos];
    updatedCargos[index] = e.target.value;
    setCargos(updatedCargos);
  };
  
  const [usuarios, setUsuarios] = useState([{ nome: '', identificador: '', senha: '' }]);


  const handleAddUsuario = () => {
    setUsuarios([...usuarios, { nome: '', identificador: '', senha: '', }]);
  };
  
  
  const isValidEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  };
  
  const isValidCPF = (cpf) => {
    // Aqui, você pode adicionar uma expressão regular ou lógica para validar o CPF.
    // Para simplificar, vou usar uma expressão regular básica apenas para formatos de CPF.
    const regex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    return regex.test(cpf);
  };

  const handleRemoveContato = (index) => {
    const updatedContatos = [...contatos];
    updatedContatos.splice(index, 1);
    setContatos(updatedContatos);
  };
  
  const handleRemoveUnidade = (index) => {
    const updatedUnidades = [...unidades];
    updatedUnidades.splice(index, 1);
    setUnidades(updatedUnidades);
  };
  
  const handleRemoveSetor = (index) => {
    const updatedSetores = [...setores];
    updatedSetores.splice(index, 1);
    setSetores(updatedSetores);
  };
  
  const handleRemoveCargo = (index) => {
    const updatedCargos = [...cargos];
    updatedCargos.splice(index, 1);
    setCargos(updatedCargos);
  };
  
  const handleRemoveUsuario = (index) => {
    const updatedUsuarios = [...usuarios];
    updatedUsuarios.splice(index, 1);
    setUsuarios(updatedUsuarios);
  };
  
  const [isCNPJValid, setIsCNPJValid] = useState(true);
  const [cnpjData, setCNPJData] = useState({ cnpj: '' });


  // Função para lidar com a mudança do CNPJ
  const handleCNPJChange = (e) => {
    const value = e.target.value;
    const valid = isValidCNPJ(value);
    setIsCNPJValid(valid);
  
    // Atualize o estado com o valor do CNPJ
    setFormData(prevState => ({
      ...prevState,
      cnpj: value
    }));
  };
  
  const [notification, setNotification] = useState(null);


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Destructure the relevant fields from formData and endereco state
    const {
      instituicao,
      inscricaoEstadual,
      razaoSocial,
      numero,
      complemento,
    } = formData;
    const { cnpj } = formData; // Assuming cnpjData contains the cnpj information
    const {
      logradouro,
      bairro,
      cidade,
      estado,
      cep,
    } = endereco;
    // Construct the data to be sent to the server
    const dataToSend = {
      nome: instituicao,
      cnpj: cnpj,
      inscricaoEstadual: inscricaoEstadual,
      razaoSocial: razaoSocial,
      logradouro: logradouro,
      numero: numero,
      complemento: complemento,
      bairro: bairro,
      cidade: cidade,
      estado: estado,
      pais: 'Brasil',
      cep: cep,
      contatos: contatos,
      unidades: unidades,
      setores: setores,
      cargos: cargos,
      usuarios: usuarios,
    };
  
    // Envio da solicitação POST para o servidor
  try {
    const response = await fetch('https://fair-ruby-caterpillar-wig.cyclic.app/instituicoes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataToSend),
    });

    const responseMessage = await response.text(); // Leitura da mensagem da resposta

    if (response.ok) {
      setNotification({
        type: 'success',
        message: 'Instituição registrada com sucesso!',
      });
    } else {
      // Mostra a mensagem de erro retornada pelo servidor
      setNotification({
        type: 'danger',
        message: responseMessage, // Incluirá a mensagem "Erro ao cadastrar Instituição, já existe uma instituição com esse CNPJ."
      });
    }
  } catch (error) {
    setNotification({
      type: 'danger',
      message: 'Erro ao enviar os dados para o servidor',
    });
    console.error('Erro ao enviar os dados para o servidor:', error);
  }
};
  

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Card>
          <Card.Header>IDENTIFICAÇÃO</Card.Header>
          <Card.Body>
            <Form.Group>
              <Form.Label>Instituição</Form.Label>
              <Form.Control type="text" name="instituicao" onChange={handleChange} />
              <Form.Label>CNPJ</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite o CNPJ"
                onChange={handleCNPJChange}
              />
              {!isCNPJValid && <div className="text-danger">CNPJ inválido!</div>}
              <Form.Label>Inscrição Estadual</Form.Label>
              <Form.Control type="text" name="inscricaoEstadual" onChange={handleChange} />
              <Form.Label>Razão Social</Form.Label>
              <Form.Control type="text" name="razaoSocial" onChange={handleChange} />
            </Form.Group>
          </Card.Body>
        </Card>
        <Card>
          <Card.Header>ENDEREÇO</Card.Header>
          <Card.Body>
            <Form.Group>
              <Form.Label>Logradouro</Form.Label>
              <Form.Control 
                type="text" 
                name="logradouro" 
                value={endereco.logradouro}
                onChange={handleChangeEndereco}
              />
              <Form.Label>Número</Form.Label>
              <Form.Control type="text" name="numero" onChange={handleChange} />
              <Form.Label>Complemento</Form.Label>
              <Form.Control type="text" name="complemento" onChange={handleChange} />
              <Form.Label>Bairro</Form.Label>
              <Form.Control 
                type="text" 
                name="bairro" 
                value={endereco.bairro}
                onChange={handleChangeEndereco}
              />
              <Form.Label>Cidade</Form.Label>
              <Form.Control 
                type="text" 
                name="cidade" 
                value={endereco.cidade}
                onChange={handleChangeEndereco}
              />
              <Form.Label>Estado</Form.Label>
              <Form.Control as="select" name="estado" value={endereco.estado} onChange={handleChange}>
              {estadosBrasileiros.map((estado, index) => (
                  <option key={index} value={estado.sigla}>
                      {estado.nome}
                  </option>
              ))}
              </Form.Control>


              <Form.Label>Pais</Form.Label>
              <Form.Control type="text" readOnly value="Brasil" />
              <Form.Label>CEP</Form.Label>
              <Form.Control
                  type="text"
                  name="cep"
                  value={endereco.cep}
                  onChange={handleCepChange}
                  placeholder="Digite o CEP"
              />
            </Form.Group>
          </Card.Body>
        </Card>
        <Card>
          <Card.Header>CONTATOS</Card.Header>
            <Card.Body>
                {contatos.map((contato, index) => (
                    <div key={index} className="mb-4">
                        <Form.Group>
                            <Form.Label>Categoria</Form.Label>
                            <Form.Control
                                as="select"
                                name="categoria"
                                onChange={(e) => handleChange(e, 'contatos', index)}
                                value={contato.categoria}
                            >
                                <option value="" disabled>--SELECIONE--</option>
                                <option value="Administrativo">Administrativo</option>
                                <option value="Técnico">Técnico</option>
                                <option value="Cobrança">Cobrança</option>
                                <option value="Especifique">Especifique...</option>
                            </Form.Control>
                            {contato.categoria === "Especifique" && (
                                <div className="mt-2">
                                    <Form.Label>Especifique a Categoria</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="categoriaEspecifica"
                                        placeholder="Digite a categoria"
                                        onChange={(e) => handleChange(e, 'contatos', index)}
                                        value={contato.categoriaEspecifica}
                                    />
                                </div>
                            )}
                            <Form.Label className="mt-2">Nome Completo</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="nomeCompleto" 
                                onChange={(e) => handleChange(e, 'contatos', index)} 
                                value={contato.nomeCompleto} 
                            />
                            <Form.Label className="mt-2">Telefone</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="telefone" 
                                onChange={(e) => handleChange(e, 'contatos', index)} 
                                value={contato.telefone}
                            />
                        </Form.Group>
                        {contatos.length > 1 && (
                            <Button 
                                variant="danger" 
                                onClick={() => handleRemoveContato(index)}
                                className="mb-2"
                            >
                                Remover
                            </Button>
                        )}
                    </div>
                ))}
                <Button onClick={handleAddContato} style={{ backgroundColor: "#85BB32", borderColor: "#85BB32" }}>Adicionar Contato</Button>
            </Card.Body>

        </Card>


        <Card>
          <Card.Header>UNIDADES</Card.Header>
          <Card.Body>
            {unidades.map((unidade, index) => (
              <div key={index}>
                <Form.Group>
                  <Form.Label>Unidade</Form.Label>
                  <Form.Control
                    type="text"
                    value={unidade}
                    onChange={(e) => handleUnidadeChange(e, index)}
                  />
                </Form.Group>
                {unidades.length > 1 && (
                  <Button 
                    variant="danger" 
                    onClick={() => handleRemoveUnidade(index)}
                  >
                    Remover
                  </Button>
                )}
              </div>
            ))}
            <Button className="mt-2" onClick={handleAddUnidade} style={{ backgroundColor: "#85BB32", borderColor: "#85BB32" }}>Adicionar Unidade</Button>
          </Card.Body>
        </Card>


      <Card>
        <Card.Header>SETORES</Card.Header>
        <Card.Body>
          {setores.map((setor, index) => (
            <div key={index} className="mb-4">
              <Form.Group>
                <Form.Label>Setor</Form.Label>
                <Form.Control
                  type="text"
                  value={setor}
                  onChange={(e) => handleSetorChange(e, index)}
                />
              </Form.Group>
              {setores.length > 1 && (
                <Button 
                  variant="danger" 
                  onClick={() => handleRemoveSetor(index)}
                >
                  Remover
                </Button>
              )}
            </div>
          ))}
          <Button onClick={handleAddSetor} className="mt-2" style={{ backgroundColor: "#85BB32", borderColor: "#85BB32" }}>Adicionar Setor</Button>
        </Card.Body>
      </Card>


      <Card>
        <Card.Header>CARGOS</Card.Header>
        <Card.Body>
          {cargos.map((cargo, index) => (
            <div key={index} className="mb-4">
              <Form.Group>
                <Form.Label>Cargo</Form.Label>
                <Form.Control
                  type="text"
                  name="cargo"
                  value={cargo}
                  onChange={(e) => handleCargoChange(e, index)}
                />
              </Form.Group>
              {cargos.length > 1 && (
                <Button 
                  variant="danger" 
                  onClick={() => handleRemoveCargo(index)}
                  className="mb-2"
                >
                  Remover
                </Button>
              )}
            </div>
          ))}
          <Button onClick={handleAddCargo} style={{ backgroundColor: "#85BB32", borderColor: "#85BB32" }}>Adicionar Cargo</Button>
        </Card.Body>
      </Card>


      <Card>
        <Card.Header>USUÁRIOS</Card.Header>
          <Card.Body>
              {usuarios.map((usuario, index) => (
                  <div key={index} className="mb-4">
                      <Form.Group>
                          <Form.Label>Nome</Form.Label>
                          <Form.Control
                              type="text"
                              name="nome"
                              value={usuario.nome}
                              onChange={(e) => handleChange(e, 'usuarios', index)}
                          />
                      </Form.Group>
                      <Form.Group>
                          <Form.Label>Identificador (CPF ou E-Mail)</Form.Label>
                          <Form.Control
                              type="text"
                              name="identificador"
                              placeholder="CPF ou E-Mail"
                              value={usuario.identificador}
                              onChange={(e) => handleChange(e, 'usuarios', index)}
                          />
                      <Form.Group>
                        <Form.Label>Senha</Form.Label>
                        <Form.Control
                          type="password"
                          name="senha"
                          value={usuario.senha}
                          onChange={(e) => handleChange(e, 'usuarios', index, 'senha')}
                        />
                      </Form.Group>

                      </Form.Group>
                      {usuarios.length > 1 && (
                          <Button 
                              variant="danger" 
                              onClick={() => handleRemoveUsuario(index)}
                              className="mb-2"
                          >
                              Remover
                          </Button>
                      )}
                  </div>
              ))}
              <Button onClick={handleAddUsuario} style={{ backgroundColor: "#85BB32", borderColor: "#85BB32" }}>Adicionar Usuário</Button>
          </Card.Body>
      </Card>

      {notification && (
      <Alert variant={notification.type}>
        {notification.message}
      </Alert>
    )}                 


        <Button type="submit" style={{ backgroundColor: "#85BB32", borderColor: "#85BB32" }}>Registrar Instituição</Button>
      </Form>
    </Container>
  );
};

export default NovaInstituicao;
