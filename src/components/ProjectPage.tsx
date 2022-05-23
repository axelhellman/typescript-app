import React from 'react'
import {MOCK_PROJECTS} from './MockProjects'
import ProjectList from './ProjectList'
import { Project } from './Project'
import { projectAPI } from './projectAPI'
//parent 
function ProjectPage(){
  const [projects, setProjects] = React.useState<Project[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | undefined>(undefined);
  const [currentPage, setCurrentPage] = React.useState(1);

  React.useEffect(() => {
    async function fetchProjects(){
      setLoading(true);
      try  {
        const data = await projectAPI.get(currentPage);
        if(currentPage===1){
          setProjects(data)
        }else{
          setProjects((projects)=> [...projects, ...data])
        }
      }
      catch(e){
        if (e instanceof Error){
          setError(e.message);
        }
      }
      finally{
        setLoading(false);
      }
      }
      fetchProjects()
    }, [currentPage] )

  const saveProject = (project:Project) => {
    projectAPI.put(project)
    .then((updatedProject) => {
      let updatedProjects = projects.map((p:Project)=> {
        return p.id === project.id ? new Project(updatedProject) : p;
      })
      setProjects(updatedProjects)
    })
    .catch((e)=> {
      if(e instanceof Error){
        setError(e.message)
      }
    })
  }
/*
  const handlePageIncrementClick = () => {
    setCurrentPage(currentPage => currentPage + 1)
  }
  */
  function handlePageIncrementClick(){
    setCurrentPage((currentPage) => currentPage + 1)
  }

  return (
    <>
    <h1>ProjectPage</h1>
    {
      error && (
        <div className="row">
          <div className="card large error">
            <section>
              <p>
                <span className="icon-alert inverse "></span>
                  {error}
              </p>
            </section>
          </div>
        </div>
      )

    }
    <ProjectList
    onSave={saveProject}
    projects={projects} />
    {
      !loading && !error && (
        <div className="row">
          <div className="col-sm-12">
            <div className="button--increment_container">
              <button className="button-default" onClick={handlePageIncrementClick}>
              More...
              </button>
             </div>
          </div>
        </div>
      )
    }
    {
      loading && (
        <div className="center--page">
          <span className="spinner--primary"></span>
          <p>Loading </p>
        </div>
      )
    }
    </>
  )

} export default ProjectPage;
