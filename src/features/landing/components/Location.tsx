import React from "react";
import { title } from "../data";
import { twMerge } from "tailwind-merge";

const Location = () => {
  return (
    <section id="location" className="sm:px-5 px-0 pb-28 mx-auto ">
      <h1 className={twMerge("text-center sm:mb-8 mb-4", title)}>
        Our Location
      </h1>
      <div className="w-full md:h-[500px] sm:h-[400px] h-[300px]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3817.501817608702!2d96.10379377367649!3d16.90052111665111!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30c195b38bef2e1b%3A0x1b5fbac4a8648c9!2zYm9nb25l4YCX4YCt4YCv4YCc4YC64YCA4YCv4YCU4YC64YC4IOGAmeGAvuGAkOGAuuGAkOGAreGAr-GAhOGAug!5e0!3m2!1sen!2smm!4v1712072617294!5m2!1sen!2smm"
          width={"100%"}
          height="100%"
          style={{ border: 0,outline: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </section>
  );
};

export default Location;
