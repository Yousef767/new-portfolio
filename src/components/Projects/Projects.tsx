import { useState } from "react";
import { projectsData } from "../Func/ProjectsData";

export default function Projects() {
  const projectsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(projectsData.length / projectsPerPage);

  const startIndex = (currentPage - 1) * projectsPerPage;
  const currentProjects = projectsData.slice(
    startIndex,
    startIndex + projectsPerPage,
  );

  const scrollToProjects = () => {
    const section = document.getElementById("projects");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="box2 expertise projects" id="projects">
      <h1 className="h1">My Projects</h1>
      <p className="p">
        Developed scalable company portfolios, e-commerce platforms, and admin
        dashboards using React (SPA & PWA). Collaborated on 90+ projects with
        40+ clients worldwide, With a growing interest in networking, system
        troubleshooting, and PC maintenance.
      </p>

      <div className="projectsList">
        {currentProjects.map((project, index) => (
          <a
            href={project.link}
            className="projectItem hoverEffect"
            key={index}
            target="_blank"
          >
            <img src={project.img} alt={project.title} loading="lazy"/>
            <div className="itemDetails projectItemDetails">
              <h2>{project.title}</h2>
              <p>{project.description}</p>
              <span></span>
            </div>
          </a>
        ))}
      </div>

      <div className="pagination">
        <button
          onClick={() => {
            setCurrentPage((prev) => prev - 1);
            scrollToProjects();
          }}
          disabled={currentPage === 1}
        >
          <i className="fas fa-chevron-left"></i>
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            className={currentPage === i + 1 ? "active" : ""}
            onClick={() => {
              setCurrentPage(i + 1);
              scrollToProjects();
            }}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => {
            setCurrentPage((prev) => prev + 1);
            scrollToProjects();
          }}
          disabled={currentPage === totalPages}
        >
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>
    </section>
  );
}
