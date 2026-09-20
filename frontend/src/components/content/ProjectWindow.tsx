import useDraggable from '../../hooks/useDraggable'
import WindowsControl from '../desktop/WindowControls'

export interface Project {
    name: string
    description: string
    tech: string[]
    link: string
    demo?: string
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

    return (
        <div
            ref={draggableRef}
            onPointerDown={onFocus}
            className=" window-pop-in hidden relative w-full px-4 pb-6 sm:px-6 lg:absolute lg:m-4 lg:w-[700px] xl:w-[760px] lg:block"
            style={
                { ...(isDesktop && {
                    left: position.x,
                    top: position.y,
                }),
                zIndex }
            }
        >
            <div className={`overflow-hidden rounded-2xl border border-[#2a2a2a] bg-[#0f1115]/95 shadow-[0_0_30px_rgba(0,0,0,0.3)] backdrop-blur-sm ${className}`}>

                {/* Title bar */}
                <div className="border-b border-[#2a2a2a] bg-[#11151a]">
                    <div
                        onPointerDown={handlePointerDown}
                        onPointerMove={handlePointerMove}
                        onPointerUp={handlePointerUp}
                        className="relative flex cursor-default select-none items-center justify-center px-4 py-3 lg:cursor-grab"
                    >
                        <div className="text-sm font-semibold text-[#e6e6e6]">
                            {project.name}
                        </div>

                        <div className="absolute right-4 flex items-center gap-3">
                            <WindowsControl
                                onClose={onClose}
                            />
                        </div>
                    </div>
                </div>

                {/* Project content */}
                <main className="bg-[#0f1115] p-6 sm:p-8">
                    <div className="mb-6 text-[11px] text-gray-500">
                        /home/kristian/projects/{project.name}
                    </div>
                    <div className="mb-3">
                        <h2 className="text-xl font-semibold text-[#e6e6e6] sm:text-2xl">
                            {project.name}
                        </h2>
                    </div>
                    <p className="max-w-[650px] text-sm leading-7 text-gray-400">
                        {project.description}
                    </p>

                    {project.demo && (
                        <>
                            <div className="my-7 border-t border-[#2a2a2a]" />

                            <section>
                                <div className="mb-3 text-[10px] font-semibold tracking-[0.12em] text-gray-500">
                                    DEMO
                                </div>

                                <div className="flex justify-center">
                                    <video
                                        src={project.demo} muted controls playsInline preload="metadata"
                                        className="aspect-video h-[150px] w-full rounded-lg border border-[#2a2a2a] bg-black object-cover"
                                    />
                                </div>
                            </section>
                        </>
                    )}

                    <div className="my-7 border-t border-[#2a2a2a]" />

                    <section>
                        <div className="mb-3 text-[10px] font-semibold tracking-[0.12em] text-gray-500">
                            TECH STACK
                        </div>

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
                    </section>

                    <div className="my-7 border-t border-[#2a2a2a]" />

                    <section>
                        <div className="mb-3 text-[10px] font-semibold tracking-[0.12em] text-gray-500">
                            PROJECT
                        </div>

                        <div
                            className="flex flex-col gap-4 rounded-lg border border-[#2c333c] bg-[#12171d] p-3 sm:flex-row sm:items-center sm:just"
                        >
                            <span className="min-w-0 break-all text-xs text-gray-400">
                                {project.link}
                            </span>

                            <a href={project.link} target="_blank" rel="noreferrer"
                                className="shrink-0 rounded-md bg-[#4FC1E9] px-3 py-2 text-center text-xs font-semibold text-[#10151a] transition hover:brightness-110"
                            >
                                Open Project
                            </a>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    )
}

export default ProjectWindow