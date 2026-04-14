import { experienceData } from "../Func/ExperienceData";

export default function Experience() {
  return (
    <section className="box2 expertise" id="experience">
      <h1 className="h1">Professional Experience</h1>
      <div className="experienceList">
        {experienceData.map((exp, index) => (
          <div className="experienceItem card" key={index}>
            <h2 className="z2">
              {exp.company}
            </h2>

            <div className="companyDetails z2">
              {exp.location && (
                <div className="companyData">
                  <i className="fa-solid fa-location-dot"></i>
                  <span>{exp.location}</span>
                </div>
              )}

              {exp.link && (
                <div className="companyData">
                  <i className="fa-solid fa-link"></i>
                  <span>
                    <a href={exp.link} target="_blank">
                      {exp.link.replace("https://", "")}
                    </a>
                  </span>
                </div>
              )}

              <div className="companyData">
                <i className="fa-solid fa-calendar-days"></i>
                <span>{exp.duration}</span>
              </div>
            </div>

            <div className="detailsAndLogo z2">
              <p>{exp.description}</p>
              <img src={exp.logo} alt={exp.company} />
            </div>

            <ul className="skillsList z2">
              {exp.skills.map((skill, i) => (
                <li key={i}>{skill}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}