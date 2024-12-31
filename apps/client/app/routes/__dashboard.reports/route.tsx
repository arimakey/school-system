import { useEffect, useState } from "react";
import { Bar, Doughnut, Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";
import { getAllRegisters } from "~/api/registers";
import { format } from "date-fns";
import { useAuth } from "~/context/auth.context";
import { Register } from "~/interfaces/registers.interface";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const Report = () => {
  const [registers, setRegisters] = useState<Register[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { token } = useAuth();

  useEffect(() => {
    const fetchRegisters = async () => {
      try {
        if (token == null) return;
        const data = await getAllRegisters(token);
        setRegisters(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchRegisters();
  }, [token]);

  // Preparación de datos para los gráficos

  // 1. Distribución por proceso de inscripción
  const registrationProcessCount = registers.reduce(
    (acc, register) => {
      const process = register.registrationProcess.name;
      acc[process] = (acc[process] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const registrationProcessData = {
    labels: Object.keys(registrationProcessCount),
    datasets: [
      {
        label: "Cantidad de Registros",
        data: Object.values(registrationProcessCount),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  // 2. Distribución de género de los estudiantes
  const studentGenderCount = registers.reduce(
    (acc, register) => {
      const gender = register.student.gender || "unknown";
      acc[gender] = (acc[gender] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const studentGenderData = {
    labels: Object.keys(studentGenderCount),
    datasets: [
      {
        data: Object.values(studentGenderCount),
        backgroundColor: ["#ff6384", "#36a2eb", "#cc65fe"],
      },
    ],
  };

  // 3. Distribución de género de los guardianes
  const guardianGenderCount = registers.reduce(
    (acc, register) => {
      const gender = register.guardian.gender || "unknown";
      acc[gender] = (acc[gender] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const guardianGenderData = {
    labels: Object.keys(guardianGenderCount),
    datasets: [
      {
        data: Object.values(guardianGenderCount),
        backgroundColor: ["#ff6384", "#36a2eb", "#cc65fe"],
      },
    ],
  };

  // 4. Estado de aprobación de registros
  const approvalCount = registers.reduce(
    (acc, register) => {
      const isApproved = register.isAprobated ? "Aprobado" : "No Aprobado";
      acc[isApproved] = (acc[isApproved] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const approvalData = {
    labels: Object.keys(approvalCount),
    datasets: [
      {
        data: Object.values(approvalCount),
        backgroundColor: ["#ff9f40", "#4bc0c0"],
      },
    ],
  };

  // 5. Distribución de registros por fecha de inscripción
  const registrationDates = registers.reduce(
    (acc, register) => {
      const enrollmentDate = register.student.enrollmentDate;
      const date = enrollmentDate
        ? format(new Date(enrollmentDate), "yyyy-MM-dd")
        : "N/A";
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const registrationDateData = {
    labels: Object.keys(registrationDates),
    datasets: [
      {
        label: "Cantidad de Registros",
        data: Object.values(registrationDates),
        borderColor: "#ff6f61",
        backgroundColor: "rgba(255, 111, 97, 0.2)",
        fill: true,
      },
    ],
  };

  // 6. Edad de los estudiantes
  const calculateAge = (birthdate: Date) => {
    const today = new Date();
    const age = today.getFullYear() - new Date(birthdate).getFullYear();
    return age;
  };

  const studentAges = registers.map((register) =>
    calculateAge(register.student.birthdate)
  );
  const studentAgeData = {
    labels: studentAges.map((_, idx) => `Estudiante ${idx + 1}`),
    datasets: [
      {
        label: "Edad de los Estudiantes",
        data: studentAges,
        borderColor: "#36a2eb",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        fill: false,
      },
    ],
  };

  // 7. Número de registros por tipo de ocupación de los guardianes
  const guardianOccupationCount = registers.reduce(
    (acc, register) => {
      const occupation = register.guardian.occupation || "Desconocido";
      acc[occupation] = (acc[occupation] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const guardianOccupationData = {
    labels: Object.keys(guardianOccupationCount),
    datasets: [
      {
        label: "Cantidad de Registros por Ocupación",
        data: Object.values(guardianOccupationCount),
        backgroundColor: "rgba(153, 102, 255, 0.6)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Si los datos están cargando, mostramos un mensaje
  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="container mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
  <h2 className="text-3xl font-semibold text-center text-gray-800 mb-12">
    Reportes de Registros
  </h2>
  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
    <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
      <h3 className="text-2xl font-medium text-gray-700 mb-4">Proceso de Inscripción</h3>
      <div className="w-full flex justify-center">
        <Bar data={registrationProcessData} options={{ responsive: true }} />
      </div>
    </div>

    <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
      <h3 className="text-2xl font-medium text-gray-700 mb-4">Género de Estudiantes</h3>
      <div className="w-full flex justify-center">
        <Pie data={studentGenderData} options={{ responsive: true }} />
      </div>
    </div>

    <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
      <h3 className="text-2xl font-medium text-gray-700 mb-4">Género de Guardianes</h3>
      <div className="w-full flex justify-center">
        <Doughnut data={guardianGenderData} options={{ responsive: true }} />
      </div>
    </div>

    <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
      <h3 className="text-2xl font-medium text-gray-700 mb-4">Estado de Aprobación</h3>
      <div className="w-full flex justify-center">
        <Doughnut data={approvalData} options={{ responsive: true }} />
      </div>
    </div>

    <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
      <h3 className="text-2xl font-medium text-gray-700 mb-4">
        Distribución por Fecha de Inscripción
      </h3>
      <div className="w-full flex justify-center">
        <Line data={registrationDateData} options={{ responsive: true }} />
      </div>
    </div>

    <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
      <h3 className="text-2xl font-medium text-gray-700 mb-4">Edad de los Estudiantes</h3>
      <div className="w-full flex justify-center">
        <Line data={studentAgeData} options={{ responsive: true }} />
      </div>
    </div>

    <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
      <h3 className="text-2xl font-medium text-gray-700 mb-4">Ocupación de los Guardianes</h3>
      <div className="w-full flex justify-center">
        <Bar data={guardianOccupationData} options={{ responsive: true }} />
      </div>
    </div>
  </div>
</div>

  );
};

export default Report;
