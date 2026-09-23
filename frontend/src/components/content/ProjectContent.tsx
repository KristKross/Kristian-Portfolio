import { useState } from "react";
import {
    Folder,
    FolderOpen,
    HardDrive,
    ExternalLink,
    Play,
    Image as ImageIcon,
} from "lucide-react";

interface Project {
    _id: string;
    title: string;
    description: string;
    technologies: string[];
    liveUrl: string;
    videoUrl: string;
    githubUrl: string;
    order: number;
    images: string[];
}

interface ProjectContentProps {
    project: Project;
}

function ProjectContent({ project }: ProjectContentProps) {
    const [selectedImage, setSelectedImage] = useState(0);

    const images = project.images ?? [];
    const currentImage = images[selectedImage];

    return (
        <div className="flex h-full flex-col">
            {/* Header */}
            <div className="mb-4 border-b border-[#2a2a2a] pb-3">
                <div className="flex items-center gap-2 text-[9px] text-gray-500">
                    <FolderOpen
                        size={12}
                        strokeWidth={1.7}
                    />

                    <span className="truncate">
                        /home/kristian/projects/{project.title}
                    </span>
                </div>

                <h2 className="mt-2 break-words text-lg font-semibold text-[#E6E6E6]">
                    {project.title}
                </h2>
            </div>

            <div className="flex-1 overflow-y-auto pr-1">
                {/* Description */}
                <div>
                    <div className="mb-2 flex items-center gap-2 text-[9px] uppercase tracking-[0.12em] text-gray-500">
                        <FolderOpen
                            size={12}
                            strokeWidth={1.7}
                        />
                        Description
                    </div>

                    <p className="text-xs leading-5 text-gray-400">
                        {project.description}
                    </p>
                </div>

                {/* Technologies */}
                <div className="mt-5">
                    <div className="mb-2 flex items-center gap-2 text-[9px] uppercase tracking-[0.12em] text-gray-500">
                        <HardDrive
                            size={12}
                            strokeWidth={1.7}
                        />
                        Technologies
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                        {project.technologies.map((technology) => (
                            <span
                                key={technology}
                                className="rounded-md border border-[#2a2a2a] bg-[#141a21] px-2 py-0.5 text-[10px] text-gray-300"
                            >
                                {technology}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Screenshots */}
                {images.length > 0 && (
                    <div className="mt-5">
                        <div className="mb-2 flex items-center justify-between">
                            <div className="flex items-center gap-2 text-[9px] uppercase tracking-[0.12em] text-gray-500">
                                <ImageIcon
                                    size={12}
                                    strokeWidth={1.7}
                                />
                                Screenshots
                            </div>

                            <span className="font-mono text-[9px] text-gray-600">
                                {selectedImage + 1} / {images.length}
                            </span>
                        </div>

                        {/* Main screenshot */}
                        <div className="overflow-hidden rounded-md border border-[#2a2a2a] bg-[#141a21]">
                            <div className="flex items-center gap-2 border-b border-[#2a2a2a] bg-[#151a20] px-3 py-2">
                                <ImageIcon
                                    size={12}
                                    strokeWidth={1.7}
                                    className="shrink-0 text-gray-600"
                                />

                                <span className="truncate font-mono text-[9px] text-gray-500">
                                    {currentImage?.split("/").pop()}
                                </span>
                            </div>

                            <div className="flex aspect-video items-center justify-center bg-[#090c10] p-2">
                                <img
                                    src={currentImage}
                                    alt={`${project.title} screenshot ${
                                        selectedImage + 1
                                    }`}
                                    className="h-full w-full object-contain"
                                />
                            </div>
                        </div>

                        {/* Thumbnails */}
                        {images.length > 1 && (
                            <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                                {images.map((image, index) => (
                                    <button
                                        key={`${image}-${index}`}
                                        type="button"
                                        onClick={() =>
                                            setSelectedImage(index)
                                        }
                                        className={`shrink-0 overflow-hidden rounded border bg-[#141a21] transition ${
                                            selectedImage === index
                                                ? "border-[#4FC1E9]"
                                                : "border-[#2a2a2a]"
                                        }`}
                                    >
                                        <img
                                            src={image}
                                            alt={`${project.title} screenshot ${
                                                index + 1
                                            }`}
                                            className={`h-12 w-16 object-cover transition ${
                                                selectedImage === index
                                                    ? "opacity-100"
                                                    : "opacity-50"
                                            }`}
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Project Links */}
                {(project.liveUrl ||
                    project.videoUrl ||
                    project.githubUrl) && (
                    <div className="mt-5 flex flex-wrap gap-2">
                        {project.liveUrl && (
                            <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-2 rounded-md bg-[#4FC1E9] px-3 py-1.5 text-[10px] font-semibold text-[#10151a] transition hover:brightness-110"
                            >
                                <ExternalLink
                                    size={12}
                                    strokeWidth={2}
                                />
                                Live Demo
                            </a>
                        )}

                        {project.videoUrl && (
                            <a
                                href={project.videoUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-2 rounded-md border border-[#3A4656] bg-[#141a21] px-3 py-1.5 text-[10px] font-semibold text-gray-300 transition hover:border-[#4FC1E9] hover:text-[#4FC1E9]"
                            >
                                <Play
                                    size={12}
                                    strokeWidth={2}
                                />
                                Video
                            </a>
                        )}

                        {project.githubUrl && (
                            <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-2 rounded-md border border-[#3A4656] bg-[#141a21] px-3 py-1.5 text-[10px] font-semibold text-gray-300 transition hover:border-[#4FC1E9] hover:text-[#4FC1E9]"
                            >
                                <Folder
                                    size={12}
                                    strokeWidth={2}
                                />
                                GitHub
                            </a>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProjectContent