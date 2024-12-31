import { ClassroomProvider } from "~/context/classrooms-context"
import { CreateLevel } from "./create-level"
import { CreateGrade } from "./create-grade"
import { CreateSection } from "./create-section"
import SectionsView from "./view-classrooms"
import DeleteSection from "./delete-section"

function route() {

  return (
    <ClassroomProvider>
        <CreateLevel />
        <CreateGrade />
        <CreateSection />
        <SectionsView />
        <DeleteSection />
    </ClassroomProvider>
  )
}

export default route