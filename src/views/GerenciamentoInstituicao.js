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
      fetchDetails('/usuarios'),
    ])
    .then(([instituicoes, cargos, contatos, setores, unidades, usuarios]) => {
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
  
    const instituicaoDetails = detalhesInstituicao.instituicoes[0];
  
    return (
      <Table responsive bordered className="institution-details-table mb-4">
        <tbody>
          <tr>
            <td className="detail-cell">Instituição</td>
            <td className="detail-cell">{instituicaoDetails.instituicao}</td>
          </tr>
          <tr>
            <td className="detail-cell">CNPJ</td>
            <td className="detail-cell">{instituicaoDetails.cnpj}</td>
          </tr>
          <tr>
            <td className="detail-cell">Inscrição Estadual</td>
            <td className="detail-cell">{instituicaoDetails.inscricaoEstadual}</td>
          </tr>
          <tr>
            <td className="detail-cell">Razão Social</td>
            <td className="detail-cell">{instituicaoDetails.razaoSocial}</td>
          </tr>
          <tr>
            <td className="detail-cell">Logradouro</td>
            <td className="detail-cell">{instituicaoDetails.logradouro}</td>
          </tr>
          <tr>
            <td className="detail-cell">Número</td>
            <td className="detail-cell">{instituicaoDetails.numero}</td>
          </tr>
          <tr>
            <td className="detail-cell">Complemento</td>
            <td className="detail-cell">{instituicaoDetails.complemento}</td>
          </tr>
          <tr>
            <td className="detail-cell">Bairro</td>
            <td className="detail-cell">{instituicaoDetails.bairro}</td>
          </tr>
          <tr>
            <td className="detail-cell">Cidade</td>
            <td className="detail-cell">{instituicaoDetails.cidade}</td>
          </tr>
          <tr>
            <td className="detail-cell">Estado</td>
            <td className="detail-cell">{instituicaoDetails.estado}</td>
          </tr>
          <tr>
            <td className="detail-cell">País</td>
            <td className="detail-cell">{instituicaoDetails.pais}</td>
          </tr>
          <tr>
            <td className="detail-cell">CEP</td>
            <td className="detail-cell">{instituicaoDetails.cep}</td>
          </tr>
        </tbody>
      </Table>
    );
  };

  const renderCargosDetails = () => {
    if (!detalhesInstituicao || !detalhesInstituicao.cargos) return null;
  
    return (
      <Table responsive bordered className="cargos-details-table mb-4">
        <tbody>
          {detalhesInstituicao.cargos.map((cargo, index) => (
            <React.Fragment key={index}>
              
              <tr>
              <td className="detail-cell">Cargo</td>
              <td className="detail-cell">{cargo.cargo}</td>
            </tr>
            <tr>
              <td className="detail-cell">Instituição</td>
              <td className="detail-cell">{cargo.instituicaoNome}</td>
            </tr>
            </React.Fragment>
          ))}
        </tbody>
      </Table>
    );
  };
  
  
  
  const renderContatosDetails = () => {
    if (!detalhesInstituicao || !detalhesInstituicao.contatos) return null;
  
    return (
      <Table responsive bordered className="contatos-details-table mb-4">
        <tbody>
          {detalhesInstituicao.contatos.map((contato, index) => (
            <React.Fragment key={index}>
             
              <tr>
                <td className="detail-cell">Categoria</td>
                <td className="detail-cell">{contato.categoria}</td>
              </tr>
              <tr>
                <td className="detail-cell">  Categoria Específica</td>
                <td className="detail-cell">{contato.categoriaEspecifica}</td>
              </tr>
              <tr>
                <td className="detail-cell">Nome Completo</td>
                <td className="detail-cell">{contato.nomeCompleto}</td>
              </tr>
              <tr>
                <td className="detail-cell">Telefone</td>
                <td className="detail-cell">{contato.telefone}</td>
              </tr>
              <tr>
                <td className="detail-cell">Instituição</td>
                <td className="detail-cell">{contato.instituicaoNome}</td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </Table>
    );
  };
  
  const renderSetoresDetails = () => {
    if (!detalhesInstituicao || !detalhesInstituicao.setores) return null;
  
    return (
      <Table responsive bordered className="setores-details-table mb-4">
        <tbody>
          {detalhesInstituicao.setores.map((setor, index) => (
            <React.Fragment key={index}>
              <tr>
                <td className="detail-cell">Setor</td>
                <td className="detail-cell">{setor.setor}</td>
              </tr>
              <tr>
                <td className="detail-cell">Instituição</td>
                <td className="detail-cell">{setor.instituicaoNome}</td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </Table>
    );
  };
  
  const renderUnidadesDetails = () => {
    if (!detalhesInstituicao || !detalhesInstituicao.unidades) return null;
  
    return (
      <Table responsive bordered className="unidades-details-table mb-4">
        <tbody>
          {detalhesInstituicao.unidades.map((unidade, index) => (
            <React.Fragment key={index}>
            
              <tr>
                <td className="detail-cell">Unidade</td>
                <td className="detail-cell">{unidade.unidade}</td>
              </tr>
              <tr>
                <td className="detail-cell">Instituição</td>
                <td className="detail-cell">{unidade.instituicaoNome}</td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </Table>
    );
  };
  
  const renderUsuariosDetails = () => {
    if (!detalhesInstituicao || !detalhesInstituicao.usuarios) return null;
  
    return (
      <Table responsive bordered className="usuarios-details-table mb-4">
        <tbody>
          {detalhesInstituicao.usuarios.map((usuario, index) => (
            <React.Fragment key={index}>
              
              <tr>
                <td className="detail-cell">Nome</td>
                <td className="detail-cell">{usuario.nome}</td>
              </tr>
              <tr>
                <td className="detail-cell">Identificador</td>
                <td className="detail-cell">{usuario.identificador}</td>
              </tr>
              <tr>
                <td className="detail-cell">Senha</td>
                <td className="detail-cell">{usuario.senha}</td>
              </tr>
              <tr>
                <td className="detail-cell">Acesso</td>
                <td className="detail-cell">{usuario.acesso}</td>
              </tr>
              <tr>
                <td className="detail-cell">Instituição</td>
                <td className="detail-cell">{usuario.instituicaoNome}</td>
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