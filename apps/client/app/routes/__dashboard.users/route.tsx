import { CreateUser } from "./create-user";
import { StudentProvider } from "~/context/students-context";
import StudentTable from './user-table';
import DeleteStudent from "./delete-user";
import { UserProvider } from "~/context/users-context";
import UserTable from "./user-table";
import DeleteUser from "./delete-user";
import RecoverPassword from "./recover-user";

function UsersPage() {
  return (
    <UserProvider>
      <main className="container mx-auto">
        <section className="mb-6">
          <CreateUser />
        </section>
        <section>
          <UserTable />
          <DeleteUser />
          <RecoverPassword />
        </section>
      </main>
    </UserProvider>
  );
}

export default UsersPage;
