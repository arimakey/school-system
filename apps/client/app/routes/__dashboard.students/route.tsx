import { CreateStudent } from "./create-student";
import { StudentProvider } from "~/context/students-context";
import StudentTable from './student-table';
import DeleteStudent from "./delete-student";

function StudentsPage() {
  return (
    <StudentProvider>
      <main className="container mx-auto">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-center">Gestión de Estudiantes</h1>
        </header>
        <section className="mb-6">
          <CreateStudent />
        </section>
        <section>
          <StudentTable />
          <DeleteStudent />
        </section>
      </main>
    </StudentProvider>
  );
}

export default StudentsPage;
