"use client"
import type { NextPage } from "next";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai/index";
import { CgWebsite } from "react-icons/cg";

const Footer: NextPage = () => {
  return (
    <div className="px-5 bg-white flex flex-col text-center mt-auto py-[50px]">
      <h2>BatDev</h2>
      <div className="flex flex-col pt-[25px]">
        <p className="text-accent">Ismael Tavares Rodino</p>
        <p className="text-accent">ismael.rodino@hotmail.com</p>
      </div>
      <div>
        <ul className="flex justify-center py-[38px] gap-[5px]">
          <li>
            <a
              className="w-10 h-10 flex rounded-full bg-neutral text-accent justify-center items-center transition-colors duration-300 ease-in-out hover:text-white hover:bg-secondary"
              href="https://github.com/ismaelrodino2"
              target={"_blank"}
              rel="noreferrer"
            >
              <AiFillGithub />
            </a>
          </li>
          <li>
            <a
              className="w-10 h-10 flex rounded-full bg-neutral text-accent justify-center items-center transition-colors duration-300 ease-in-out hover:text-white hover:bg-secondary"
              href="https://www.linkedin.com/in/ismael-tavares/?locale=en_US"
              target={"_blank"}
              rel="noreferrer"
            >
              <AiFillLinkedin />
            </a>
          </li>
          <li>
            <a
              className="w-10 h-10 flex rounded-full bg-neutral text-accent justify-center items-center transition-colors duration-300 ease-in-out hover:text-white hover:bg-secondary"
              href="https://main--agitated-austin-0fb015.netlify.app/"
              target={"_blank"}
              rel="noreferrer"
            >
              <CgWebsite />
            </a>
          </li>
        </ul>
      </div>
      <p>
        Made with &#10084; by{" "}
        <a
          href="https://github.com/ismaelrodino2"
          target={"_blank"}
          rel="noreferrer"
          className="text-accent"
        >
          Ismael Rodino
        </a>
      </p>
    </div>
  );
};

export default Footer;
