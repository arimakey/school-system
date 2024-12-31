import React from "react";
import { Input } from "~/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { Guardian } from "~/interfaces/guardian.interface";
import { Label } from '~/components/ui/label';

interface FormGuardianProps {
  formData: Guardian;
  onInputChange: (e: any) => void;
  setFormData: React.Dispatch<React.SetStateAction<Guardian>>;
  isEditable: boolean;
}

export function FormGuardian({
  formData,
  onInputChange,
  setFormData,
  isEditable,
}: FormGuardianProps) {
  const [gender, setGender] = React.useState<string | undefined>(formData.gender);

  return (
    <div className="grid gap-4">
      {[
        { id: "name", label: "Name", type: "text", placeholder: "Enter name" },
        {
          id: "last_name",
          label: "Last Name",
          type: "text",
          placeholder: "Enter last name",
        },
        {
          id: "email",
          label: "Email",
          type: "email",
          placeholder: "Enter email",
        },
        {
          id: "phoneNumber",
          label: "Phone",
          type: "tel",
          placeholder: "Enter phone number",
        },
        {
          id: "address",
          label: "Address",
          type: "text",
          placeholder: "Enter address",
        },
        {
          id: "occupation",
          label: "Occupation",
          type: "text",
          placeholder: "Enter occupation",
        },
      ].map(({ id, label, type, placeholder }) => (
        <div key={id} className="grid grid-cols-4 w-full items-center gap-4">
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
            disabled={!isEditable}
          />
        </div>
      ))}

      <div className="grid grid-cols-4 w-full items-center gap-4">
        <Label htmlFor="gender" className="text-right">
          Gender
        </Label>
        <Select
          value={gender}
          onValueChange={(value) => {
            setGender(value);
            setFormData((prev) => ({
              ...prev,
              gender: value as "male" | "female" | "other",
            }));
          }}
          disabled={!isEditable}
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
