import Register from "./Register";
import ProjectsSideBar from "./todo-app/ProjectsSideBar";

const Layout = (props) => {
    console.log(props)
  return (
    <>
      <ProjectsSideBar
        projects={props.projects}
        onSelectProject={props.onSelectProject}
        selectedProjectId={props.selectedProjectId}
        onStartAddProject={props.onStartAddProject}
      />
      {props.children}
    </>
  );
};
export default Layout;
