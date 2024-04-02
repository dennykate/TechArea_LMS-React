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
      <Footer />

      <TopButton />
    </div>
  );
};

export default Landing;
