import { RegisterProvider } from "~/context/not-register-context";
import RegisterTable from "./registers-table";
import { RegisterDetail } from "./detail-registers";
import ApprovalDialog from "./approval-not-registers";

function StudentsPage() {
  return (
    <RegisterProvider>
      <main className="container mx-auto">
        <RegisterTable />
        <RegisterDetail />
        <ApprovalDialog />
      </main>
    </RegisterProvider>
  );
}

export default StudentsPage;
