import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog";
import { FormStudent } from "./form-student";
import { Student } from "~/interfaces/students.interface";
import toast from "react-hot-toast";
import { useStudents } from "~/context/students-context";

export function CreateStudent() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<Student>({
    code: "",
    name: "",
    last_name: "",
    dni: "",
    email: "",
    birthdate: new Date(),
    address: "",
    phoneNumber: "",
    enrollmentDate: new Date(),
    gender: "other",
  });

  const { addStudent } = useStudents()

  const handleInputChange = (e: any) => {
    const { id, value } = e.target;
    setFormData((prev: Student) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await toast.promise(
        addStudent(formData),
        {
          loading: "Saving...",
          success: <b>Se creó el registro exitosamente!</b>,
          error: (err) => `${err.toString()}`,
        }
      );
      setIsOpen(false);
    } catch (error) {
      console.error("Error al crear estudiante:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setIsOpen(true)}>Create Student</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create Student</DialogTitle>
        </DialogHeader>
        <FormStudent formData={formData} onInputChange={handleInputChange} setFormData={setFormData} />
        <DialogFooter>
          <Button type="button" onClick={() => setIsOpen(false)}>
            Close
          </Button>
          <Button type="button" onClick={handleSubmit}>
            Create Student
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
