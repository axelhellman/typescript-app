import React from 'react';
import { Project } from './Project';

interface ProjectFormProps {
  project: Project;
  onCancel: () => void
  onSave: (project:Project) => void;
}


function ProjectForm({ project: initialProject, onCancel, onSave }: ProjectFormProps) {
  const [project, setProject] = React.useState(initialProject);
  const [errors, setErrors] = React.useState({
    name: '',
    description: '',
    budget: '',
  })

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    if(!isValid()) return;
    onSave(project);
  }


  function validate(project:Project) {
      let errors:any = {name: '', description:'', budget:''};
      if (project.name.length === 0) {
        errors.name = 'Name is required';
      }
      if (project.name.length > 0 && project.name.length < 3) {
        errors.name = 'Name needs to be at least 3 characters.';
      }
      if (project.description.length === 0) {
        errors.description = 'Description is required.';
      }
      if (project.budget === 0) {
        errors.budget = 'Budget must be more than $0.';
      }
      return errors;
    }

  function isValid(){
    return (
      errors.name.length === 0 &&
      errors.description.length === 0 &&
      errors.budget.length === 0
    )
  }


  const handleChange = (event: any) => {
    const { type, name, value, checked } = event.target;

    let updatedValue = type === 'checkbox' ? checked : value;


    if (type === 'number') {
      updatedValue = Number(updatedValue);
    }
    const change = {
      [name]: updatedValue,
    };

    let updatedProject: Project;

    setProject((p) => {
      updatedProject = new Project({ ...p, ...change });
      return updatedProject;
    });
    setErrors(() => validate(updatedProject))
  };

  return(
    <form className="input-group vertical" onSubmit={handleSubmit}>
     <label htmlFor="name">Project Name</label>

     <input type="text"
     name="name"
     placeholder="enter name"
     value={project.name}
     onChange={handleChange}/>
     {errors.name.length > 0  && (
       <div className="error--card">
       <p>{errors.name}</p>
       </div>
     )}
     <label htmlFor="description">Project Description</label>

     <textarea name="description"
     placeholder="enter description"
     value={project.description}
     onChange={handleChange}/>
     {errors.description.length > 0  && (
       <div className="error--card">
       <p>{errors.description}</p>
       </div>
     )}
     <label className="form--checkbox_label" htmlFor="budget">Project Budget</label>

     <input type="number"
      name="budget"
      placeholder="enter budget"
      value={project.budget}
      onChange={handleChange}/>
      {errors.budget.length > 0  && (
        <div className="error--card">
        <p>{errors.budget}</p>
        </div>
      )}
     <label className="form--checkbox_label" htmlFor="isActive">Active?</label>

     <input className="form--checkbox"
     type="checkbox"
     name="isActive"
     checked={project.isActive}
     onChange={handleChange}/>

     <div className="input-group">

       <button
        className="primary--bordered_medium"
        >
        Save
       </button>

       <span />

       <button
        type="button"
        className="secondary--bordered_medium"
        onClick= {onCancel}>
        Cancel
       </button>

     </div>
   </form>
  )

} export default ProjectForm;
