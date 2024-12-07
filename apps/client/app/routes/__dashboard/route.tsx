import { SidebarProvider } from "../../components/ui/sidebar"
import { AppSidebar } from "../../components/app-sidebar"
import { Outlet } from "@remix-run/react"
import AppNavbar from "~/components/app-navbar"
import { useAuth } from "~/context/auth-context"

export default function Layout() {
  const { user } = useAuth()

  return (
    <SidebarProvider>
      <AppSidebar user={user}/>
      <main className="p-4 flex flex-col gap-4 w-full">
        <AppNavbar />
        <Outlet />
      </main>
    </SidebarProvider>
  )
}
