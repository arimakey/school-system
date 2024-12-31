import { Building, Clipboard, Group, Home, Workflow, User, FileText, BarChart, School, Users } from "lucide-react";

const getItems = (role: string) => {
  if (role === "Secretario") {
    return [
      {
        title: "Principal",
        url: "/",
        icon: Home,
      },
      {
        title: "Matrículas",
        url: "/registers",
        icon: Clipboard, // Mantengo Clipboard porque es adecuado
      },
      {
        title: "Usuarios",
        url: "/users",
        icon: Users, // Cambié a Users, más apropiado para 'Usuarios'
      },
    ];
  }

  if (role === "Director") {
    return [
      {
        title: "Principal",
        url: "/",
        icon: Home,
      },
      {
        title: "Reportes",
        url: "/reports",
        icon: BarChart, // Cambié a BarChart para representar mejor los reportes
      },
      {
        title: "Procesos de Matrícula",
        url: "/registration-processes",
        icon: Workflow,
      },
      {
        title: "Aulas",
        url: "/classrooms",
        icon: School, // Cambié a School, más representativo para Aulas
      },
      {
        title: "Matrículas",
        url: "/not-registers",
        icon: Clipboard,
      },
    ];
  }

  if (role === "Apoderado") {
    return [
      {
        title: "Principal",
        url: "/",
        icon: Home,
      },
      {
        title: "Estudiante",
        url: "/student",
        icon: User, // Cambié a User para representar al estudiante
      },
    ];
  }

  if (role === "user") {
    return [
      {
        title: "Principal",
        url: "/",
        icon: Home,
      },
      {
        title: "Matrículas",
        url: "/registers",
        icon: Clipboard,
      },
      {
        title: "Usuarios",
        url: "/users",
        icon: Users, // Cambié a Users, más apropiado para 'Usuarios'
      },
      {
        title: "Reportes",
        url: "/reports",
        icon: BarChart, // Cambié a BarChart para reportes
      },
      {
        title: "Procesos de Matrícula",
        url: "/registration-processes",
        icon: Workflow,
      },
      {
        title: "Aulas",
        url: "/classrooms",
        icon: School, // Cambié a School para Aulas
      },
      {
        title: "Matrículas Excepcionales",
        url: "/not-registers",
        icon: Clipboard,
      },
      {
        title: "Ver Estudiante",
        url: "/student",
        icon: User, // Cambié a User para representar al estudiante
      },
    ];
  }

  return [
    {
      title: "Principal",
      url: "/",
      icon: Home,
    },
  ];
};

export default getItems;
