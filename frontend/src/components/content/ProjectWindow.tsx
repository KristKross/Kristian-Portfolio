import { useState } from 'react'
import {
    ArrowLeft,
    ArrowRight,
    ExternalLink,
    FileText,
    Folder,
    FolderOpen,
    HardDrive,
    Image as ImageIcon,
    Package,
} from 'lucide-react'
import useDraggable from '../../hooks/useDraggable'
import WindowsControl from '../desktop/WindowControls'

export interface Project {
    name: string
    description: string
    tech: string[]
    link: string
    demo?: string
    images?: string[]
}

interface ProjectWindowProps {
    project: Project
    initialX?: number
    initialY?: number
    zIndex?: number
    className: string
    onFocus?: () => void
    onClose?: () => void
}

function ProjectWindow({
    project,
    initialX = 300,
    initialY = 150,
    zIndex = 1,
    className,
    onFocus,
    onClose,
}: ProjectWindowProps) {
    const {
        draggableRef,
        position,
        isDesktop,
        handlePointerDown,
        handlePointerMove,
        handlePointerUp,
    } = useDraggable<HTMLDivElement>(
        initialX,
        initialY
    )

    const [selectedImage, setSelectedImage] = useState(0)

    const images = project.images ?? []
    const heroImage = images[selectedImage]

    return (
        <div
            ref={draggableRef}
            onPointerDown={onFocus}
            className="window-pop-in relative hidden w-full px-4 pb-6 sm:px-6 lg:absolute lg:m-4 lg:block lg:w-[700px] xl:w-[800px]"
            style={{
                ...(isDesktop && {
                    left: position.x,
                    top: position.y,
                }),
                zIndex,
            }}
        >
            <div
                className={`overflow-hidden rounded-2xl border border-[#2a2a2a] bg-[#0f1115]/95 shadow-[0_0_30px_rgba(0,0,0,0.3)] backdrop-blur-sm ${className}`}
            >
                {/* Window title bar */}
                <div className="border-b border-[#2a2a2a] bg-[#11151a]">
                    <div
                        onPointerDown={handlePointerDown}
                        onPointerMove={handlePointerMove}
                        onPointerUp={handlePointerUp}
                        className="relative flex cursor-default select-none items-center justify-center px-4 py-3 lg:cursor-grab"
                    >
                        <div className="flex items-center gap-2 text-sm font-semibold text-[#e6e6e6]">
                            <FolderOpen size={15} strokeWidth={1.8} />
                            {project.name}
                        </div>

                        <div className="absolute right-4 flex items-center gap-3">
                            <WindowsControl onClose={onClose} />
                        </div>
                    </div>
                </div>

                {/* Toolbar / path */}
                <div className="flex items-center gap-2 border-b border-[#2a2a2a] bg-[#151a20] px-4 py-2.5">
                    <button
                        type="button"
                        className="rounded p-1 text-gray-500 transition hover:bg-[#20262e] hover:text-gray-300"
                        aria-label="Back"
                    >
                        <ArrowLeft size={15} />
                    </button>

                    <button
                        type="button"
                        className="rounded p-1 text-gray-600"
                        aria-label="Forward"
                    >
                        <ArrowRight size={15} />
                    </button>

                    <div className="min-w-0 flex-1 rounded-md border border-[#2b323b] bg-[#101419] px-3 py-1.5">
                        <div className="truncate font-mono text-[11px] text-gray-500">
                            /home/kristian/projects/{project.name}
                        </div>
                    </div>
                </div>

                {/* Project folder contents */}
                <main className="bg-[#0f1115] p-5 sm:p-7">

                    {/* Folder header */}
                    <div className="mb-6 flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-[#303640] bg-[#151a20] text-gray-400">
                            <Folder size={21} strokeWidth={1.7} />
                        </div>

                        <div className="min-w-0">
                            <h2 className="truncate text-lg font-semibold text-[#e6e6e6] sm:text-xl">
                                {project.name}
                            </h2>

                            <p className="mt-0.5 text-[11px] text-gray-500">
                                Project folder
                            </p>
                        </div>
                    </div>

                    {/* Screenshots */}
                    {images.length > 0 && (
                        <section className="mb-7">

                            {/* Main screenshot */}
                            <div className="overflow-hidden rounded-lg border border-[#2a2a2a] bg-[#141a21]">
                                <div className="flex items-center justify-between border-b border-[#2a2a2a] bg-[#151a20] px-3 py-2">
                                    <div className="flex min-w-0 items-center gap-2">
                                        <ImageIcon
                                            size={12}
                                            className="shrink-0 text-gray-500"
                                        />

                                        <span className="truncate font-mono text-[10px] text-gray-500">
                                            {heroImage?.split('/').pop()}
                                        </span>
                                    </div>

                                    <span className="shrink-0 text-[10px] text-gray-600">
                                        {selectedImage + 1} / {images.length}
                                    </span>
                                </div>

                                <div className="flex min-h-[220px] items-center justify-center bg-[#0b0e12] p-3 sm:min-h-[300px]">
                                    <img
                                        src={heroImage}
                                        alt={`${project.name} screenshot ${selectedImage + 1}`}
                                        className="max-h-[420px] w-full rounded-md object-contain"
                                    />
                                </div>
                            </div>

                            {/* Screenshot thumbnails */}
                            {images.length > 1 && (
                                <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                                    {images.map((image, index) => (
                                        <button
                                            key={image}
                                            type="button"
                                            onClick={() => setSelectedImage(index)}
                                            className={`group shrink-0 overflow-hidden rounded-md border bg-[#141a21] transition ${
                                                selectedImage === index
                                                    ? 'border-[#4FC1E9]'
                                                    : 'border-[#2a2a2a] hover:border-[#4FC1E9]'
                                            }`}
                                            aria-label={`View screenshot ${index + 1}`}
                                        >
                                            <img
                                                src={image}
                                                alt={`${project.name} screenshot ${index + 1}`}
                                                className={`h-16 w-24 object-cover transition sm:h-20 sm:w-28 ${
                                                    selectedImage === index
                                                        ? 'opacity-100'
                                                        : 'opacity-60 group-hover:opacity-100'
                                                }`}
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </section>
                    )}

                    {/* README */}
                    <section>
                        <div className="mb-3 flex items-center gap-2">
                            <FileText
                                size={14}
                                strokeWidth={1.7}
                                className="text-gray-500"
                            />

                            <span className="font-mono text-[10px] font-semibold tracking-[0.12em] text-gray-500">
                                README.md
                            </span>
                        </div>

                        <div className="rounded-lg border border-[#2c333c] bg-[#12171d] p-4 sm:p-5">
                            <h3 className="mb-3 text-lg font-semibold text-[#e6e6e6]">
                                {project.name}
                            </h3>

                            <p className="max-w-[680px] text-sm leading-7 text-gray-400">
                                {project.description}
                            </p>
                        </div>
                    </section>

                    {/* Tech stack */}
                    <section className="mt-6">
                        <div className="mb-3 flex items-center gap-2">
                            <Package
                                size={14}
                                strokeWidth={1.7}
                                className="text-gray-500"
                            />

                            <span className="font-mono text-[10px] font-semibold tracking-[0.12em] text-gray-500">
                                TECHNOLOGIES
                            </span>
                        </div>

                        <div className="rounded-lg border border-[#2c333c] bg-[#12171d] p-4">
                            <div className="flex flex-wrap gap-2">
                                {project.tech.map((technology) => (
                                    <span
                                        key={technology}
                                        className="rounded-md border border-[#303640] bg-[#151a20] px-2.5 py-1.5 text-xs text-gray-300"
                                    >
                                        {technology}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Actions */}
                    <section className="mt-6">
                        <div className="mb-3 flex items-center gap-2">
                            <ExternalLink
                                size={14}
                                strokeWidth={1.7}
                                className="text-gray-500"
                            />

                            <span className="font-mono text-[10px] font-semibold tracking-[0.12em] text-gray-500">
                                PROJECT LINKS
                            </span>
                        </div>

                        <div className="flex flex-col gap-3 rounded-lg border border-[#2c333c] bg-[#12171d] p-3 sm:flex-row sm:items-center sm:justify-between">
                            <div className="min-w-0">
                                <div className="mb-1 text-[10px] text-gray-600">
                                    repository
                                </div>

                                <div className="truncate font-mono text-xs text-gray-400">
                                    {project.link}
                                </div>
                            </div>

                            <div className="flex shrink-0 gap-2">
                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center gap-2 rounded-md border border-[#303640] bg-[#151a20] px-3 py-2 text-xs font-semibold text-gray-300 transition hover:border-[#4FC1E9] hover:text-[#4FC1E9]"
                                >
                                    GitHub
                                </a>

                                {project.demo && (
                                    <a
                                        href={project.demo}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex items-center gap-2 rounded-md bg-[#4FC1E9] px-3 py-2 text-xs font-semibold text-[#10151a] transition hover:brightness-110"
                                    >
                                        <ExternalLink size={14} />
                                        Live Demo
                                    </a>
                                )}
                            </div>
                        </div>
                    </section>

                    {/* Folder status bar */}
                    <div className="mt-6 flex items-center justify-between border-t border-[#2a2a2a] pt-3 text-[10px] text-gray-600">
                        <div className="flex items-center gap-1.5">
                            <HardDrive size={11} />
                            <span>
                                {images.length} image
                                {images.length !== 1 ? 's' : ''}
                            </span>
                        </div>

                        <span>
                            /home/kristian/projects
                        </span>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default ProjectWindow