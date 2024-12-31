import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { RegistrationProcess } from "~/interfaces/registration-processes.interface";
import { Label } from "../../components/ui/label";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { useRegistrationProcesses } from "~/context/registration_process-context";
import { Skeleton } from "~/components/ui/skeleton";

export function RegistrationProcessDetail() {
  const {
    selectedProcessId,
    isDetailDialogOpen,
    getOneProcess,
    setDetailDialogOpen,
  } = useRegistrationProcesses();
  const [process, setProcess] = useState<RegistrationProcess | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedProcessId) {
      setProcess(null);
      setLoading(true);
      const fetchProcess = async () => {
        const fetchedProcess = await getOneProcess(selectedProcessId);
        setProcess(fetchedProcess || null);
        setLoading(false);
      };
      fetchProcess();
    } else {
      setProcess(null);
      setLoading(false);
    }
  }, [selectedProcessId, getOneProcess]);

  return (
    <Dialog open={isDetailDialogOpen} onOpenChange={setDetailDialogOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Process Details</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {loading ? (
            <>
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="grid grid-cols-4 items-center gap-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-8 col-span-3 w-full" />
                </div>
              ))}
              {Array.from({ length: 2 }).map((_, index) => (
                <div key={index} className="grid grid-cols-4 items-center gap-4">
                  <Skeleton className="h-4 w-full" />
                  <div className="col-span-3 flex items-center gap-2">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                </div>
              ))}
            </>
          ) : process ? (
            <>
              {[
                { id: "name", label: "Name" },
                { id: "description", label: "Description" },
              ].map(({ id, label }) => (
                <div key={id} className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor={id} className="text-right">
                    {label}
                  </Label>
                  <p id={id} className="col-span-3 border rounded p-2">
                    {(process as any)[id] || "N/A"}
                  </p>
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
                  <div className="col-span-3 flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4" />
                    <p id={id}>
                      {process[id as keyof RegistrationProcess]
                        ? format(
                            new Date(
                              process[id as keyof RegistrationProcess] as Date
                            ),
                            "PPP"
                          )
                        : "N/A"}
                    </p>
                  </div>
                </div>
              ))}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Status
                </Label>
                <p id="status" className="col-span-3 border rounded p-2">
                  {process.status ? "Active" : "Inactive"}
                </p>
              </div>
            </>
          ) : (
            <div className="p-4 text-center">No details available</div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
