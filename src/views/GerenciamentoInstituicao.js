import React, { useState, useEffect } from 'react';
import { Table, Container, Pagination } from 'react-bootstrap';
import axios from 'axios';
import './NR2.css'; // Assuming the same CSS file is used for styling

const GerenciamentoInstituicoes = () => {
  const [instituicoes, setInstituicoes] = useState([]);
  const [selectedInstituicao, setSelectedInstituicao] = useState(null);
  const [detalhesInstituicao, setDetalhesInstituicao] = useState(null); // State for institution details
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [isEditing, setIsEditing] = useState(false);
  const [notification, setNotification] = useState(null);
  const [editData, setEditData] = useState(null);
  const [selectedInstituicaoId, setSelectedInstituicaoId] = useState(null);


  const renderCell = (label, field, item, index, category) => {
    const value = isEditing ? editData[category][index][field] : item[field];
    return (
      <React.Fragment>
        <tr>
          <td className="detail-cell">{label}</td>
          <td className="detail-cell">
            {isEditing ? (
              <input
                type="text"
                value={value || ''} // Ensure that null values are treated as an empty string
                onChange={(e) => handleInputChange(e, index, category, field)}
              />
            ) : (
              value || '' // Also handle the case where value is null when not editing
            )}
          </td>
        </tr>
      </React.Fragment>
    );
  };
  
  
  const handleCancel = () => {
    // Restaurar os valores originais, se necessário
    // ...
  
    // Atualizar o estado para indicar que a edição foi cancelada
    setIsEditing(false);
  };
  
  const handleEdit = () => {
    setEditData({
      instituicoes: detalhesInstituicao.instituicoes ? [detalhesInstituicao.instituicoes[0]] : [],
      cargos: detalhesInstituicao.cargos ? [...detalhesInstituicao.cargos] : [],
      contatos: detalhesInstituicao.contatos ? [...detalhesInstituicao.contatos] : [],
      setores: detalhesInstituicao.setores ? [...detalhesInstituicao.setores] : [],
      unidades: detalhesInstituicao.unidades ? [...detalhesInstituicao.unidades] : [],
      usuarios: detalhesInstituicao.usuarios ? [...detalhesInstituicao.usuarios] : [],
    });
    setIsEditing(true);
  };
  
  // Função para validar os dados antes de salvar
  const validateData = (data) => {
    if (!data.instituicoes || data.instituicoes.length === 0) {
      return { isValid: false, message: 'Instituições estão vazias' };
    }
    // Adicione mais regras de validação conforme necessário
    return { isValid: true };
  };

 // Função para lidar com o botão "Salvar"
  const handleSave = async () => {
    if (!editData) {
      console.error("Nenhum dado para salvar.");
      return;
    }

    const dataToSave = {
      instituicoes: editData.instituicoes,
      cargos: editData.cargos,
      contatos: editData.contatos,
      setores: editData.setores,
      unidades: editData.unidades,
      usuarios: editData.usuarios,
    };
    // Log de dados que serão enviados
    console.log("Data to be sent:", dataToSave);

    try {
      const response = await axios.put(
        `https://smoggy-pike-jumper.cyclic.app/instituicoes/${selectedInstituicao.instituicaoNome}`, // Usando o nome da instituição como identificador
        dataToSave
      );

      // Log de resposta bem-sucedida
      if (response.status === 200) {
        console.log("Data successfully saved. Response:", response.data);

        // Aqui você pode adicionar código para atualizar o estado, se necessário
      } else {
        // Log de resposta mal-sucedida
        console.log("Failed to save data. Response:", response.data);
      }
    } catch (error) {
      console.error("API Error:", error);
    }
  };


  const handleDeleteInstituicao = async (id) => {
    try {
      const response = await axios.delete(`https://smoggy-pike-jumper.cyclic.app/instituicoes/${id}`);
      if (response.status === 200) {
        // Remover a instituição excluída da lista usando o ID
        const updatedInstituicoes = instituicoes.filter(instituicao => instituicao.id !== id);
        setInstituicoes(updatedInstituicoes);
        setNotification({ type: 'success', message: 'Instituição excluída com sucesso!' });
        console.log('Instituição excluída com sucesso!'); // Log de verificação
      }
    } catch (error) {
      console.error(error);
      setNotification({ type: 'danger', message: 'Erro ao excluir a instituição' });
    }
  };
    
  const handleInputChange = (e, index, category, field) => {
    const newValue = e.target.value;
    setEditData((prevData) => {
      const updatedCategoryData = [...prevData[category]];
      updatedCategoryData[index][field] = newValue;
      return { ...prevData, [category]: updatedCategoryData };
    });
  };



  useEffect(() => {
    carregarInstituicoes();
  }, []);

  const carregarInstituicoes = () => {
    axios.get('https://smoggy-pike-jumper.cyclic.app/instituicoes')
      .then(response => {
        setInstituicoes(response.data);
      })
      .catch(error => {
        console.error("API Error:", error);
      });
  };

  const carregarDetalhesInstituicao = (instituicaoId) => {
    const fetchDetails = async (endpoint) => {
      const response = await axios.get(`https://smoggy-pike-jumper.cyclic.app${endpoint}?instituicaoId=${instituicaoId}`);
      return response.data;
    };
  
    Promise.all([
      fetchDetails('/instituicao-detalhes'),
      fetchDetails('/cargos'),
      fetchDetails('/contatos'),
      fetchDetails('/setores'),
      fetchDetails('/unidades'),
      fetchDetails('/usuarios_instituicao'),
    ])
    .then(([instituicoes, cargos, contatos, setores, unidades, usuarios]) => {
      console.log("Detalhes da Instituição:", { instituicoes, cargos, contatos, setores, unidades, usuarios });
      setDetalhesInstituicao({ instituicoes, cargos, contatos, setores, unidades, usuarios });
    })
    
    .catch(error => {
      console.error("Erro ao carregar detalhes da instituição:", error);
    });
  };
  
  

  const handleInstituicaoSelection = (index) => {
    const instituicaoSelecionada = instituicoes[index];
    setSelectedInstituicao(instituicaoSelecionada);
    setSelectedInstituicaoId(instituicaoSelecionada.id);  // Certifique-se de que esta linha está definindo o ID corretamente.
    carregarDetalhesInstituicao(instituicaoSelecionada.id);
  };
  
const renderInstituicaoDetails = () => {
  if (!detalhesInstituicao || !detalhesInstituicao.instituicoes) return null;

  const renderCell = (field, label) => {
    const value = isEditing ? editData.instituicoes[0][field] : detalhesInstituicao.instituicoes[0][field];
    return (
      <tr>
        <td className="detail-cell">{label}</td>
        <td className="detail-cell">
          {isEditing ? (
            <input
              type="text"
              value={value || ''}
              onChange={(e) => handleInputChange(e, 0, 'instituicoes', field)}
            />
          ) : (
            value
          )}
        </td>
      </tr>
    );
  };

  return (
    <Table responsive bordered className="instituicao-details-table mb-4">
      <tbody>
        
        {renderCell('instituicao', 'Instituição')}
        {renderCell('cnpj', 'CNPJ')}
        {renderCell('razaoSocial', 'Razão Social')}
        {renderCell('logradouro', 'Logradouro')}
        {renderCell('numero', 'Número')}
        {renderCell('complemento', 'Complemento')}
        {renderCell('bairro', 'Bairro')}
        {renderCell('cidade', 'Cidade')}
        {renderCell('estado', 'Estado')}
        {renderCell('pais', 'País')}
        {renderCell('cep', 'CEP')}
      </tbody>
    </Table>
  );
};


const renderCargosDetails = () => {
  if (!detalhesInstituicao || !detalhesInstituicao.cargos) return null;

  const renderCell = (field, label, index) => {
    const value = isEditing ? editData.cargos[index][field] : detalhesInstituicao.cargos[index][field];
    return (
      <tr>
        <td className="detail-cell">{label}</td>
        <td className="detail-cell">
          {isEditing ? (
            <input
              type="text"
              value={value || ''}
              onChange={(e) => handleInputChange(e, index, 'cargos', field)}
            />
          ) : (
            value
          )}
        </td>
      </tr>
    );
  };

  return (
    <Table responsive bordered className="cargos-details-table mb-4">
      <tbody>
        {detalhesInstituicao.cargos.map((cargo, index) => (
          <React.Fragment key={index}>
            {renderCell('cargo', 'Cargo', index)}
          </React.Fragment>
        ))}
      </tbody>
    </Table>
  );
};

// Função para lidar com a alteração dos campos de cargos
const handleCargoChange = (e, fieldName, index) => {
  const newCargos = [...editData.cargos];
  newCargos[index][fieldName] = e.target.value;
  setEditData({ ...editData, cargos: newCargos });
};

const renderContatosDetails = () => {
  const dataSource = isEditing ? editData.contatos : detalhesInstituicao?.contatos;

  if (!dataSource) return null;

  const renderCell = (field, index) => {
    return isEditing ? (
      <input
        type="text"
        value={editData.contatos[index][field] || ''}
        onChange={(e) => handleInputChange(e, index, 'contatos', field)}
      />
    ) : (
      dataSource[index][field] || ''
    );
  };

  return (
    <Table responsive bordered className="contatos-details-table mb-4">
      <tbody>
        {dataSource.map((contato, index) => (
          <React.Fragment key={index}>
            <tr>
              <td className="detail-cell">Categoria</td>
              <td className="detail-cell">{renderCell('categoria', index)}</td>
            </tr>
            <tr>
              <td className="detail-cell">Categoria Específica</td>
              <td className="detail-cell">{renderCell('categoriaEspecifica', index)}</td>
            </tr>
            <tr>
              <td className="detail-cell">Nome Completo</td>
              <td className="detail-cell">{renderCell('nomeCompleto', index)}</td>
            </tr>
            <tr>
              <td className="detail-cell">Telefone</td>
              <td className="detail-cell">{renderCell('telefone', index)}</td>
            </tr>
          </React.Fragment>
        ))}
      </tbody>
    </Table>
  );
};



  
const renderSetoresDetails = () => {
  const dataSource = isEditing ? editData.setores : detalhesInstituicao?.setores;

  if (!dataSource) return null;

  const renderCell = (field, index) => {
    return isEditing ? (
      <input
        type="text"
        value={editData.setores[index][field] || ''}
        onChange={(e) => handleInputChange(e, index, 'setores', field)}
      />
    ) : (
      dataSource[index][field] || ''
    );
  };

  return (
    <Table responsive bordered className="setores-details-table mb-4">
      <tbody>
        {dataSource.map((setor, index) => (
          <React.Fragment key={index}>
            <tr>
              <td className="detail-cell">Setor</td>
              <td className="detail-cell">{renderCell('setor', index)}</td>
            </tr>
          </React.Fragment>
        ))}
      </tbody>
    </Table>
  );
};

  
const renderUnidadesDetails = () => {
  const dataSource = isEditing ? editData.unidades : detalhesInstituicao?.unidades;

  if (!dataSource) return null;

  const renderCell = (field, index) => {
    return isEditing ? (
      <input
        type="text"
        value={editData.unidades[index][field] || ''}
        onChange={(e) => handleInputChange(e, index, 'unidades', field)}
      />
    ) : (
      dataSource[index][field] || ''
    );
  };

  return (
    <Table responsive bordered className="unidades-details-table mb-4">
      <tbody>
        {dataSource.map((unidade, index) => (
          <React.Fragment key={index}>
            <tr>
              <td className="detail-cell">Unidade</td>
              <td className="detail-cell">{renderCell('unidade', index)}</td>
            </tr>
          </React.Fragment>
        ))}
      </tbody>
    </Table>
  );
};



const renderUsuariosDetails = () => {
  const dataSource = isEditing ? editData.usuarios : detalhesInstituicao?.usuarios;

  if (!dataSource) return null;

  const renderCell = (field, index) => {
    return isEditing ? (
      <input
        type="text"
        value={editData.usuarios[index][field] || ''}
        onChange={(e) => handleInputChange(e, index, 'usuarios', field)}
      />
    ) : (
      dataSource[index][field] || ''
    );
  };

  return (
    <Table responsive bordered className="usuarios-details-table mb-4">
      <tbody>
        {dataSource.map((usuario, index) => (
          <React.Fragment key={index}>
            <tr>
              <td className="detail-cell">Nome</td>
              <td className="detail-cell">{renderCell('nome', index)}</td>
            </tr>
            <tr>
              <td className="detail-cell">Identificador</td>
              <td className="detail-cell">{renderCell('identificador', index)}</td>
            </tr>
            <tr>
              <td className="detail-cell">Senha</td>
              <td className="detail-cell">{renderCell('senha', index)}</td>
            </tr>
            <tr>
              <td className="detail-cell">Acesso</td>
              <td className="detail-cell">{renderCell('acesso', index)}</td>
            </tr>
          </React.Fragment>
        ))}
      </tbody>
    </Table>
  );
};

  // Pagination logic
  const totalPages = Math.ceil(instituicoes.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = instituicoes.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <Container fluid>
      <h1>Gerenciador de Instituições</h1>
      <p>Selecione a Instituição na tabela abaixo e vejas suas informações com opções de edição.</p>
      <Table responsive bordered className="institution-selection-table mb-4">
        <thead>
          <tr>
            <th>Selecione uma Instituição:</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((instituicao, index) => (
            <tr key={index} onClick={() => handleInstituicaoSelection(indexOfFirstItem + index)} className="clickable-row">
              <td>{instituicao.instituicao}</td>
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
      {selectedInstituicao && (
        <div>
          <div className="action-buttons">
          {isEditing ? (
            <button onClick={handleCancel}>Cancelar</button>
          ) : (
            <button onClick={handleEdit} disabled={isEditing}>Editar</button>
          )}
            <button onClick={handleSave} disabled={!isEditing}>Salvar</button>
            <button onClick={() => handleDeleteInstituicao(selectedInstituicao.id)}>Excluir Instituição</button>



          </div>
          <h2>Detalhes da Instituição: {selectedInstituicao.instituicao}</h2>
        {renderInstituicaoDetails()}
        <h1>Contatos</h1>
        {renderContatosDetails()}
        <h1>Unidades</h1>
        {renderUnidadesDetails()}
        <h1>Setores</h1>
        {renderSetoresDetails()}
        <h1>Cargos</h1>
        {renderCargosDetails()}
        <h1>Usuários</h1>
        {renderUsuariosDetails()}
        

        </div>
      )}
    </Container>
  );
};

export default GerenciamentoInstituicoes;