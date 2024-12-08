import { useState } from "react";
import { Button } from "../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { FormStudent } from "./form-student";
import { Student } from "~/interfaces/students.interface";
import { postStudent } from "~/api/student";
import toast from "react-hot-toast";

export function EditStudent({ student }: { student: Student }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<Student>({ ...student });

  const handleInputChange = (e: any) => {
    const { id, value } = e.target;
    setFormData((prev: Student) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await toast.promise(postStudent(formData, ""), {
        loading: "Saving...",
        success: <b>Se guardaron los cambios exitosamente!</b>,
        error: (err) => `${err.toString()}`,
      });
      setIsOpen(false);
    } catch (error) {
      console.error("Error al editar estudiante:", error);
    }
  };

  return (
    <Dialog open={isOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setIsOpen(true)}>
          Edit Student
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Student</DialogTitle>
        </DialogHeader>
        <FormStudent
          formData={formData}
          onInputChange={handleInputChange}
          setFormData={setFormData}
        />
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
            Close
          </Button>
          <Button type="button" onClick={handleSubmit}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
