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
import toast from "react-hot-toast";
import { useRegistrationProcesses } from "~/context/registration_process-context";
import { FormRegistrationProcess } from "./form-registration-processes";
import { RegistrationProcess } from "~/interfaces/registration-processes.interface";

export function CreateRegistrationProcess() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<RegistrationProcess>({
    _id: "",
    name: "",
    description: "",
    status: false,
    startDate: new Date(),
    endDate: new Date(),
  });

  const { addOneProcess } = useRegistrationProcesses();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev: RegistrationProcess) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await toast.promise(
        addOneProcess(formData),
        {
          loading: "Saving...",
          success: <b>El proceso se creó exitosamente!</b>,
          error: (err) => `${err.toString()}`,
        }
      );
      setIsOpen(false);
      setFormData({
        _id: "",
        name: "",
        description: "",
        status: false,
        startDate: new Date(),
        endDate: new Date(),
      });
    } catch (error) {
      console.error("Error al crear proceso:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setIsOpen(true)}>
          Create Process
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create Registration Process</DialogTitle>
        </DialogHeader>
        <FormRegistrationProcess
          formData={formData}
          onInputChange={handleInputChange}
          setFormData={setFormData}
        />
        <DialogFooter>
          <Button type="button" onClick={() => setIsOpen(false)}>
            Close
          </Button>
          <Button type="button" onClick={handleSubmit}>
            Create Process
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
