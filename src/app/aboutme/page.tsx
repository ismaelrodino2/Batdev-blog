import Image from "next/image";
import Header from "../components/Header";

function AboutMe() {
  return (
    <div className=" bg-white px-8 pb-5">
      <div className="bg-neutral ">
        <div className="px-[42px] container mx-auto">
          <Header firstTxt="About Me" title="A LITTLE BIT" />
          <div className="flex text-center pb-11 justify-center">
            <div className=" w-1/2">
              <p>
                Hello, nice to meet you, thanks for visiting my blog. Below you
                can read a little more about me.
              </p>
            </div>
          </div>
          <div className="flex md:flex-row  flex-col items-center pb-10">
            <div className="md:w-1/4 w-full">
              <h4 className="my-4">Who I Am</h4>
              <p className="leading-[2.25em]">
                Front-end software developer with hands-on experience in
                ReactJs. Currently building projects with Typescript, NextJs and
                NodeJs. Very optimistic with a proactive attitude and strong
                technical experience. Over 2 years of experience working with a
                variety of different technologies on both backend and frontend.
                Passionate about life, art and building interesting products.
              </p>
            </div>
            <div className="md:w-[60%] w-full flex justify-center py-10 flex-col items-center gap-16">
              <div className="">
                <div className="relative ">
                  <Image
                    src={process.env.NEXT_PUBLIC_AVATAR_URL || ``}
                    alt="/image/me.jpeg"
                    height={100}
                    width={100}
                    unoptimized
                    className="md:w-[300px] w-60 h-60 md:h-[300px] rounded-[50%]"
                  />
                </div>
              </div>
              <hr className=" border-solid border-primary-medium w-16 self-center" />
            </div>

            <div className="md:w-1/4 w-full">
              <h4 className="mb-4">My Philosophy</h4>
              <p className="leading-[2.25em]">
                I&lsquo;m a lifelong learner and adventurer with professional
                experience in web development. I like development because of the
                satisfaction I have in overcoming challenges. I&lsquo;m
                motivated by the opportunity software offers to positively
                impact an individual&lsquo;s life and the world as a whole.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutMe;
