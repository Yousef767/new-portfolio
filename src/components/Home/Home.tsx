import React from "react";
import Expertise from "../Expertise/Expertise";
import Hero from "./Hero";
import Projects from "../Projects/Projects";
import Experience from "../Experience/Experience";
import Contact from "../Contact/Contact";
export default function Home() {
  return (
    <React.Fragment>
      <Hero />
      <Expertise />
      <Projects/>
      <Experience/>
      <Contact/>
    </React.Fragment>
  );
}
