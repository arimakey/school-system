import { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem
} from "~/components/ui/carousel";
import { CreateStudent } from "./student/create-student";
import { useRegisterSteps } from "~/context/register-steps-context";
import { CreateGuardian } from "./guardian/create-guardian";
import SectionsManager from "./classrooms/select-classroom";
import ProcessSelector from "./process/select-process";

export function CreateRegister() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);
  const { api, setApi } = useRegisterSteps()

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setIsOpen(true)}>
          Create Student
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-[600px]">
        <DialogTitle>
          Registro Matriculas
        </DialogTitle>
        <Carousel setApi={setApi} style={{ width: '85%', overflowY: 'visible' }}>
            <CarouselContent className="max-w-full">
              <CarouselItem>
                <CreateStudent />
              </CarouselItem>
              <CarouselItem>
                <CreateGuardian />
              </CarouselItem>
              <CarouselItem>
                <ProcessSelector />
              </CarouselItem>
              <CarouselItem>
                <SectionsManager setOpen={setIsOpen} />
              </CarouselItem>
            </CarouselContent>
          </Carousel>
      </DialogContent>
    </Dialog>
  );
}
