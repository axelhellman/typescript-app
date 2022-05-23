import React from 'react';
import { Project } from './Project'
import ProjectCard from './ProjectCard'
import ProjectForm from './ProjectForm'
//child to projectpage
interface ProjectListProps {
  projects: Project[];
  onSave: (project:Project) => void
}

function ProjectList({projects, onSave}: ProjectListProps) {
  const [projectBeingEdited, setprojectBeingEdited] = React.useState({});
  const handleEdit = (project: Project) => {
    setprojectBeingEdited(project)
  }
  const cancelEdit = () => {
    setprojectBeingEdited({})
  }

  return (
    <div className="row">
      {projects.map((project) =>(
        <div className="row--elements" key={project.id}>

        { project === projectBeingEdited ?
          (
            <ProjectForm
            onSave={onSave}
            onCancel={cancelEdit}
            project={project}/>
          ) :
          (
            <ProjectCard
            project={project}
            onEdit={handleEdit}/>
          )
        }
        </div>
      ))}

    </div>
  )
}

export default ProjectList;
