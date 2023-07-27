
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';

export default function UsuariosPorInstituicao() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const institution = localStorage.getItem('institution'); // Recupera a instituição do localStorage
    getUsuariosPorInstituicao(institution);
  }, []);

  const getUsuariosPorInstituicao = async (institution) => {
    try {
      const response = await axios.get(`http://localhost:5000/usersByInstitution/${institution}`);
      setData(response.data.users);
    } catch (error) {
      console.error(`Error fetching data: ${error}`);
    }
  };

  return (
    <div className="UsuariosPorInstituicao">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Sobrenome</th>
            <th>Email</th>
            <th>Instituição</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.surname}</td>
              <td>{item.email}</td>
              <td>{item.institution}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
