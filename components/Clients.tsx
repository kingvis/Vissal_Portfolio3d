"use client";

import React from "react";
import Image from "next/image";

import { companies, testimonials } from "@/data";
import { InfiniteMovingCards } from "./ui/InfiniteCards";

const Clients = () => {
  return (
    <section id="testimonials" className="py-20">
      <h1 className="heading">
        Milestones That Define My Journey
      </h1>

      <div className="flex flex-col items-center max-lg:mt-10">
        <div
          // remove bg-white dark:bg-black dark:bg-grid-white/[0.05], h-[40rem] to 30rem , md:h-[30rem] are for the responsive design
          className="h-[50vh] md:h-[30rem] rounded-md flex flex-col antialiased  items-center justify-center relative overflow-hidden"
        >
          <InfiniteMovingCards
            items={testimonials}
            direction="right"
            speed="slow"
          />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-16 max-lg:mt-10">
          {companies.map((company, idx) => (
            <React.Fragment key={company.id}>
              <div className="flex md:max-w-60 max-w-32 gap-2 items-center">
                <Image
                  src={company.img}
                  alt={company.name}
                  width={40}
                  height={40}
                  className="md:w-10 w-10 h-10 object-contain"
                />
                {idx === 0 ? (
                  <span className="text-white font-semibold text-lg md:text-xl">Cursor</span>
                ) : idx === 1 ? (
                  <span className="text-white font-semibold text-lg md:text-xl">GitHub Copilot</span>
                ) : idx === 2 ? (
                  <span className="text-white font-semibold text-lg md:text-xl">OpenAI</span>
                ) : idx === 3 ? (
                  <span className="text-white font-semibold text-lg md:text-xl">Windsurf</span>
                ) : idx === 4 ? (
                  <span className="text-white font-semibold text-lg md:text-xl">Gemini</span>
                ) : (
                  <Image
                    src={company.nameImg}
                    alt={company.name}
                    width={company.id === 4 || company.id === 5 ? 100 : 150}
                    height={company.id === 4 || company.id === 5 ? 100 : 150}
                    className="md:w-24 w-20"
                  />
                )}
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Clients;
