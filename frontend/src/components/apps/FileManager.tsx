import WindowsControl from '../desktop/WindowControls'
import useDraggable from '../../hooks/useDraggable'
import { Folder } from "lucide-react";

export interface Project {
    name: string
    description: string
    tech: string[]
    link: string
    demo?: string
}

interface FileManagerProps {
    className?: string
    y?: string
    initialX?: number
    initialY?: number
    zIndex?: number
    onFocus?: () => void
    onOpenProject: (project: Project) => void
    selectedProject?: Project | null
}

export const exampleProjects: Project[] = [
    {
        name: 'portfolio-web',
        description:
            'A personal portfolio built with React and TypeScript to showcase projects, skills, and experience.',
        tech: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
        link: '#',
    },
    {
        name: 'task-manager',
        description:
            'A productivity app with task tracking, filtering, and project organization for daily planning.',
        tech: ['React', 'Node.js', 'MongoDB'],
        link: '#',
    },
    {
        name: 'analytics-dashboard',
        description:
            'A data-heavy dashboard for visualizing metrics, activity trends, and performance summaries.',
        tech: ['Next.js', 'TypeScript', 'PostgreSQL'],
        link: '#',
    },
]

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
    } = useDraggable<HTMLDivElement>(initialX, initialY)

    return (
        <div
            ref={draggableRef}
            onPointerDown={onFocus}
            className={`window-pop-in relative flex w-full max-w-[1100px] flex-col px-4 pb-8 sm:px-6 lg:absolute lg:m-4 ${className}`}
            style={{
                ...(isDesktop && {
                    left: position.x,
                    top: position.y,
                }),
                zIndex,
            }}
        >
            <div className="overflow-hidden rounded-2xl border border-[#2a2a2a] bg-[#0f1115]/90 shadow-[0_0_30px_rgba(0,0,0,0.25)] backdrop-blur-sm">

                {/* Title bar */}
                <div className="border-b border-[#2a2a2a] bg-[#11151a] text-[11px] text-gray-300">
                    <div
                        onPointerDown={handlePointerDown}
                        onPointerMove={handlePointerMove}
                        onPointerUp={handlePointerUp}
                        className="relative flex select-none items-center justify-center px-4 py-2.5 lg:cursor-grab"
                    >
                        <div className="text-sm font-semibold text-[#e6e6e6]">
                            File Manager
                        </div>

                        <div className="absolute right-4 flex items-center gap-3">
                            <WindowsControl />
                        </div>
                    </div>

                    {/* Menu bar */}
                    <div className="flex items-center gap-2 border-t border-[#2a2a2a] bg-[#141b22] px-4 py-2 text-sm uppercase">
                        <button type="button" className="rounded px-2 py-1 transition hover:bg-gray-700">
                            File
                        </button>

                        <button type="button" className="rounded px-2 py-1 transition hover:bg-gray-700">
                            Edit
                        </button>

                        <button type="button" className="rounded px-2 py-1 transition hover:bg-gray-700">
                            View
                        </button>

                        <button type="button" className="rounded px-2 py-1 transition hover:bg-gray-700">
                            Go
                        </button>

                        <button type="button" className="rounded px-2 py-1 transition hover:bg-gray-700">
                            Bookmarks
                        </button>

                        <button type="button" className="rounded px-2 py-1 transition hover:bg-gray-700">
                            Help
                        </button>
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
                            <div className="px-2 py-1">
                                Computer
                            </div>

                            <div className="px-2 py-1">
                                kristian
                            </div>

                            <div className="px-2 py-1">
                                Documents
                            </div>

                            <div className="px-2 py-1">
                                Downloads
                            </div>

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
                                    {exampleProjects.length} Folders
                                </div>
                            </div>

                            <div className="mt-2 text-[11px] text-gray-500">
                                Select a project to open
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                            {exampleProjects.map((project) => (
                                <button
                                    type="button"
                                    key={project.name}
                                    onClick={() => onOpenProject(project)}
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

                        <div className="mt-auto flex items-center justify-between border-t border-[#2a2a2a] pt-3 text-[14px] text-gray-400">
                            <span>
                                {exampleProjects.length} Folders
                            </span>

                            <span>
                                Free space 2.1 GiB
                            </span>
                        </div>
                    </main>
                </div>

                {/* Small screen layout */}
                <div className="flex min-h-[500px] flex-col sm:flex-row lg:hidden">

                    {/* Project list */}
                    <aside className="w-full shrink-0 border-b border-[#2a2a2a] bg-[#121820] p-3 sm:w-[190px] sm:border-b-0 sm:border-r md:w-[220px]">
                        <div className="mb-3 px-2 text-[11px] font-semibold tracking-[0.12em] text-gray-500">
                            PROJECTS
                        </div>

                        <div className="flex gap-1 overflow-x-auto sm:flex-col sm:overflow-x-visible">
                            {exampleProjects.map((project) => {
                                const isActive =
                                    selectedProject?.name === project.name

                                return (
                                    <button
                                        type="button"
                                        key={project.name}
                                        onClick={() =>
                                            onOpenProject(project)
                                        }
                                        className={`min-w-max cursor-pointer rounded-md px-3 py-2 text-left text-xs transition-colors sm:w-full ${isActive ? 'bg-[#1a212b] text-[#E6E6E6]' : 'text-gray-400 hover:bg-[#171e27] hover:text-white'}`}
                                    >
                                        <span className="mr-2 text-[#687582]">
                                            {isActive ? '▸' : ' '}
                                        </span>

                                        {project.name}
                                    </button>
                                )
                            })}
                        </div>
                    </aside>

                    {/* Project details */}
                    <main className="min-w-0 flex-1 bg-[#0f1115] p-5 sm:p-6">

                        {selectedProject ? (
                            <div className="flex h-full flex-col">

                                <div className="mb-6 border-b border-[#2a2a2a] pb-4">
                                    <div className="text-[10px] uppercase tracking-[0.12em] text-gray-500">
                                        Project
                                    </div>

                                    <h2 className="mt-1 break-words text-xl font-semibold text-[#E6E6E6]">
                                        {selectedProject.name}
                                    </h2>
                                </div>

                                <div className="flex-1">

                                    <p className="max-w-2xl text-sm leading-6 text-gray-400">
                                        {selectedProject.description}
                                    </p>

                                    <div className="mt-6">
                                        <div className="mb-2 text-[10px] uppercase tracking-[0.12em] text-gray-500">
                                            Technologies
                                        </div>

                                        <div className="flex flex-wrap gap-2">
                                            {selectedProject.tech.map(
                                                (tech) => (
                                                    <span
                                                        key={tech}
                                                        className="rounded-md border border-[#2a2a2a] bg-[#141a21] px-2.5 py-1 text-xs text-gray-300"
                                                    >
                                                        {tech}
                                                    </span>
                                                )
                                            )}
                                        </div>
                                    </div>

                                    <div className="mt-6 flex flex-wrap gap-3">
                                        <a
                                            href={selectedProject.link}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="rounded-md border border-[#2a2a2a] bg-[#141a21] px-3 py-2 text-xs text-gray-300 transition hover:border-[#4FC1E9]/60 hover:text-[#4FC1E9]"
                                        >
                                            GitHub
                                        </a>

                                        {selectedProject.demo && (
                                            <a
                                                href={selectedProject.demo}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="rounded-md border border-[#2a2a2a] bg-[#141a21] px-3 py-2 text-xs text-gray-300 transition hover:border-[#4FC1E9]/60 hover:text-[#4FC1E9]"
                                            >
                                                Demo
                                            </a>
                                        )}
                                    </div>

                                </div>

                                <div className="mt-8 border-t border-[#2a2a2a] pt-3 text-[11px] text-gray-500">
                                    /home/kristian/projects/{selectedProject.name}
                                </div>
                            </div>
                        ) : (
                            <div className="flex h-full min-h-[420px] items-center justify-center text-center">
                                <div>
                                    <div className="text-sm text-gray-400">
                                        Select a project
                                    </div>

                                    <div className="mt-1 text-[11px] text-gray-600">
                                        Choose a project from the sidebar
                                    </div>
                                </div>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    )
}

export default FileManager