import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { RegistrationProcess } from "~/interfaces/registration-processes.interface";
import { Label } from "../../components/ui/label";
import { useRegistrationProcesses } from "~/context/registration_process-context";
import { Textarea } from "~/components/ui/textarea";
import { Button } from "../../components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Calendar as CalendarIcon } from "lucide-react";
import { format, parseISO } from "date-fns";
import { Input } from "~/components/ui/input";

export function RegistrationProcessEdit() {
  const {
    selectedProcessId,
    isEditDialogOpen,
    getOneProcess,
    updateOneProcess,
    setEditDialogOpen,
  } = useRegistrationProcesses();
  const [process, setProcess] = useState<RegistrationProcess | null>(null);
  const [formData, setFormData] = useState<Partial<RegistrationProcess>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedProcessId) {
      setProcess(null);
      setLoading(true);
      const fetchProcess = async () => {
        const fetchedProcess = await getOneProcess(selectedProcessId);
        setProcess(fetchedProcess || null);
        setFormData(fetchedProcess || {});
        setLoading(false);
      };
      fetchProcess();
    } else {
      setProcess(null);
      setLoading(false);
    }
  }, [selectedProcessId, getOneProcess]);

  const handleDateChange = (key: keyof RegistrationProcess, date: Date | undefined) => {
    if (date) {
      setFormData((prev) => ({
        ...prev,
        [key]: date.toISOString(),
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedProcessId && formData) {
      try {
        await updateOneProcess(formData, selectedProcessId);
        setEditDialogOpen(false);
      } catch (error) {
        console.error("Error updating process:", error);
      }
    }
  };

  return (
    <Dialog open={isEditDialogOpen} onOpenChange={setEditDialogOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Process</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          {loading ? (
            <div className="p-4 text-center">Loading...</div>
          ) : process ? (
            <>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="col-span-3 border rounded p-2"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                    Description
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="col-span-3 border rounded p-2"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="startDate" className="text-right">
                  Start Date
                </Label>
                <div className="col-span-3">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full text-left"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.startDate
                          ? format(parseISO(formData.startDate.toString()), "PPP")
                          : "Pick a start date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-2">
                      <Calendar
                        mode="single"
                        selected={
                          formData.startDate
                            ? parseISO(formData.startDate.toString())
                            : undefined
                        }
                        onSelect={(date) => handleDateChange("startDate", date)}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="endDate" className="text-right">
                  End Date
                </Label>
                <div className="col-span-3">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full text-left"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.endDate
                          ? format(parseISO(formData.endDate.toString()), "PPP")
                          : "Pick an end date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-2">
                      <Calendar
                        mode="single"
                        selected={
                          formData.endDate
                            ? parseISO(formData.endDate.toString())
                            : undefined
                        }
                        onSelect={(date) => handleDateChange("endDate", date)}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setEditDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Save Changes</Button>
              </div>
            </>
          ) : (
            <div className="p-4 text-center">No details available</div>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}
