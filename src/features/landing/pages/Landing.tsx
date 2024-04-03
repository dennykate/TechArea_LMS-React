// import React from "react";

import {
  About,
  Class,
  Contact,
  Announcement,
  Footer,
  Home,
  Marketing,
  Teacher,
  TopButton,
  Event,
} from "../components";

import Location from "../components/Location";

const Landing = () => {
  return (
    <div>
      <Home />
      <About />
      <Contact />
      <Class />
      <Marketing />
      <Teacher />
      <Announcement />
      <Event />
      <Location />
      <TopButton />
      <Footer />
    </div>
  );
};

export default Landing;
