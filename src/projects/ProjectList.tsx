// jshint esversion:6
import React, { useState } from "react";
import { Project } from "./Project";
import ProjectCard from "./ProjectCard";
import ProjectForm from "./ProjectForm";

interface ProjectListProps {
  projects: Project[] | undefined;
  onSave(arg0: Project): void
}

function ProjectList({ projects, onSave }: ProjectListProps) {

  const [projectBeingEdited, setProjectBeingEdited] = useState({});

  function handleEdit(project: Project) {
    setProjectBeingEdited(project);
  }

  function cancelEditing() {
    setProjectBeingEdited({});
  }

  return (
    <ul className="row">
      {projects && projects.map((project) => {
        return (
          <React.Fragment key={project.id}>
            <div className="cols-sm" key={project.id}>
              {project === projectBeingEdited ? (
                <ProjectForm onCancel={cancelEditing} onSave={onSave} project={project} />
              ) : (
                <ProjectCard project={project} onEdit={handleEdit} />
              )}
            </div>
          </React.Fragment>
        )
      })}
    </ul>
  )

}

export default ProjectList;
