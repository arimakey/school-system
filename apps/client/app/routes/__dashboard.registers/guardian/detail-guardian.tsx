import { Label } from "~/components/ui/label";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Guardian } from "~/interfaces/guardian.interface";

interface GuardianProps {
  guardian: Guardian | null;
}

export function DetailGuardian({ guardian }: GuardianProps) {
  if (guardian === null) return <></>;

  return (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="dni" className="text-right">
          DNI
        </Label>
        <p id="dni" className="col-span-3 border rounded p-2 text-sm">
          {guardian.dni || "N/A"}
        </p>
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Name
        </Label>
        <p id="name" className="col-span-3 border rounded p-2 text-sm">
          {guardian.name || "N/A"} {guardian.last_name || "N/A"}
        </p>
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="email" className="text-right">
          Email
        </Label>
        <p id="email" className="col-span-3 border rounded p-2 text-sm">
          {guardian.email || "N/A"}
        </p>
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="phoneNumber" className="text-right">
          Phone Number
        </Label>
        <p id="phoneNumber" className="col-span-3 border rounded p-2 text-sm">
          {guardian.phoneNumber || "N/A"}
        </p>
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="address" className="text-right">
          Address
        </Label>
        <p id="address" className="col-span-3 border rounded p-2 text-sm">
          {guardian.address || "N/A"}
        </p>
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="occupation" className="text-right">
          Occupation
        </Label>
        <p id="occupation" className="col-span-3 border rounded p-2 text-sm">
          {guardian.occupation || "N/A"}
        </p>
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="gender" className="text-right">
          Gender
        </Label>
        <p id="gender" className="col-span-3 border rounded p-2 text-sm">
          {guardian.gender || "N/A"}
        </p>
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="isActive" className="text-right">
          Active Status
        </Label>
        <p id="isActive" className="col-span-3 border rounded p-2 text-sm">
          {guardian.isActive ? "Active" : "Inactive"}
        </p>
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="createdAt" className="text-right">
          Created At
        </Label>
        <div className="col-span-3 flex items-center gap-2 text-sm">
          <CalendarIcon className="h-4 w-4" />
          <p id="createdAt">
            {guardian.createdAt
              ? format(new Date(guardian.createdAt), "PPP")
              : "N/A"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="updatedAt" className="text-right">
          Updated At
        </Label>
        <div className="col-span-3 flex items-center gap-2 text-sm">
          <CalendarIcon className="h-4 w-4" />
          <p id="updatedAt">
            {guardian.updatedAt
              ? format(new Date(guardian.updatedAt), "PPP")
              : "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
}
