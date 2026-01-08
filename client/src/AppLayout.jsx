
import { Link, Outlet } from "react-router";





export function AppLayout() {
  
  return (
    <>
      <header>
        <Link to={"/"}>Where's Waldo</Link>
      </header>

      <Outlet />

      
    </>
  );
}
