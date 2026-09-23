import { useState } from 'react'
import {
    ChevronLeft,
    ChevronRight,
    Code2,
    ExternalLink,
    FileText,
    FolderOpen,
    HardDrive,
    Image as ImageIcon,
    Package,
    Play,
    X,
} from 'lucide-react'
import useDraggable from '../../hooks/useDraggable'
import WindowsControl from '../desktop/WindowControls'

export interface Project {
    _id: string
    title: string
    description: string
    technologies: string[]
    liveUrl: string
    videoUrl: string
    githubUrl: string
    images: string[]
    order: number
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
    } = useDraggable<HTMLDivElement>(initialX, initialY)

    const [selectedImage, setSelectedImage] = useState(0)
    const [isImageViewerOpen, setIsImageViewerOpen] = useState(false)

    const images = project.images ?? []
    const heroImage = images[selectedImage]

    const showPreviousImage = () => {
        setSelectedImage((current) =>
            current === 0 ? images.length - 1 : current - 1
        )
    }

    const showNextImage = () => {
        setSelectedImage((current) =>
            current === images.length - 1 ? 0 : current + 1
        )
    }

    return (
        <>
            <div
                ref={draggableRef}
                onPointerDown={onFocus}
                className="window-pop-in relative hidden w-full px-3 pb-4 lg:absolute lg:m-3 lg:block lg:w-[850px] xl:w-[950px]"
                style={{
                    ...(isDesktop && {
                        left: position.x,
                        top: position.y,
                    }),
                    zIndex,
                }}
            >
                <div
                    className={`overflow-hidden rounded-xl border border-[#2a2a2a] bg-[#0f1115]/95 shadow-[0_0_30px_rgba(0,0,0,0.3)] backdrop-blur-sm ${className}`}
                >
                    {/* Window title bar */}
                    <div className="border-b border-[#2a2a2a] bg-[#11151a]">
                        <div
                            onPointerDown={handlePointerDown}
                            onPointerMove={handlePointerMove}
                            onPointerUp={handlePointerUp}
                            className="relative flex cursor-default select-none items-center justify-center px-4 py-3 lg:cursor-grab"
                        >
                            <div className="flex min-w-0 items-center gap-2 text-sm font-semibold text-[#e6e6e6]">
                                <FolderOpen size={15} strokeWidth={1.8} />
                                <span className="truncate">
                                    {project.title}
                                </span>
                            </div>

                            <div className="absolute right-3 flex items-center">
                                <WindowsControl onClose={onClose} />
                            </div>
                        </div>
                    </div>

                    {/* Path bar */}
                    <div className="border-b border-[#2a2a2a] bg-[#151a20] px-4 py-2.5">
                        <div className="rounded-md border border-[#2b323b] bg-[#101419] px-3 py-2">
                            <div className="truncate font-mono text-xs text-gray-500">
                                /home/kristian/projects/{project.title}
                            </div>
                        </div>
                    </div>

                    {/* Main content */}
                    <main className="bg-[#0f1115] p-5">
                        <div className="grid grid-cols-[1.45fr_1fr] gap-5">

                            {/* LEFT — Screenshots */}
                            <section className="min-w-0">
                                <div className="mb-3 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <ImageIcon
                                            size={15}
                                            strokeWidth={1.7}
                                            className="text-gray-500"
                                        />

                                        <span className="font-mono text-[11px] font-semibold tracking-[0.12em] text-gray-500">
                                            SCREENSHOTS
                                        </span>
                                    </div>

                                    {images.length > 0 && (
                                        <span className="font-mono text-[11px] text-gray-600">
                                            {selectedImage + 1} / {images.length}
                                        </span>
                                    )}
                                </div>

                                {images.length > 0 ? (
                                    <>
                                        {/* Main screenshot */}
                                        <div className="overflow-hidden rounded-md border border-[#2a2a2a] bg-[#141a21]">
                                            <div className="flex items-center gap-2 border-b border-[#2a2a2a] bg-[#151a20] px-3 py-2">
                                                <ImageIcon
                                                    size={13}
                                                    strokeWidth={1.7}
                                                    className="shrink-0 text-gray-600"
                                                />

                                                <span className="truncate font-mono text-[11px] text-gray-500">
                                                    {heroImage?.split('/').pop()}
                                                </span>
                                            </div>

                                            {/* Fixed image size */}
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setIsImageViewerOpen(true)
                                                }
                                                className="flex aspect-video w-full items-center justify-center bg-[#090c10] p-3"
                                                aria-label="Open image viewer"
                                            >
                                                <img
                                                    src={heroImage}
                                                    alt={`${project.title} screenshot ${selectedImage + 1}`}
                                                    className="h-full w-full cursor-zoom-in object-contain"
                                                />
                                            </button>
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
                                                                ? 'border-[#4FC1E9]'
                                                                : 'border-[#2a2a2a] hover:border-[#4FC1E9]'
                                                        }`}
                                                    >
                                                        <img
                                                            src={image}
                                                            alt={`${project.title} screenshot ${index + 1}`}
                                                            className={`h-14 w-20 object-cover transition ${
                                                                selectedImage === index
                                                                    ? 'opacity-100'
                                                                    : 'opacity-50 hover:opacity-100'
                                                            }`}
                                                        />
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <div className="flex aspect-video items-center justify-center rounded-md border border-dashed border-[#2a2a2a] bg-[#090c10]">
                                        <span className="font-mono text-xs text-gray-600">
                                            no screenshots available
                                        </span>
                                    </div>
                                )}
                            </section>

                            {/* RIGHT — Project information */}
                            <section className="flex min-w-0 flex-col">

                                {/* README */}
                                <div>
                                    <div className="mb-3 flex items-center gap-2">
                                        <FileText
                                            size={15}
                                            strokeWidth={1.7}
                                            className="text-gray-500"
                                        />

                                        <span className="font-mono text-[11px] font-semibold tracking-[0.12em] text-gray-500">
                                            README.md
                                        </span>
                                    </div>

                                    <div className="rounded-md border border-[#2c333c] bg-[#12171d] p-4">
                                        <h3 className="mb-3 text-sm font-semibold text-[#e6e6e6]">
                                            {project.title}
                                        </h3>

                                        <p className="text-xs leading-5 text-gray-400">
                                            {project.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Technologies */}
                                <div className="mt-5">
                                    <div className="mb-3 flex items-center gap-2">
                                        <Package
                                            size={15}
                                            strokeWidth={1.7}
                                            className="text-gray-500"
                                        />

                                        <span className="font-mono text-[11px] font-semibold tracking-[0.12em] text-gray-500">
                                            TECHNOLOGIES
                                        </span>
                                    </div>

                                    <div className="rounded-md border border-[#2c333c] bg-[#12171d] p-4">
                                        <div className="flex flex-wrap gap-2">
                                            {project.technologies.map(
                                                (technology) => (
                                                    <span
                                                        key={technology}
                                                        className="rounded border border-[#303640] bg-[#151a20] px-2.5 py-1.5 text-[11px] text-gray-300"
                                                    >
                                                        {technology}
                                                    </span>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Project links */}
                                {(project.githubUrl ||
                                    project.liveUrl ||
                                    project.videoUrl) && (
                                    <div className="mt-5">
                                        <div className="mb-3 flex items-center gap-2">
                                            <ExternalLink
                                                size={15}
                                                strokeWidth={1.7}
                                                className="text-gray-500"
                                            />

                                            <span className="font-mono text-[11px] font-semibold tracking-[0.12em] text-gray-500">
                                                PROJECT LINKS
                                            </span>
                                        </div>

                                        <div className="flex flex-wrap gap-2 rounded-md border border-[#2c333c] bg-[#12171d] p-3">
                                            {project.githubUrl && (
                                                <a
                                                    href={project.githubUrl}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="flex items-center gap-2 rounded border border-[#303640] bg-[#151a20] px-3 py-2 text-[11px] font-semibold text-gray-300 transition hover:border-[#4FC1E9] hover:text-[#4FC1E9]"
                                                >
                                                    <Code2 size={14} />
                                                    GitHub
                                                </a>
                                            )}

                                            {project.liveUrl && (
                                                <a
                                                    href={project.liveUrl}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="flex items-center gap-2 rounded bg-[#4FC1E9] px-3 py-2 text-[11px] font-semibold text-[#10151a] transition hover:brightness-110"
                                                >
                                                    <ExternalLink size={14} />
                                                    Live Demo
                                                </a>
                                            )}

                                            {project.videoUrl && (
                                                <a
                                                    href={project.videoUrl}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="flex items-center gap-2 rounded border border-[#303640] bg-[#151a20] px-3 py-2 text-[11px] font-semibold text-gray-300 transition hover:border-[#4FC1E9] hover:text-[#4FC1E9]"
                                                >
                                                    <Play size={14} />
                                                    Watch Video
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                )}

                                <div className="flex-1" />
                            </section>
                        </div>

                        {/* Status bar */}
                        <div className="mt-4 flex items-center justify-between border-t border-[#2a2a2a] pt-3 text-xs text-gray-600">
                            <div className="flex items-center gap-1.5">
                                <HardDrive size={12} />

                                <span>
                                    {images.length} image
                                    {images.length !== 1 ? 's' : ''}
                                </span>
                            </div>

                            <span className="truncate">
                                /home/kristian/projects
                            </span>
                        </div>
                    </main>
                </div>
            </div>

            {/* Fullscreen image viewer */}
            {isImageViewerOpen && heroImage && (
                <div
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-6"
                    onClick={() => setIsImageViewerOpen(false)}
                >
                    {/* Close button */}
                    <button
                        type="button"
                        onClick={() => setIsImageViewerOpen(false)}
                        className="absolute right-5 top-5 z-10 rounded-md border border-[#303640] bg-[#151a20] p-2 text-gray-300 transition hover:border-[#4FC1E9] hover:text-[#4FC1E9]"
                        aria-label="Close image viewer"
                    >
                        <X size={20} />
                    </button>

                    {/* Previous */}
                    {images.length > 1 && (
                        <button
                            type="button"
                            onClick={(event) => {
                                event.stopPropagation()
                                showPreviousImage()
                            }}
                            className="absolute left-5 top-1/2 z-10 -translate-y-1/2 rounded-md border border-[#303640] bg-[#151a20]/90 p-2 text-gray-300 transition hover:border-[#4FC1E9] hover:text-[#4FC1E9]"
                            aria-label="Previous image"
                        >
                            <ChevronLeft size={24} />
                        </button>
                    )}

                    {/* Image */}
                    <div
                        className="relative flex max-h-[90vh] max-w-[90vw] items-center justify-center"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <img
                            src={heroImage}
                            alt={`${project.title} screenshot ${selectedImage + 1}`}
                            className="max-h-[90vh] max-w-[90vw] object-contain"
                        />

                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded bg-black/70 px-3 py-1 font-mono text-xs text-gray-300">
                            {selectedImage + 1} / {images.length}
                        </div>
                    </div>

                    {/* Next */}
                    {images.length > 1 && (
                        <button
                            type="button"
                            onClick={(event) => {
                                event.stopPropagation()
                                showNextImage()
                            }}
                            className="absolute right-5 top-1/2 z-10 -translate-y-1/2 rounded-md border border-[#303640] bg-[#151a20]/90 p-2 text-gray-300 transition hover:border-[#4FC1E9] hover:text-[#4FC1E9]"
                            aria-label="Next image"
                        >
                            <ChevronRight size={24} />
                        </button>
                    )}
                </div>
            )}
        </>
    )
}

export default ProjectWindow