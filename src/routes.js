import Dashboard from "views/Dashboard.js";
import NRs from "views/NovoUsuario.js";
import NR2 from "views/GerenciamentoUsuario.js";
import NR3 from "views/Usuarios.js";
import NR4 from "views/NovaInstituicao.js";
import NR5 from "views/TodosProgramas.js";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "LifeMed",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "/admin",
    roles: ['Financeiro', 'Administrador', 'Visualizador']
  },
  {
    name: "Usuários",
    icon: "nc-icon nc-single-02",
    layout: "/admin",
    roles: ['Administrador', 'Visualizador'], 
    subMenu: [
      {
        
        path: "/NovoUsuario",
        name: "Novo Usuário",
        component: NRs,
        layout: "/admin",
        roles: ['Administrador', 'Visualizador'],
      
      },
      {
        
        path: "/GerenciarUsuario",
        name: "Gerenciar Usuário",
        component: NR2,
        layout: "/admin",
        roles: ['Administrador', 'Visualizador'],
        
      },
      {
       
        path: "/Usuarios",
        name: "Usuários",
        component: NR3,
        layout: "/admin",
        roles: ['Administrador', 'Visualizador'],
        
      },
    ]
  },
  {
    name: "Instituições",
    icon: "nc-icon nc-bank",
    layout: "/admin",
    roles: ['Administrador', 'Visualizador'], 
    subMenu: [
      {
        
        path: "/NovaInstituicao",
        name: "Nova Instituição",
        component: NR4,
        layout: "/admin",
        roles: ['Administrador', 'Visualizador'],
      
      },
    ]
  },
  {
    name: "Programas",
    icon: "nc-icon nc-align-left-2",
    layout: "/admin",
    roles: ['Administrador', 'Visualizador'], 
    subMenu: [
      {
        
        path: "/TodosProgramas",
        name: "Todos os Programas",
        component: NR5,
        layout: "/admin",
        roles: ['Administrador', 'Visualizador'],
      
      },
    ]
  },
];

export default dashboardRoutes;