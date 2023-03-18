import { CgWebsite } from "react-icons/cg";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";
import Image from "next/image";
import Tag from "./Tag";
import Link from "next/link";
import { Category } from "@/utils/types";

type PropTypes = {
  setCategoryName?: (value: string) => void;
  categories?: Array<Category>;
  categoryName?: string;
};

export const SideHome = ({
  setCategoryName,
  categoryName,
  categories,
}: PropTypes) => {
  return (
    <div className="">
      <div className="w-full gap-5">
        <Tag>about me</Tag>
        <div className="relative mx-auto mt-6  ">
          <Image
            src={process.env.NEXT_PUBLIC_AVATAR_URL || ""}
            alt="Developer of the blog"
            width={100}
            height={100}
            className="w-full"
            unoptimized
          />
        </div>
        <p className="py-[15px] text-[13px]">
          I&lsquo; m a solution-oriented web developer, lifelong learner and
          adventurer with professional experience in web development.
          <Link href="/aboutme">
            <span className="cursor-pointer text-secondary">Read more</span>
          </Link>
        </p>
      </div>

      {categories && setCategoryName ? (
        <div className="w-full pt-12">
          <Tag>Categories</Tag>
          <select
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="mt-[18px] w-full cursor-pointer bg-white p-2 uppercase tracking-[1px] text-[rgb(165,157,145)] outline-none duration-300 ease-in-out hover:text-secondary"
          >
            <option value="">All categories</option>
            {categories &&
              categories.map((el: Category) => {
                return (
                  <option key={el.id} value={el.name}>
                    {el.name}
                  </option>
                );
              })}
          </select>
        </div>
      ) : null}

      <div className="w-full py-12">
        <Tag>subscribe</Tag>
        <ul className="flex justify-center gap-[5px] py-[18px]">
          <li>
            <a
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-accent transition-colors duration-300 ease-in-out hover:bg-secondary hover:text-white"
              href="https://github.com/ismaelrodino2"
              target={"_blank"}
              rel="noreferrer"
            >
              <AiFillGithub />
            </a>
          </li>
          <li>
            <a
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-accent transition-colors duration-300 ease-in-out hover:bg-secondary hover:text-white"
              href="https://www.linkedin.com/in/ismael-tavares/?locale=en_US"
              target={"_blank"}
              rel="noreferrer"
            >
              <AiFillLinkedin />
            </a>
          </li>
          <li>
            <a
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-accent transition-colors duration-300 ease-in-out hover:bg-secondary hover:text-white"
              href="https://main--agitated-austin-0fb015.netlify.app/"
              target={"_blank"}
              rel="noreferrer"
            >
              <CgWebsite />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};
