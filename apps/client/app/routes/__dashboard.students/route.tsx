import { AppTable } from "~/components/app-table"
import { columns } from "./students-columns"
import students from './../../data/students';

function page() {

  return (
    <AppTable columns={columns} data={students} />
  )
}

export default page 