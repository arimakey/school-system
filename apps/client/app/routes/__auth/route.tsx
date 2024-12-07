import { Outlet } from "@remix-run/react"
import { Toaster } from 'react-hot-toast';

function route() {

  
  return (
    <>
      <Toaster
        position="bottom-right"
        reverseOrder={false}
      />
      <Outlet />
    </>
  )
}

export default route