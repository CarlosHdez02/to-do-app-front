import { Outlet} from "react-router-dom";

const Layout = ()=>{
    return(
        <main className="">
            {/*}All the children of layout component{*/}
            <Outlet />
        </main>
    )
}
export default Layout;