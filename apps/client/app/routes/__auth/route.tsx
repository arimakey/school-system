import { Outlet } from "@remix-run/react"
import { Toaster } from 'react-hot-toast';

function route() {
  return (
    <>
      <Outlet />
    </>
  )
}

export default route