import React from "react";
import Expertise from "../Expertise/Expertise";
import Hero from "./Hero";
import Projects from "../Projects/Projects";
import Experience from "../Experiance/Experience";
export default function Home() {
  return (
    <React.Fragment>
      <Hero />
      <Expertise />
      <Projects/>
      <Experience/>
    </React.Fragment>
  );
}
