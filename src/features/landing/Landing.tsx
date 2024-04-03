// import React from "react";

import {
  About,
  Class,
  Contact,
  Footer,
  Home,
  Marketing,
  Teacher,
  TopButton,
} from "./components";
import Location from "./components/Location";

const Landing = () => {
  return (
    <div>
      <Home />
      <About />
      <Contact />
      <Class />
      <Marketing />
      <Teacher />
      {/* <DailyUpdate /> */}
      {/* <Subscribe /> */}
      <Location />
      <Footer />
      <TopButton />
    </div>
  );
};

export default Landing;
