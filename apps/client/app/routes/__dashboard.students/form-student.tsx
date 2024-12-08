import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Student } from "~/interfaces/students.interface";

interface FormStudentProps {
  formData: Student;
  onInputChange: (e: any) => void;
  setFormData: React.Dispatch<React.SetStateAction<Student>>;
}

export function FormStudent({
  formData,
  onInputChange,
  setFormData,
}: FormStudentProps) {
  return (
    <div className="grid gap-4 py-4">
      {[
        {
          id: "code",
          label: "Code",
          type: "text",
          placeholder: "Enter student code",
        },
        { id: "name", label: "Name", type: "text", placeholder: "Enter name" },
        {
          id: "last_name",
          label: "Last Name",
          type: "text",
          placeholder: "Enter last name",
        },
        { id: "dni", label: "DNI", type: "text", placeholder: "Enter DNI" },
        {
          id: "email",
          label: "Email",
          type: "email",
          placeholder: "Enter email",
        },
        {
          id: "address",
          label: "Address",
          type: "text",
          placeholder: "Enter address",
        },
        {
          id: "phoneNumber",
          label: "Phone",
          type: "tel",
          placeholder: "Enter phone number",
        },
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
        <Label htmlFor="birthdate" className="text-right">
          Birthdate
        </Label>
        <Input
          id="birthdate"
          type="date"
          value={formData.birthdate.toISOString().split("T")[0]}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              birthdate: new Date(e.target.value),
            }))
          }
          className="col-span-3"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="gender" className="text-right">
          Gender
        </Label>
        <Select
          value={formData.gender}
          onValueChange={(value) =>
            setFormData((prev) => ({ ...prev, gender: value as "male" | "female" | "other" }))
          }
        >
          <SelectTrigger className="w-auto">
            <SelectValue placeholder="Select gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="female">Female</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
