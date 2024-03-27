import "../App.css";
//Registration and login components

//todo-app components

import { useState } from "react";
import SelectedProject from "./todo-app/SelectedProject";
import NoProjectSelected from "./todo-app/NoProjectSelected";
import NewProject from "./todo-app/NewProject";
import Layout from "./Layout";

const AppPage = () => {
    const [projectState, setProjectsState] = useState({
      selectedProjectId: undefined,
      projects: [],
      tasks: [],
    });
  
    function handleAddTask(text) {
      setProjectsState((prevState) => {
        const taskId = Math.random();
        const newTask = {
          text: text,
          projectId: prevState.selectedProjectId,
          id: taskId,
        };
        return {
          ...prevState,
          tasks: [...prevState.tasks, newTask],
        };
      });
    }
  
    function handleDeleteTask(id) {
      setProjectsState((prevState) => {
        return {
          ...prevState,
          tasks: prevState.tasks.filter((task) => task.id !== id),
        };
      });
    }
  
    function handleSelectProject(id) {
      setProjectsState((prevState) => {
        return {
          ...prevState,
          selectedProjectId: id,
        };
      });
    }
    const handleStartAddProject = () => {
      setProjectsState((prevState) => {
        return {
          ...prevState,
          selectedProjectId: null,
        };
      });
    };
  
    function handleAddProject(projectData) {
      setProjectsState((prevState) => {
        const projectId = Math.random();
        const newProject = {
          ...projectData,
          id: projectId,
        };
        return {
          ...prevState,
          selectedProjectId: undefined,
          projects: [...prevState.projects, newProject],
        };
      });
    }
  
    function handleCancelProject() {
      setProjectsState((prevState) => {
        return {
          ...prevState,
          selectedProjectId: undefined,
        };
      });
    }
  
    function handleDeleteProject() {
      setProjectsState((prevState) => {
        return {
          ...prevState,
          selectedProjectId: undefined,
          projects: prevState.projects.filter(
            (project) => project.id !== prevState.selectedProjectId
          ),
        };
      });
    }
    const selectedProject = projectState.projects.find(
      (project) => project.id === projectState.selectedProjectId
    );
  
    //switching components 
    //case null when there are no projects
    //case undefined when there is a project
    //default when there is a project with tasks and id
    const getComponent = (projectId) => {
      switch (projectId) {
        case null:
          return (
            <NewProject onAdd={handleAddProject} onCancel={handleCancelProject} />
          );
        case undefined:
          return <NoProjectSelected onStartAddProject={handleStartAddProject} />;
        default:
          return (
            <SelectedProject
              project={selectedProject}
              onDelete={handleDeleteProject}
              onAddTask={handleAddTask}
              onDeleteTask={handleDeleteTask}
              tasks={projectState.tasks}
            />
          );
      }
    };
  
    return (
      <div className="flex">
      {/**Always showing the layout */}
        <Layout
          projects={projectState.projects}
          onSelectProject={handleSelectProject}
          selectedProjectId={projectState.selectedProjectId}
          onStartAddProject={handleStartAddProject}
        >
          {getComponent(projectState.selectedProjectId)}
        </Layout>
      </div>
    );
  };

  export default AppPage