import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Container, Row, Col , Pagination} from 'react-bootstrap';
import axios from 'axios';
import './NR2.css'; 

const NR2 = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);
  const [editData, setEditData] = useState({});
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Added for pagination
  const itemsPerPage = 5; // Added for pagination

  // Pagination logic
  const totalPages = Math.ceil(usuarios.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = usuarios.slice(indexOfFirstItem, indexOfLastItem);

const columns = [
    'Nome', 'Sobrenome', 'Email', 'Data_de_Nascimento', 'Genero', 'Telefone', 'Telefone2', 'CPF', 'CNPJ',
    'Matricula', 'Observacoes', 'Endereco', 'Numero', 'Complemento', 'Bairro', 'Cidade', 'Estado',
    'Pais', 'CEP', 'Unidade', 'Setor', 'Cargo', 'Instituicao', 'senha', 'Acesso'
  ];


  
  useEffect(() => {
    carregarUsuarios();
  }, []);

  const carregarUsuarios = () => {
    // Retrieve the institution name from localStorage
    const instituicaoNome = localStorage.getItem('instituicaoNome');

    // Make API request with the institution name as a parameter
    axios.get(`https://fair-ruby-caterpillar-wig.cyclic.app/usuarios?instituicaoNome=${instituicaoNome}`)
    .then(response => {
        if (response.data && Array.isArray(response.data)) {
            setUsuarios(response.data);
        } else {
            console.error("Unexpected data format:", response.data);
        }
    })
    .catch(error => {
        console.error("API Error:", error);
    });
  };
  const handleEdit = (index) => {
    setEditIndex(index);
    setEditData(usuarios[index]);
  };

  const handleSave = () => {
    axios.put(`https://fair-ruby-caterpillar-wig.cyclic.app/cadastro_clientes/${editData.id}`, editData)
      .then(response => {
        console.log(response.data);
        setEditIndex(-1);
        carregarUsuarios();
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleDelete = (id) => {
    axios.delete(`https://fair-ruby-caterpillar-wig.cyclic.app/usuarios/${id}`)
      .then(response => {
        console.log(response.data);
        carregarUsuarios();
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleCancel = () => {
    setEditIndex(-1);
    setEditData({});
  };

  const handleChange = (e, field) => {
    const { value } = e.target;
    setEditData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };

  const handleUserSelection = (index) => {
    setSelectedUser(index);
  };

  return (
    <Container fluid>
      <h1>Administração de Usuários para {localStorage.getItem('instituicaoNome')}</h1>
      <p>Selecione o Usuário na tabela abaixo e vejas suas informações com opções de edição.</p>
      <Table responsive bordered className="user-selection-table mb-4">
        <thead>
          <tr>
            <th>Selecione um Usuário:</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((usuario, index) => (
            <tr key={index} onClick={() => handleUserSelection(indexOfFirstItem + index)} className="clickable-row">
              <td>{usuario.Nome}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="pagination-wrapper">
        <Pagination>
          {[...Array(totalPages).keys()].map(page => (
            <Pagination.Item key={page + 1} active={page + 1 === currentPage} onClick={() => setCurrentPage(page + 1)}>
              {page + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </div>

      {selectedUser !== null && (
        <Row className="mb-4">
          <Col>
            <Table responsive bordered>
              <tbody>
                {columns.map((column, colIndex) => (
                  <tr key={colIndex}>
                    <th>{column}</th>
                    <td>
                      {editIndex === selectedUser ? (
                        <Form.Control
                          type="text"
                          value={editData[column] || ''}
                          onChange={e => handleChange(e, column)}
                        />
                      ) : (
                        usuarios[selectedUser][column]
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            {editIndex === selectedUser ? (
              <div>
                <Button variant="success" style={{ backgroundColor: "#85BB32", borderColor: "#85BB32" }} onClick={handleSave}>Salvar</Button>
                <Button variant="warning" style={{ backgroundColor: "#85BB32", borderColor: "#85BB32" }} onClick={handleCancel}>Cancelar</Button>
              </div>
            ) : (
              <div>
                <Button variant="primary" style={{ backgroundColor: "#85BB32", borderColor: "#85BB32" }} onClick={() => handleEdit(selectedUser)}>Editar</Button>
                <Button variant="danger" style={{ backgroundColor: "#85BB32", borderColor: "#85BB32" }} onClick={() => handleDelete(usuarios[selectedUser].id)}>Deletar</Button>
              </div>
            )}
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default NR2;
