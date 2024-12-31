import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { useRegisters } from "~/context/not-register-context";
import { Student } from "~/interfaces/students.interface";
import { DetailStudent } from "./student/detail-student";
import { Guardian } from "~/interfaces/guardian.interface";
import { Register } from "~/interfaces/registers.interface";
import { DetailGuardian } from "./guardian/detail-guardian";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";

export function RegisterDetail() {
  const {
    selectedRegisterId,
    isDetailDialogOpen,
    getOneRegister, 
    setDetailDialogOpen,
  } = useRegisters();
  const [student, setStudent] = useState<Student | null>(null);
  const [guardian, setGuardian] = useState<Guardian | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedRegisterId) {
      setStudent(null);
      setLoading(true);
      const fetchRegister = async () => {
        const fetchedRegister: Register =
          await getOneRegister(selectedRegisterId);
        setStudent(fetchedRegister?.student || null);
        setGuardian(fetchedRegister?.guardian || null);
        setLoading(false);
      };
      fetchRegister();
    } else {
      setStudent(null);
      setLoading(false);
    }
  }, [selectedRegisterId, getOneRegister]);

  return (
    <>
      <Dialog open={isDetailDialogOpen} onOpenChange={setDetailDialogOpen}>
        <DialogContent className="w-full">
          <DialogHeader>
            <DialogTitle>Detalle de la Matricula</DialogTitle>
          </DialogHeader>
          <Tabs defaultValue="student" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="student">Estudiante</TabsTrigger>
              <TabsTrigger value="guardian">Guardian</TabsTrigger>
            </TabsList>
            <TabsContent value="student">
              <DetailStudent student={student} />
            </TabsContent>
            <TabsContent value="guardian">
              <DetailGuardian guardian={guardian} />
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  );
}
