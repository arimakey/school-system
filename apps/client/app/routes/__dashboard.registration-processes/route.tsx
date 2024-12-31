import { RegistrationProcessProvider } from "~/context/registration_process-context";
import { CreateRegistrationProcess } from "./create-registration-processes";
import RegistrationProcessTable from './registration-processes-table';
import { RegistrationProcessToggle } from "./toggle-registration-processes";
import { RegistrationProcessDetail } from "./detail-registration-processes";
import { RegistrationProcessEdit } from "./edit-registration-processes";


function RegistrationProcessPage() {
  return (
    <RegistrationProcessProvider>
      <main className="container mx-auto">
        <section className="mb-6">
          <CreateRegistrationProcess />
        </section>
        <section>
          <RegistrationProcessTable />
          <RegistrationProcessToggle />
          <RegistrationProcessDetail />
          <RegistrationProcessEdit />
        </section>
      </main>
    </RegistrationProcessProvider>
  );
}

export default RegistrationProcessPage;
