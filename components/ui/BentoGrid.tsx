import { useState, useMemo } from "react";
import { IoCopyOutline } from "react-icons/io5";
import React, { useEffect, useRef } from "react";
import Image from "next/image";

// Also install this npm i --save-dev @types/react-lottie
import Lottie from "react-lottie";

import { cn } from "@/lib/utils";


import { BackgroundGradientAnimation } from "./GradientBg";
// import GridGlobe from "./GridGlobe";
import animationData from "@/data/confetti.json";
import MagicButton from "../MagicButton";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        // change gap-4 to gap-8, change grid-cols-3 to grid-cols-5, remove md:auto-rows-[18rem], add responsive code
        "grid grid-cols-1 md:grid-cols-6 lg:grid-cols-5 md:grid-row-7 gap-4 lg:gap-8 mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  id,
  title,
  description,
  //   remove unecessary things here
  img,
  imgClassName,
  titleClassName,
  spareImg,
}: {
  className?: string;
  id: number;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  img?: string;
  imgClassName?: string;
  titleClassName?: string;
  spareImg?: string;
}) => {
  //const leftLists: string[] = [];
  //const rightLists: string[] = [];

  const [copied, setCopied] = useState(false);

  const defaultOptions = {
    loop: copied,
    autoplay: copied,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const handleCopy = () => {
    const text = "vissalv@gmail.com";
    navigator.clipboard.writeText(text);
    setCopied(true);
  };

  return (
    <div
      className={cn(
        "row-span-1 relative overflow-hidden rounded-3xl border border-white/[0.1] group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none justify-between flex flex-col space-y-4",
        className
      )}
      style={{
        background: "rgb(4,7,29)",
        backgroundColor:
          "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
      }}
    >
      {/* Video as bottom layer for id 5 */}
      {id === 5 && (
        <video
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none blur-[3px] brightness-50 opacity-60 rounded-2xl"
          src="/coding-bg.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
      )}
      {/* add img divs, but for id 5, do not render image in background/absolute layers */}
      <div className={`${id === 6 && "flex justify-center"} h-full`}>
        {id !== 5 && (
          <>
            <div className="w-full h-full absolute">
              {img && (
                <Image
                  src={img}
                  alt={img}
                  width={100}
                  height={100}
                  className={cn(imgClassName, "object-cover object-center ")}
                />
              )}
            </div>
            <div
              className={`absolute right-0 -bottom-5 ${id === 5 && "w-full opacity-80"}`}
            >
              {spareImg && (
                <Image
                  src={spareImg}
                  alt={spareImg}
                  width={100}
                  height={100}
                  className="object-cover object-center w-full h-full"
                />
              )}
            </div>
          </>
        )}
        {id === 6 && (
          // add background animation , remove the p tag
          <BackgroundGradientAnimation>
            <div className="absolute z-50 inset-0 flex items-center justify-center text-white font-bold px-4 pointer-events-none text-3xl text-center md:text-4xl lg:text-7xl"></div>
          </BackgroundGradientAnimation>
        )}

        <div
          className={cn(
            titleClassName,
            id === 5
              ? "group-hover/bento:translate-x-2 transition duration-200 relative md:h-full min-h-40 flex flex-col px-5 p-5 lg:p-10 z-10 bg-black/60 rounded-2xl p-6"
              : "group-hover/bento:translate-x-2 transition duration-200 relative md:h-full min-h-40 flex flex-col px-5 p-5 lg:p-10 z-20"
          )}
        >
          {/* For id 5, render image as normal child, not absolute */}
          {id === 5 && img && (
            <Image
              src={img}
              alt={img}
              width={100}
              height={100}
              className={cn(imgClassName, "object-cover object-center mb-4 w-full max-h-32 rounded-xl")}
            />
          )}
          {id === 5 && spareImg && (
            <Image
              src={spareImg}
              alt={spareImg}
              width={100}
              height={100}
              className="object-cover object-center mb-4 w-full max-h-32 rounded-xl"
            />
          )}
          {id === 3 ? (
            <div className="relative w-full h-full flex flex-col items-center justify-center">
              {/* Starfield background */}
              <StarfieldBackground starCount={40} />
              {/* Animated horizontal background tags */}
              <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
                {["Python", "Java", "SQL", "GitHub Copilot", "Amazon Wisp", "AI/ML APIs"].map((item, i, arr) => {
                  const count = arr.length;
                  const top = 5 + (i * 90) / (count - 1); // Evenly spaced from 5% to 95% for more vertical space
                  const duration = i % 2 === 0 ? 10 : 16; // Faster for even-indexed tabs
                  const delay = i * (16 / count); // Keep delays consistent for spacing
                  return (
                    <span
                      key={i}
                      className="absolute bg-[#23244a] text-white/90 border border-white/10 shadow px-2 py-1 text-xs md:text-sm rounded-md opacity-40 blur-[1px] animate-horizontal-marquee leading-loose w-max min-w-fit"
                      style={{
                        top: `${top}%`,
                        animationDuration: `${duration}s`,
                        animationDelay: `${delay}s`
                      } as React.CSSProperties}
                    >
                      {item}
                    </span>
                  );
                })}
              </div>
              {/* Main title in foreground */}
              <div className="relative z-20 font-sans text-lg lg:text-3xl max-w-96 font-bold mb-6 text-white text-center">
                {title}
              </div>
            </div>
          ) : id === 2 ? (
            <div className="relative w-full h-full flex flex-col items-center justify-center">
              {/* Solar system background */}
              <SolarSystemBackground />
              {/* Animated horizontal background tags */}
              <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
                {["Google Gemini", "OpenAI GPT", "Anthropic Claude", "Cursor AI", "Tabnine"].map((item, i, arr) => {
                  const count = arr.length;
                  const top = 5 + (i * 90) / (count - 1); // Evenly spaced from 5% to 95% for more vertical space
                  const duration = i % 2 === 0 ? 10 : 16; // Faster for even-indexed tabs
                  const delay = i * (16 / count); // Keep delays consistent for spacing
                  return (
                    <span
                      key={i}
                      className="absolute bg-[#23244a] text-white/90 border border-white/10 shadow px-2 py-1 text-xs md:text-sm rounded-md opacity-40 blur-[1px] animate-horizontal-marquee leading-loose w-max min-w-fit"
                      style={{
                        top: `${top}%`,
                        animationDuration: `${duration}s`,
                        animationDelay: `${delay}s`
                      } as React.CSSProperties}
                    >
                      {item}
                    </span>
                  );
                })}
              </div>
              {/* Main title in foreground */}
              <div className="relative z-20 font-sans text-lg lg:text-3xl max-w-96 font-bold mb-6 text-white text-center">
                {title}
              </div>
            </div>
          ) : (
            <>
              <div className="font-sans font-extralight md:max-w-32 md:text-xs lg:text-base text-sm text-[#C1C2D3] z-10">
                {description}
              </div>
              <div
                className={`font-sans text-lg lg:text-3xl max-w-96 font-bold z-10 mb-4`}
              >
                {title}
              </div>
            </>
          )}

          {/* Tech stack list div */}
          {id === 3 && (
            <div className="flex gap-1 lg:gap-5 w-fit absolute -right-3 lg:-right-2">
              {/* tech stack lists */}
              <div className="flex flex-col gap-3 md:gap-3 lg:gap-8">
                <span className="lg:py-4 lg:px-3 py-4 px-3  rounded-lg text-center bg-[#10132E]"></span>
              </div>
              <div className="flex flex-col gap-3 md:gap-3 lg:gap-8">
                <span className="lg:py-4 lg:px-3 py-4 px-3  rounded-lg text-center bg-[#10132E]"></span>
              </div>
            </div>
          )}
          {id === 6 && (
            <div className="mt-5 relative">
              {/* button border magic from tailwind css buttons  */}
              {/* add rounded-md h-8 md:h-8, remove rounded-full */}
              {/* remove focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 */}
              {/* add handleCopy() for the copy the text */}
              <div
                className={`absolute -bottom-5 right-0 ${copied ? "block" : "block"
                  }`}
              >
                {/* <img src="/confetti.gif" alt="confetti" /> */}
                <Lottie options={defaultOptions} height={200} width={400} />
              </div>

              <MagicButton
                title={copied ? "Email is Copied!" : "Copy my email address"}
                icon={<IoCopyOutline />}
                position="left"
                handleClick={handleCopy}
                otherClasses="!bg-[#161A31]"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Simple starfield animation component
const StarfieldBackground = ({ starCount = 40 }) => {
  const stars = useMemo(() => (
    Array.from({ length: starCount }).map((_, i) => ({
      width: 1 + Math.random() * 2,
      height: 1 + Math.random() * 2,
      left: Math.random() * 100,
      top: Math.random() * 100,
    }))
  ), [starCount]);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      {stars.map((star, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white opacity-40"
          style={{
            width: `${star.width}px`,
            height: `${star.height}px`,
            left: `${star.left}%`,
            top: `${star.top}%`,
            filter: 'blur(0.5px)',
          }}
        />
      ))}
    </div>
  );
};

// Simple solar system animation component
const SolarSystemBackground = () => (
  <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
    <div className="relative w-40 h-40 md:w-64 md:h-64">
      {/* Sun */}
      <div className="absolute left-1/2 top-1/2 w-8 h-8 md:w-12 md:h-12 bg-yellow-300 rounded-full shadow-2xl animate-sun-glow" style={{transform: 'translate(-50%, -50%)'}} />
      {/* Orbit 1 */}
      <div className="absolute left-1/2 top-1/2 w-24 h-24 md:w-40 md:h-40 border border-white/10 rounded-full animate-orbit1" style={{transform: 'translate(-50%, -50%)'}}>
        <div className="absolute w-3 h-3 md:w-4 md:h-4 bg-blue-400 rounded-full left-1/2 top-0" style={{transform: 'translate(-50%, -50%)'}} />
      </div>
      {/* Orbit 2 */}
      <div className="absolute left-1/2 top-1/2 w-36 h-36 md:w-56 md:h-56 border border-white/10 rounded-full animate-orbit2" style={{transform: 'translate(-50%, -50%)'}}>
        <div className="absolute w-2 h-2 md:w-3 md:h-3 bg-red-400 rounded-full left-1/2 top-0" style={{transform: 'translate(-50%, -50%)'}} />
      </div>
      {/* Orbit 3 */}
      <div className="absolute left-1/2 top-1/2 w-48 h-48 md:w-72 md:h-72 border border-white/10 rounded-full animate-orbit3" style={{transform: 'translate(-50%, -50%)'}}>
        <div className="absolute w-4 h-4 md:w-5 md:h-5 bg-green-400 rounded-full left-1/2 top-0" style={{transform: 'translate(-50%, -50%)'}} />
      </div>
    </div>
  </div>
);
