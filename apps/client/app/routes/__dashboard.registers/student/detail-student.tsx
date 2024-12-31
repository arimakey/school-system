import { Student } from "~/interfaces/students.interface";
import { Label } from "~/components/ui/label";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

interface StudentProps {
  student: Student | null;
}

export function DetailStudent({ student }: StudentProps) {
  if (student === null) return <></>;

  return (
    <div className="grid gap-4 py-4 selection:border-none">
      {/* Sección de la imagen */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="image" className="text-right">
          Image
        </Label>
        <div className="col-span-3">
          {student.image ? (
            <img
              id="image"
              src={student.image}
              alt={`${student.name} ${student.last_name}`}
              className="w-32 h-32 object-cover rounded border"
            />
          ) : (
            <p className="text-sm text-muted">No image available</p>
          )}
        </div>
      </div>

      {/* Información del estudiante */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="code" className="text-right">
          Code
        </Label>
        <p id="code" className="col-span-3 border rounded p-2 text-sm">
          {student.code || "N/A"}
        </p>
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Name
        </Label>
        <p id="name" className="col-span-3 border rounded p-2 text-sm">
          {student.name || "N/A"} {student.last_name || "N/A"}
        </p>
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="dni" className="text-right">
          DNI
        </Label>
        <p id="dni" className="col-span-3 border rounded p-2 text-sm">
          {student.dni || "N/A"}
        </p>
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="email" className="text-right">
          Email
        </Label>
        <p id="email" className="col-span-3 border rounded p-2 text-sm">
          {student.email || "N/A"}
        </p>
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="birthdate" className="text-right">
          Birthdate
        </Label>
        <div className="col-span-3 flex items-center gap-2 text-sm">
          <CalendarIcon className="h-4 w-4" />
          <p id="birthdate">
            {student.birthdate
              ? format(new Date(student.birthdate), "PPP")
              : "N/A"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="address" className="text-right">
          Address
        </Label>
        <p id="address" className="col-span-3 border rounded p-2 text-sm">
          {student.address || "N/A"}
        </p>
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="phoneNumber" className="text-right">
          Phone Number
        </Label>
        <p id="phoneNumber" className="col-span-3 border rounded p-2 text-sm">
          {student.phoneNumber || "N/A"}
        </p>
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="enrollmentDate" className="text-right">
          Enrollment Date
        </Label>
        <div className="col-span-3 flex items-center gap-2 text-sm">
          <CalendarIcon className="h-4 w-4" />
          <p id="enrollmentDate">
            {student.enrollmentDate
              ? format(new Date(student.enrollmentDate), "PPP")
              : "N/A"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="gender" className="text-right">
          Gender
        </Label>
        <p id="gender" className="col-span-3 border rounded p-2 text-sm">
          {student.gender || "N/A"}
        </p>
      </div>
    </div>
  );
}
