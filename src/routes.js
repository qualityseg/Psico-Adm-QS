import Dashboard from "views/Dashboard.js";
import NRs from "views/NovoUsuario.js";
import NR2 from "views/GerenciamentoUsuario.js";
import NR3 from "views/Usuarios.js";
import NR4 from "views/NovaInstituicao.js";
import NR5 from "views/TodosProgramas.js";
import GerenciamentoInstituicao from "views/GerenciamentoInstituicao.js";

import PainelUsuario from "views/PainelUsuario.js";
const dashboardRoutes = [
  
  {
    path: "/dashboard",
    name: "Painel Administrativo",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "/admin",
    roles: ['Administrador', 'Dev']
  },
  
  
  {
    path: "/painel",
    name: "Painel de Paciente",
    component: PainelUsuario,
    layout: "/usuario",
    icon: " nc-icon nc-badge",
    roles: ['Visualizador']
  },
  {
    name: "Usuários",
    icon: "nc-icon nc-single-02",
    layout: "/admin",
    roles: ['Administrador', 'Dev'], 
    subMenu: [
      {
        
        path: "/NovoUsuario",
        name: "Novo Usuário",
        component: NRs,
        layout: "/admin",
        roles: ['Administrador', 'Dev'],
      
      },
      {
        
        path: "/GerenciarUsuario",
        name: "Gerenciar Usuário",
        component: NR2,
        layout: "/admin",
        roles: ['Administrador', 'Dev'],
        
      },
      {
       
        path: "/Usuarios",
        name: "Usuários",
        component: NR3,
        layout: "/admin",
        roles: ['Administrador', 'Dev'],
        
      },
    ]
  },
  {
    name: "Instituições",
    icon: "nc-icon nc-bank",
    layout: "/admin",
    roles: ['Dev'], 
    subMenu: [
      {
        
        path: "/NovaInstituicao",
        name: "Nova Instituição",
        component: NR4,
        layout: "/admin",
        roles: ['Dev'],
      
      },
      {
        path: "/GerenciarInstituicao",
        name: "Gerenciar Instituição",
        component: GerenciamentoInstituicao, // Import this at the top of the file
        layout: "/admin",
        roles: [ 'Dev'],
      },
    ]
  },
  {
    
    name: "Programas",
    icon: "nc-icon nc-align-left-2",
    layout: "/admin",
    roles: ['Administrador', 'Dev'], 
    subMenu: [
      {
        
        path: "/GerenciamentoDeAvaliacoes",
        name: "Painel de Avaliações",
        component: NR5,
        layout: "/admin",
        roles: ['Administrador', 'Dev'],
      
      },
    ]
  },
];

export default dashboardRoutes;