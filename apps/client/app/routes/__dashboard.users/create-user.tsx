import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog";
import { FormUser } from "./form-user";
import { User } from "~/interfaces/user.interface";
import toast from "react-hot-toast";
import { useUsers } from "~/context/users-context";

export function CreateUser() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<User>({
    _id: "",
    email: "",
    username: "",
    image: "",
    role: "",
  });

  const { addUser } = useUsers();

  const handleInputChange = (e: any) => {
    const { id, value } = e.target;
    setFormData((prev: User) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await toast.promise(
        addUser(formData),
        {
          loading: "Saving...",
          success: <b>El usuario se creó exitosamente!</b>,
          error: (err) => `${err.toString()}`,
        }
      );
      setIsOpen(false);
    } catch (error) {
      console.error("Error al crear usuario:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setIsOpen(true)}>Create User</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create User</DialogTitle>
        </DialogHeader>
        <FormUser formData={formData} onInputChange={handleInputChange} setFormData={setFormData} />
        <DialogFooter>
          <Button type="button" onClick={() => setIsOpen(false)}>
            Close
          </Button>
          <Button type="button" onClick={handleSubmit}>
            Create User
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
