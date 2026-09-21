import { useEffect, useState } from "react";
import WindowsControl from "../desktop/WindowControls";
import useDraggable from "../../hooks/useDraggable";
import { Folder } from "lucide-react";

export interface Project {
    _id: string;
    name: string;
    description: string;
    tech: string[];
    link: string;
    demo?: string;
    order: number;
}

interface BackendProject {
    _id: string;
    title: string;
    description: string;
    technologies: string[];
    demo: string;
    githubUrl: string;
    order: number;
}

interface FileManagerProps {
    className?: string;
    y?: string;
    initialX?: number;
    initialY?: number;
    zIndex?: number;
    onFocus?: () => void;
    onOpenProject: (project: Project) => void;
    selectedProject?: Project | null;
}

function FileManager({
    className,
    initialX,
    initialY,
    zIndex,
    onFocus,
    onOpenProject,
    selectedProject,
}: FileManagerProps) {
    const {
        draggableRef,
        position,
        isDesktop,
        handlePointerDown,
        handlePointerMove,
        handlePointerUp,
    } = useDraggable<HTMLDivElement>(initialX, initialY);

    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/api/projects`
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch projects");
                }

                const data: BackendProject[] = await response.json();

                const formattedProjects: Project[] = data
                    .map((project) => ({
                        _id: project._id,
                        name: project.title,
                        description: project.description,
                        tech: project.technologies,
                        link: project.githubUrl,
                        demo: project.demo || undefined,
                        order: project.order,
                    }))
                    .sort((a, b) => a.order - b.order);

                setProjects(formattedProjects);
            } catch (error) {
                console.error("Failed to fetch projects:", error);
                setError("Unable to load projects");
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    return (
        <div
            ref={draggableRef}
            onPointerDown={onFocus}
            className={`window-pop-in relative flex w-full max-w-[1100px] flex-col px-2 pb-4 sm:px-3 sm:pb-6 md:px-4 lg:absolute lg:m-4 lg:px-6 lg:pb-8 ${className}`}
            style={{
                ...(isDesktop && {
                    left: position.x,
                    top: position.y,
                }),
                zIndex,
            }}
        >
            <div className="overflow-hidden rounded-xl border border-[#2a2a2a] bg-[#0f1115]/90 shadow-[0_0_30px_rgba(0,0,0,0.25)] backdrop-blur-sm sm:rounded-2xl">

                {/* Title bar */}
                <div className="border-b border-[#2a2a2a] bg-[#11151a] text-[10px] text-gray-300 sm:text-[11px]">
                    <div
                        onPointerDown={handlePointerDown}
                        onPointerMove={handlePointerMove}
                        onPointerUp={handlePointerUp}
                        className="relative flex select-none items-center justify-center px-3 py-2 sm:px-4 sm:py-2.5 lg:cursor-grab"
                    >
                        <div className="text-xs font-semibold text-[#e6e6e6] sm:text-sm">
                            File Manager
                        </div>

                        <div className="absolute right-3 flex items-center gap-2 sm:right-4 sm:gap-3">
                            <WindowsControl />
                        </div>
                    </div>

                    {/* Menu bar */}
                    <div className="flex items-center gap-0.5 overflow-x-auto border-t border-[#2a2a2a] bg-[#141b22] px-2 py-1.5 text-[10px] uppercase sm:gap-1 sm:px-3 sm:py-2 sm:text-xs md:gap-2 md:px-4 md:text-sm">
                        {[
                            "File",
                            "Edit",
                            "View",
                            "Go",
                            "Bookmarks",
                            "Help",
                        ].map((item) => (
                            <button
                                key={item}
                                type="button"
                                className="shrink-0 rounded px-2 py-1 transition hover:bg-gray-700 sm:px-2.5"
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Desktop layout */}
                <div className="hidden min-h-[560px] lg:flex">

                    {/* Sidebar */}
                    <aside className="w-[220px] shrink-0 border-r border-[#2a2a2a] bg-[#121820] p-4 text-sm text-gray-300">
                        <div className="mb-4 text-[14px] font-semibold text-gray-300">
                            Places
                        </div>

                        <div className="mt-2 space-y-2 text-gray-400">
                            <div className="px-2 py-1">Computer</div>
                            <div className="px-2 py-1">kristian</div>
                            <div className="px-2 py-1">Documents</div>
                            <div className="px-2 py-1">Downloads</div>

                            <div className="rounded-md bg-[#1a212b] px-2 py-1.5 text-[#E6E6E6]">
                                Projects
                            </div>
                        </div>

                        <div className="mt-6 text-[14px] font-semibold text-gray-300">
                            Devices
                        </div>

                        <div className="mt-2 space-y-2 text-gray-400">
                            <div className="px-2 py-1">
                                File System
                            </div>
                        </div>
                    </aside>

                    {/* Main */}
                    <main className="flex min-w-0 flex-1 flex-col bg-[#0f1115] p-4">

                        <div className="mb-6 border-b border-[#2a2a2a] pb-3">
                            <div className="flex items-center justify-between">
                                <div className="text-sm text-[#E6E6E6]">
                                    /home/kristian/projects
                                </div>

                                <div className="text-[10px] uppercase text-gray-400">
                                    {loading
                                        ? "Loading..."
                                        : `${projects.length} Folders`}
                                </div>
                            </div>

                            <div className="mt-2 text-[11px] text-gray-500">
                                Select a project to open
                            </div>
                        </div>

                        {loading ? (
                            <div className="flex flex-1 items-center justify-center text-xs text-gray-500">
                                Loading projects...
                            </div>
                        ) : error ? (
                            <div className="flex flex-1 items-center justify-center text-xs text-red-400">
                                [ ERROR ] {error}
                            </div>
                        ) : projects.length === 0 ? (
                            <div className="flex flex-1 items-center justify-center text-xs text-gray-500">
                                No projects found.
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                                {projects.map((project) => (
                                    <button
                                        type="button"
                                        key={project._id}
                                        onClick={() =>
                                            onOpenProject(project)
                                        }
                                        className="group flex cursor-pointer flex-col items-center justify-center rounded-xl border border-transparent p-3 text-center transition-all duration-200 hover:border-[#4FC1E9]/60 hover:bg-[#131b23] focus:border-[#4FC1E9]/60 focus:bg-[#131b23] focus:outline-none"
                                    >
                                        <div className="relative mb-3 flex h-16 w-12 items-center justify-center">
                                            <Folder className="h-14 w-14 text-[#4FC1E9] opacity-90 transition group-hover:opacity-100" />
                                        </div>

                                        <div className="flex min-h-[2rem] w-full max-w-[110px] items-center justify-center text-center text-xs font-medium leading-4 text-[#E6E6E6] transition group-hover:text-[#4FC1E9]">
                                            {project.name}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}

                        <div className="mt-auto flex items-center justify-between border-t border-[#2a2a2a] pt-3 text-[14px] text-gray-400">
                            <span>{projects.length} Folders</span>
                            <span>Free space 2.1 GiB</span>
                        </div>
                    </main>
                </div>

                {/* Small screen layout */}
                <div className="flex min-h-[420px] flex-col sm:min-h-[460px] sm:flex-row lg:hidden">

                    {/* Project list */}
                    <aside className="w-full shrink-0 border-b border-[#2a2a2a] bg-[#121820] p-2.5 sm:w-[170px] sm:border-b-0 sm:border-r sm:p-3 md:w-[190px] md:p-4">
                        <div className="mb-2 px-2 text-[10px] font-semibold tracking-[0.12em] text-gray-500 sm:mb-3">
                            PROJECTS
                        </div>

                        <div className="flex gap-1 overflow-x-auto sm:flex-col sm:overflow-x-visible">
                            {loading ? (
                                <div className="px-3 py-2 text-[10px] text-gray-500 sm:text-xs">
                                    Loading...
                                </div>
                            ) : error ? (
                                <div className="px-3 py-2 text-[10px] text-red-400 sm:text-xs">
                                    Failed to load projects
                                </div>
                            ) : (
                                projects.map((project) => {
                                    const isActive =
                                        selectedProject?.name ===
                                        project.name;

                                    return (
                                        <button
                                            type="button"
                                            key={project._id}
                                            onClick={() =>
                                                onOpenProject(project)
                                            }
                                            className={`min-w-max cursor-pointer rounded-md px-2.5 py-1.5 text-left text-[10px] transition-colors sm:w-full sm:px-3 sm:py-2 sm:text-[11px] md:text-xs ${
                                                isActive
                                                    ? "bg-[#1a212b] text-[#E6E6E6]"
                                                    : "text-gray-400 hover:bg-[#171e27] hover:text-white"
                                            }`}
                                        >
                                            <span className="mr-1.5 text-[#687582]">
                                                {isActive ? "▸" : " "}
                                            </span>

                                            {project.name}
                                        </button>
                                    );
                                })
                            )}
                        </div>
                    </aside>

                    {/* Project details */}
                    <main className="min-w-0 flex-1 bg-[#0f1115] p-3.5 sm:p-5 md:p-6">
                        {selectedProject ? (
                            <div className="flex h-full flex-col">

                                <div className="mb-4 border-b border-[#2a2a2a] pb-3 sm:mb-5 sm:pb-4 md:mb-6">
                                    <div className="text-[9px] uppercase tracking-[0.12em] text-gray-500 sm:text-[10px]">
                                        Project
                                    </div>

                                    <h2 className="mt-1 break-words text-lg font-semibold text-[#E6E6E6] sm:text-xl md:text-xl">
                                        {selectedProject.name}
                                    </h2>
                                </div>

                                <div className="flex-1">

                                    <p className="max-w-2xl text-xs leading-5 text-gray-400 sm:text-sm sm:leading-6">
                                        {selectedProject.description}
                                    </p>

                                    <div className="mt-4 sm:mt-5 md:mt-6">
                                        <div className="mb-2 text-[9px] uppercase tracking-[0.12em] text-gray-500 sm:text-[10px]">
                                            Technologies
                                        </div>

                                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                            {selectedProject.tech.map(
                                                (tech) => (
                                                    <span
                                                        key={tech}
                                                        className="rounded-md border border-[#2a2a2a] bg-[#141a21] px-2 py-0.5 text-[10px] text-gray-300 sm:px-2.5 sm:py-1 sm:text-xs"
                                                    >
                                                        {tech}
                                                    </span>
                                                )
                                            )}
                                        </div>
                                    </div>

                                    <div className="mt-5 flex flex-col items-center justify-center gap-2 sm:mt-6 sm:gap-3">

                                        {selectedProject.demo && (
                                            <iframe
                                                src={`${selectedProject.demo}?controls=0&modestbranding=1&rel=0`}
                                                title={`${selectedProject.name} demo`}
                                                className="aspect-video w-full max-w-[520px] rounded-md border border-[#2a2a2a] bg-[#141a21] sm:w-[85%] md:w-[80%]"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            />
                                        )}

                                        {selectedProject.link && (
                                            <a
                                                href={selectedProject.link}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="mt-2 shrink-0 rounded-md bg-[#4FC1E9] px-5 py-1.5 text-center text-[10px] font-semibold text-[#10151a] transition hover:brightness-110 sm:px-6 sm:py-2 sm:text-xs"
                                            >
                                                GitHub
                                            </a>
                                        )}
                                    </div>
                                </div>

                                <div className="mt-5 border-t border-[#2a2a2a] pt-2.5 text-[9px] text-gray-500 sm:mt-7 sm:pt-3 sm:text-[11px]">
                                    /home/kristian/projects/
                                    {selectedProject.name}
                                </div>
                            </div>
                        ) : (
                            <div className="flex h-full min-h-[350px] items-center justify-center text-center sm:min-h-[420px]">
                                <div>
                                    <div className="text-xs text-gray-400 sm:text-sm">
                                        Select a project
                                    </div>

                                    <div className="mt-1 text-[9px] text-gray-600 sm:text-[11px]">
                                        Choose a project from the sidebar
                                    </div>
                                </div>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}

export default FileManager