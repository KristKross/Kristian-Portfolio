import { Folder, FolderOpen, HardDrive } from "lucide-react";
import type { Project } from "../apps/FileManager";

interface ProjectContentProps {
    project: Project;
}

function ProjectContent({ project }: ProjectContentProps) {
    return (
        <div className="flex h-full flex-col">
            <div className="mb-4 border-b border-[#2a2a2a] pb-3 sm:mb-5 sm:pb-4 md:mb-6">
                <div className="flex items-center gap-2 text-[9px] text-gray-500 sm:text-[10px]">
                    <FolderOpen size={12} strokeWidth={1.7} />
                    <span className="truncate">
                        /home/kristian/projects/{project.name}
                    </span>
                </div>

                <h2 className="mt-2 break-words text-lg font-semibold text-[#E6E6E6] sm:text-xl md:text-xl">
                    {project.name}
                </h2>
            </div>

            <div className="flex-1">
                <p className="max-w-2xl text-xs leading-5 text-gray-400 sm:text-sm sm:leading-6">
                    {project.description}
                </p>

                <div className="mt-4 sm:mt-5 md:mt-6">
                    <div className="mb-2 flex items-center gap-2 text-[9px] uppercase tracking-[0.12em] text-gray-500 sm:text-[10px]">
                        <HardDrive size={12} strokeWidth={1.7} />
                        Technologies
                    </div>

                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {project.tech.map((tech) => (
                            <span
                                key={tech}
                                className="rounded-md border border-[#2a2a2a] bg-[#141a21] px-2 py-0.5 text-[10px] text-gray-300 sm:px-2.5 sm:py-1 sm:text-xs"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="mt-5 flex flex-col items-center justify-center gap-2 sm:mt-6 sm:gap-3">
                    {project.demo && (
                        <iframe
                            src={`${project.demo}?controls=0&modestbranding=1&rel=0`}
                            title={`${project.name} demo`}
                            className="aspect-video w-full max-w-[520px] rounded-md border border-[#2a2a2a] bg-[#141a21] sm:w-[85%] md:w-[80%]"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        />
                    )}

                    {project.link && (
                        <a
                            href={project.link}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-2 shrink-0 rounded-md bg-[#4FC1E9] px-5 py-1.5 text-center text-[10px] font-semibold text-[#10151a] transition hover:brightness-110 sm:px-6 sm:py-2 sm:text-xs"
                        >
                            GitHub
                        </a>
                    )}
                </div>
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-[#2a2a2a] pt-2.5 text-[9px] text-gray-500 sm:mt-7 sm:pt-3 sm:text-[11px]">
                <div className="flex items-center gap-1.5">
                    <Folder size={11} strokeWidth={1.7} />
                    Project folder
                </div>

                <span className="truncate">
                    /home/kristian/projects
                </span>
            </div>
        </div>
    );
}

export default ProjectContent