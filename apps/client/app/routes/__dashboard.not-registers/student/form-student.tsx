import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { PopoverContent } from '~/components/ui/popover';
import { Popover } from '~/components/ui/popover';
import { Calendar } from "~/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { PopoverTrigger } from '~/components/ui/popover';
import { Button } from '~/components/ui/button';
import { cn } from "~/lib/utils";
import { format } from "date-fns";
import React from "react";
import { Student } from "~/interfaces/students.interface";
import { Label } from "~/components/ui/label";
import { Input } from '~/components/ui/input';

interface FormStudentProps {
  formData: Student;
  onInputChange: (e: any) => void;
  setFormData: React.Dispatch<React.SetStateAction<Student>>;
  setImage: React.Dispatch<React.SetStateAction<File | null>>;
  isEditable: boolean;
}

export function FormStudent({
  formData,
  onInputChange,
  setFormData,
  setImage,
  isEditable,
}: FormStudentProps) {
  const [birthdate, setBirthdate] = React.useState<Date | undefined>(
    formData.birthdate
  );

  return (
    <div className="flex flex-col gap-4 w-full h-auto">
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
        { id: "email", label: "Email", type: "email", placeholder: "Enter email" },
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
            className="col-span-3 border rounded p-2"
            disabled={!isEditable}
          />
        </div>
      ))}

      {/* Birthdate */}
      <div className="grid grid-cols-4 w-full items-center gap-4">
        <label htmlFor="birthdate" className="text-right">
          Birthdate
        </label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-[280px] justify-start text-left font-normal",
                !birthdate && "text-muted-foreground"
              )}
              disabled={!isEditable}
            >
              <CalendarIcon />
              {birthdate ? format(birthdate, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={birthdate}
              onSelect={(date) => {
                setBirthdate(date);
                setFormData((prev: Student) => ({
                  ...prev,
                  birthdate: date || new Date(),
                }));
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Gender */}
      <div className="grid grid-cols-4 w-full items-center gap-4">
        <label htmlFor="gender" className="text-right">
          Gender
        </label>
        <Select
          value={formData.gender}
          onValueChange={(value) =>
            setFormData((prev : any) => ({
              ...prev,
              gender: value as "male" | "female" | "other",
            }))
          }
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

      {/* Image */}
      <div>
        <div className="grid grid-cols-4 w-full items-center gap-4">
          <label htmlFor="image" className="text-right">
            Image
          </label>
          <input
            id="image"
            type="file"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            accept="image/*"
            className="col-span-3 border rounded p-2"
            disabled={!isEditable}
          />
        </div>
      </div>
    </div>
  );
}
