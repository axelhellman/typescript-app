import React from 'react';
import { Project } from './Project';
import { Link } from 'react-router-dom'

interface ProjectCardProps{
  project: Project;
  onEdit: (project: Project) => void;
}

function ProjectCard(props: ProjectCardProps){
  const { project, onEdit } = props;
  const handleEditClick = (projectBeingEdited: Project) =>{
    onEdit(projectBeingEdited)
  }
  return(
      <div className="card">
        <img className="card--img" src={project.imageUrl} alt="project name" />
          <section className="section dark">
            <Link to={'/projects/' + project.id}>
            <h5 className="strong">
              <strong>{project.name}</strong>
            </h5>
            <p>{project.description}</p>
            <p>Budget: {project.budget}</p>
            </Link>
            <button className="card--button" onClick={() => {handleEditClick(project)}}>
              Edit
            </button>
          </section>
      </div>
  )
}
export default ProjectCard;
