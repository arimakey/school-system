import { Building, Clipboard, Group, Home, User, Workflow } from "lucide-react"

const items = [
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
      title: "Alumnos",
      url: "/students",
      icon: User,
    },
    {
      title: "Procesos de Matrícula",
      url: "/procesos-matricula",
      icon: Workflow,
    },
    {
      title: "Usuarios",
      url: "/users",
      icon: Group,
    },
    {
      title: "Aulas",
      url: "/aulas",
      icon: Building,
    }
];

export default items;