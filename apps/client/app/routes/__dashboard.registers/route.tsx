import { RegisterProvider } from "~/context/register-context";
import RegisterTable from "./registers-table";
import { RegisterDetail } from "./detail-registers";
import { CreateRegister } from "./create-register";
import { RegisterStepsProvider } from "~/context/register-steps-context";

function StudentsPage() {
  return (
    <RegisterProvider>
      <main className="container mx-auto">
        <RegisterStepsProvider>
          <CreateRegister />
        </RegisterStepsProvider>
        <RegisterTable />
        <RegisterDetail />
      </main>
    </RegisterProvider>
  );
}

export default StudentsPage;
