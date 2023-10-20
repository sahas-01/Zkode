import Link from "next/link";
import React from "react";
import Image from "next/image";

const MyProjectCard = ({ project }) => {
  // console.log(project.image)
    // console.log("project image" + project.image);
    // console.log("project title" + project.title);
    console.log(`${project.image}/${project.title}.jpg`);
  return (
    <div className="flex py-7 px-3 border-2 border-slate-700 rounded-xl m-5 hover:opacity-90 hover:shadow-lg pr-4 transition duration-500 ease-in">
      {/* Just for image div-LHS */}
      <div className="relative h-24 w-40 md:h-52 md:w-80 flex-shrink-0">
        <Image
          src={`${project.image}/${project.title}.jpg`}
          layout="fill"
          objectFit="cover"
          className="rounded-2xl"
        />
      </div>
      {/* Content div-RHS */}
      <div className="flex flex-col flex-grow pl-5">
        <h4 className="text-2xl font-bold">{project.title}</h4>
        <div className="border-b w-10 pt-2" />
        <p className="pt-2 text-lg text-white">{project.description}</p>
        <div className="flex items-center mt-5">
          <span className="text-white bg-slate-700 rounded-xl text-lg px-2 py-1">
            {project.category}
          </span>
        </div>
        {/* Price div */}
        <div className="flex justify-between items-end mt-8">
          {/* Buttons to edit project and view project */}
          <div className="flex space-x-4 items-center justify-end text-gray-500">
            <Link href={`/project/${project.id}`}>
              <button
                className="hidden md:inline-flex bg-transparent text-white text-lg px-5 py-2 border border-white-500 rounded-xl
                            hover:bg-white hover:text-black
                            "
              >
                Edit Project
              </button>
            </Link>
            <Link href={`/myprojectview/${project.id}`}>
              <button
                className="hidden md:inline-flex bg-transparent text-white text-lg px-5 py-2 border border-white-500 rounded-xl
                            hover:bg-white hover:text-black
                            "
              >
                View Project
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProjectCard;
