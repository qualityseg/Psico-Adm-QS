import React, { useState, useEffect } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const NR2 = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);
  const [editData, setEditData] = useState({});

  const columns = [
    'name', 'surname', 'email', 'birthDate', 'gender', 'phone', 'phone2', 'cpf', 'cnpj',
    'registration', 'obs', 'address', 'number', 'complement', 'district', 'city', 'state',
    'country', 'zipCode', 'unit', 'sector', 'role', 'institution', 'accessRecovery', 'access'
  ];
  

  useEffect(() => {
    carregarUsuarios();
  }, []);
  
  const carregarUsuarios = () => {
    axios.get('http://localhost:5000/users')
      .then(response => {
        setUsuarios(response.data.users);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditData(usuarios[index]);
  };

  const handleSave = () => {
    axios.put(`http://localhost:5000/cadastro_clientes/${editData.id}`, editData)
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
    axios.delete(`http://localhost:5000/users/${id}`)
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

  return (
    <Table responsive striped bordered hover>
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th key={index}>{column}</th>
          ))}
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {usuarios.map((usuario, index) => (
          <tr key={usuario.id}>
            {columns.map((column, idx) => (
              <td key={idx}>
                {editIndex === index ? (
                  <Form.Control
                    type="text"
                    value={editData[column] || ''}
                    onChange={(e) => handleChange(e, column)}
                  />
                ) : (
                  usuario[column] || ''
                )}
              </td>
            ))}
            <td>
              {editIndex === index ? (
                <>
                  <Button variant="success" onClick={handleSave}>Salvar</Button>{' '}
                  <Button variant="secondary" onClick={handleCancel}>Cancelar</Button>
                </>
              ) : (
                <>
                  <Button variant="primary" onClick={() => handleEdit(index)}>Editar</Button>{' '}
                  <Button variant="danger" onClick={() => handleDelete(usuario.id)}>Excluir</Button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default NR2;
