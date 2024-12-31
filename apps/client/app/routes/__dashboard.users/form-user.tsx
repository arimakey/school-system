import { User } from "~/interfaces/user.interface";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

interface FormUserProps {
  formData: User;
  onInputChange: (e: any) => void;
  setFormData: React.Dispatch<React.SetStateAction<User>>;
}

export function FormUser({
  formData,
  onInputChange,
  setFormData,
}: FormUserProps) {
  return (
    <div className="grid gap-4 py-4">
      {[
        {
          id: "username",
          label: "Username",
          type: "text",
          placeholder: "Enter username",
        },
        {
          id: "email",
          label: "Email",
          type: "email",
          placeholder: "Enter email",
        }
      ].map(({ id, label, type, placeholder }) => (
        <div key={id} className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor={id} className="text-right">
            {label}
          </Label>
          <Input
            id={id}
            type={type}
            value={(formData as any)[id] || ""}
            onChange={onInputChange}
            placeholder={placeholder}
            className="col-span-3"
          />
        </div>
      ))}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="role" className="text-right">
          Role
        </Label>
        <Select
          value={formData.role || ""}
          onValueChange={(value) =>
            setFormData((prev) => ({ ...prev, role: value }))
          }
        >
          <SelectTrigger className="w-auto">
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Director">Director</SelectItem>
            <SelectItem value="Apoderado">Apoderado</SelectItem>
            <SelectItem value="Secretario">Secretario</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
