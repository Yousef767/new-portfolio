import { easeInOut, motion } from "motion/react";
import { experienceData } from "../Func/ExperienceData";
import FramerDiv from "../Func/FramerDiv";
import H1 from "../Func/H1";
const item = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.95,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: easeInOut,
    },
  },
};
export default function Experience() {
  return (
    <section className="box2 expertise" id="experience">
      <H1 text="My Experience" />
      <FramerDiv className="experienceList">
        {experienceData.map((exp, index) => (
          <motion.div
            className="experienceItem card"
            key={index}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.3 }}
            variants={item}
            tabIndex={0}
          >
            <h2 className="z2">{exp.company}</h2>

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
          </motion.div>
        ))}
      </FramerDiv>
    </section>
  );
}
