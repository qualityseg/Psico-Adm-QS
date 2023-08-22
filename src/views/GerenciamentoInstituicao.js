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

  const renderCell = (label, field, item, index, category) => {
    return (
      <React.Fragment>
        <tr>
          <td className="detail-cell">{label}</td>
          <td className="detail-cell">
            {isEditing ? (
              <input
                type="text"
                value={editData[category][index][field]}
                onChange={(e) => handleInputChange(e, index, category, field)}
              />
            ) : (
              item[field]
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
      ...detalhesInstituicao.instituicoes[0], // Acessando os detalhes da instituição selecionada
      cargos: detalhesInstituicao.cargos ? [...detalhesInstituicao.cargos] : [],
      contatos: detalhesInstituicao.contatos ? [...detalhesInstituicao.contatos] : [],
      setores: detalhesInstituicao.setores ? [...detalhesInstituicao.setores] : [],
      unidades: detalhesInstituicao.unidades ? [...detalhesInstituicao.unidades] : [],
      usuarios: detalhesInstituicao.usuarios ? [...detalhesInstituicao.usuarios] : [],
    });
    setIsEditing(true);
  };
  
  
  const handleSave = async (index) => {
  const instituicaoToUpdate = editData; // Dados editados

  try {
    const response = await axios.put(`https://fair-ruby-caterpillar-wig.cyclic.app/instituicoes/${instituicaoToUpdate.id}`, instituicaoToUpdate);
    if (response.status === 200) {
      // Atualizar a lista de instituições com os novos dados
      const updatedInstituicoes = [...instituicoes];
      updatedInstituicoes[index] = instituicaoToUpdate;
      setInstituicoes(updatedInstituicoes);
      setNotification({ type: 'success', message: 'Instituição atualizada com sucesso!' });
    }
  } catch (error) {
    console.error(error);
    setNotification({ type: 'danger', message: 'Erro ao atualizar a instituição' });
  }
};

  
const handleDeleteInstituicao = async (id) => {
  try {
    const response = await axios.delete(`https://fair-ruby-caterpillar-wig.cyclic.app/instituicoes/${id}`);
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
  
  useEffect(() => {
    carregarInstituicoes();
  }, []);

  const carregarInstituicoes = () => {
    axios.get('https://fair-ruby-caterpillar-wig.cyclic.app/instituicoes')
      .then(response => {
        setInstituicoes(response.data);
      })
      .catch(error => {
        console.error("API Error:", error);
      });
  };

  const carregarDetalhesInstituicao = (instituicaoId) => {
    const fetchDetails = async (endpoint) => {
      const response = await axios.get(`https://fair-ruby-caterpillar-wig.cyclic.app${endpoint}?instituicaoId=${instituicaoId}`);
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
    carregarDetalhesInstituicao(instituicaoSelecionada.id);
  };
// Função para renderizar a tabela de detalhes da instituição
const renderInstituicaoDetails = () => {
  if (!detalhesInstituicao || !detalhesInstituicao.instituicoes) return null;

  const instituicaoDetails = isEditing ? editData : detalhesInstituicao.instituicoes[0];

  const renderCell = (key) => (
    isEditing ? (
      <input
        type="text"
        value={instituicaoDetails[key]}
        onChange={(e) => setEditData({ ...editData, [key]: e.target.value })}
      />
    ) : (
      instituicaoDetails[key]
    )
  );

  return (
    <Table responsive bordered className="institution-details-table mb-4">
      <tbody>
        <tr><td className="detail-cell">Instituição</td><td className="detail-cell">{renderCell('instituicao')}</td></tr>
        <tr><td className="detail-cell">CNPJ</td><td className="detail-cell">{renderCell('cnpj')}</td></tr>
        <tr><td className="detail-cell">Inscrição Estadual</td><td className="detail-cell">{renderCell('inscricaoEstadual')}</td></tr>
        <tr><td className="detail-cell">Razão Social</td><td className="detail-cell">{renderCell('razaoSocial')}</td></tr>
        <tr><td className="detail-cell">Logradouro</td><td className="detail-cell">{renderCell('logradouro')}</td></tr>
        <tr><td className="detail-cell">Número</td><td className="detail-cell">{renderCell('numero')}</td></tr>
        <tr><td className="detail-cell">Complemento</td><td className="detail-cell">{renderCell('complemento')}</td></tr>
        <tr><td className="detail-cell">Bairro</td><td className="detail-cell">{renderCell('bairro')}</td></tr>
        <tr><td className="detail-cell">Cidade</td><td className="detail-cell">{renderCell('cidade')}</td></tr>
        <tr><td className="detail-cell">Estado</td><td className="detail-cell">{renderCell('estado')}</td></tr>
        <tr><td className="detail-cell">País</td><td className="detail-cell">{renderCell('pais')}</td></tr>
        <tr><td className="detail-cell">CEP</td><td className="detail-cell">{renderCell('cep')}</td></tr>
      </tbody>
    </Table>
  );
};

const renderCargosDetails = () => {
  if (!detalhesInstituicao || !detalhesInstituicao.cargos) return null;

  const renderCell = (value, fieldName, index) => {
    if (isEditing) {
      return (
        <input
          type="text"
          value={editData.cargos[index][fieldName]}
          onChange={(e) => handleCargoChange(e, fieldName, index)}
        />
      );
    }
    return value;
  };

  return (
    <Table responsive bordered className="cargos-details-table mb-4">
      <tbody>
        {detalhesInstituicao.cargos.map((cargo, index) => (
          <React.Fragment key={index}>
            <tr>
              <td className="detail-cell">Cargo</td>
              <td className="detail-cell">{renderCell(cargo.cargo, 'cargo', index)}</td>
            </tr>
           
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
  // Utilizando ?. para evitar erro se detalhesInstituicao for null ou undefined
  const dataSource = isEditing ? editData.contatos : detalhesInstituicao?.contatos;

  if (!dataSource) return null;

  const renderCell = (field, index) => {
    return isEditing ? (
      <input
        type="text"
        value={editData.contatos[index][field]}
        onChange={(e) => handleInputChange(e, index, 'contatos', field)}
      />
    ) : (
      dataSource[index][field]
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

  const setores = isEditing ? editData.setores : detalhesInstituicao.setores;
  if (!setores) return null;

  return (
    <Table responsive bordered className="setores-details-table mb-4">
      <tbody>
        {dataSource.map((setor, index) => (
          <React.Fragment key={index}>
            {renderCell('Setor', 'setor', setor, index, 'setores')}
          </React.Fragment>
        ))}
      </tbody>
    </Table>
  );
};

  
const renderUnidadesDetails = () => {
  // Seleciona a fonte de dados com base no modo de edição
  const dataSource = isEditing ? editData.unidades : detalhesInstituicao?.unidades;

  // Retorna null se a fonte de dados estiver vazia
  if (!dataSource) return null;

  // Função para renderizar uma célula, permitindo edição se estiver no modo de edição
  const renderCell = (field, index) => {
    return isEditing ? (
      <input
        type="text"
        value={editData.unidades[index][field]}
        onChange={(e) => handleInputChange(e, index, 'unidades', field)}
      />
    ) : (
      dataSource[index][field]
    );
  };

  // Renderiza a tabela de unidades
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

  const usuarios = isEditing ? editData.usuarios : detalhesInstituicao.usuarios;
  if (!usuarios) return null;

  return (
    <Table responsive bordered className="usuarios-details-table mb-4">
      <tbody>
        {dataSource.map((usuario, index) => (
          <React.Fragment key={index}>
            {renderCell('Nome', 'nome', usuario, index, 'usuarios')}
            {renderCell('Identificador', 'identificador', usuario, index, 'usuarios')}
            {renderCell('Senha', 'senha', usuario, index, 'usuarios')}
            {renderCell('Acesso', 'acesso', usuario, index, 'usuarios')}
            
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