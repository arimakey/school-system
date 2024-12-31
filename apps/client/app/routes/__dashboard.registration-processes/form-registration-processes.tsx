import { RegistrationProcess } from "~/interfaces/registration-processes.interface";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";

interface FormRegistrationProcessProps {
  formData: RegistrationProcess;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setFormData: React.Dispatch<React.SetStateAction<RegistrationProcess>>;
}

export function FormRegistrationProcess({
  formData,
  onInputChange,
  setFormData,
}: FormRegistrationProcessProps) {
  const handleDateChange = (field: keyof RegistrationProcess, date: Date | undefined) => {
    setFormData((prev) => ({
      ...prev,
      [field]: date || new Date(),
    }));
  };

  return (
    <div className="grid gap-4 py-4">
      {[
        {
          id: "name",
          label: "Name",
          type: "text",
          placeholder: "Enter process name",
        },
        {
          id: "description",
          label: "Description",
          type: "text",
          placeholder: "Enter description",
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
      {[
        { id: "startDate", label: "Start Date" },
        { id: "endDate", label: "End Date" },
      ].map(({ id, label }) => (
        <div key={id} className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor={id} className="text-right">
            {label}
          </Label>
          <div className="col-span-3">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData[id as keyof RegistrationProcess]
                    ? format(
                        new Date(formData[id as keyof RegistrationProcess] as Date),
                        "PPP"
                      )
                    : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="flex w-auto flex-col space-y-2 p-2">
                <div className="rounded-md border">
                  <Calendar
                    mode="single"
                    selected={
                      formData[id as keyof RegistrationProcess]
                        ? new Date(formData[id as keyof RegistrationProcess] as Date)
                        : undefined
                    }
                    onSelect={(date) => handleDateChange(id as keyof RegistrationProcess, date)}
                  />
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      ))}
    </div>
  );
}
