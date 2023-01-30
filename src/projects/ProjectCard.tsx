// jshint esversion:6
import { Project } from "./Project";
import { Link } from "react-router-dom";

// Interface for components
interface typeProject {
    project: Project;        // A Project Object
    onEdit(arg0: Project): void;   // This function requires a Project parameter and returns void
}

function formatDescription(data: string): string {
    return `${data.substring(0, 60)}...`;
}


function ProjectCard({ project, onEdit }: typeProject) {

    function handleEditClick(projectBeingEdited: Project) {
        onEdit(projectBeingEdited);
    }

    return (
        <div className="card">
            <img src={project.imageUrl} alt={project.name} />
            <section className="section dark">
                <Link to={`${project.id}`} >
                    <h5 className="strong">
                        <strong>{project.name}</strong>
                    </h5>
                    <p>{formatDescription(project.description)}</p>
                    <p> Budget: {project.budget.toLocaleString()} </p>
                </Link>
                <button className="bordered" onClick={() => {
                    handleEditClick(project)
                }}>
                    <span className="icon-edit"></span>
                    Edit
                </button>
            </section>
        </div>
    );
}

export default ProjectCard;