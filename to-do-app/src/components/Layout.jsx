import { Outlet} from "react-router-dom";
import Register from "./Register";

const Layout = ()=>{
    return(
        <main className="">
            {/*}All the children of layout component{*/}
          
            
            <Outlet />
        </main>
    )
}
export default Layout;