import Image from 'next/image'
import Link from 'next/link'
import { FaStar } from "react-icons/fa";
export default function ProjectCard({ project }) {

    // console.log("project image" + project.image);
    // console.log("project title" + project.title);
    console.log( `${project.image}/${project.title}.jpg`);
    return (
      <Link href={`/viewproject/${project.id}`}>
        <div className="flex py-7 px-3 border-2 border-slate-700 rounded-xl m-5 cursor-pointer hover:shadow-lg hover:bg-zinc-700 pr-4 transition duration-500 ease-in hover:border-none md:h-64">
          {/* Just for image div-LHS */}
          <div className="relative h-24 w-40 md:h-52 md:w-80 flex-shrink-0">
            <Image
              src={`${project.image}/${project.title}.jpg`}
              alt="img"
              layout="fill"
              objectFit="cover"
              className="rounded-2xl"
            />
          </div>
          {/* Content div-RHS */}
          <div className="flex flex-col pl-5">
            <h4 className="text-2xl font-bold">{project.title}</h4>
            <div className="border-b w-10 pt-2" />
            <p className="pt-2 text-lg text-white">{project.description}</p>
            {/* Display project rating based on the taskCount  */}
            {/* If there are 2 tasks, then 2 stars */}
            {/* If there are 4 tasks, then 4 stars */}
            {/* If there are 6 tasks, then 6 stars */}
            {/* If there are 8 tasks, then 8 stars */}
            <div className="flex items-center mt-3">
              {project.taskCount > 0 ? (
                <h1 className="text-white text-lg font-bold">
                  Ratings: &nbsp;
                </h1>
              ) : (
                <></>
              )}
              {project.taskCount > 0 ? (
                Array.from({ length: project.taskCount }, (_, i) => (
                  <FaStar key="1" className="text-white" />
                ))
              ) : (
                <h1 className="text-white font-semibold text-lg">No ratings</h1>
              )}
            </div>
            {/* Progress bar based on the duration of the project */}
            {/* If the duration is 2 weeks, then 2/7 of the progress bar should be filled */}
            {/* If the duration is 4 weeks, then 4/7 of the progress bar should be filled */}
            {/* If the duration is 6 weeks, then 6/7 of the progress bar should be filled */}

            <div className="relative pt-5">
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-800">
                <div
                  style={{ width: `${project.duration}` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-white"
                ></div>
              </div>
            </div>
            {/* At the bottom of the card, category should be displayed */}
            <div className="flex items-center mt-2">
              <span className="text-white bg-slate-700 rounded-xl text-lg px-2 py-1">
                {project.category}
              </span>
            </div>
          </div>
        </div>
      </Link>
    );
}

