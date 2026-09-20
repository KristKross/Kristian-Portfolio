import { useState } from 'react'
import Terminal from '../components/apps/Terminal'
import FileManager, { type Project } from '../components/apps/FileManager'
import ProjectWindow from '../components/content/ProjectWindow'
import type { BringToFront, WindowZIndexes } from '../types/window'
import { useSectionAppearance } from '../hooks/useSectionAppearance'

interface ProjectsProps {
    windowZIndexes: WindowZIndexes
    bringToFront: BringToFront
}

function Projects({ windowZIndexes, bringToFront }: ProjectsProps) {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null)
    const [openedProjects, setOpenedProjects] = useState<Project[]>([])

    const { sectionRef, visible } = useSectionAppearance([300, 1000])

    const openProject = (project: Project) => {
        setSelectedProject(project)

        setOpenedProjects((current) => {
            if (current.some((item) => item.name === project.name)) {
                return current
            }

            return [...current, project]
        })

        bringToFront('projectWindow')
    }

    const closeProject = (project: Project) => {
        setOpenedProjects((current) =>
            current.filter((item) => item.name !== project.name)
        )
    }

    return (
        <section
            ref={sectionRef}
            id="projects"
            className="relative mt-8 flex flex-col items-center justify-center gap-6 px-2 min-h-screen"
        >
            {visible[0] && (
                <Terminal
                    title="kristian@portfolio: ~"
                    lines={[
                        {
                            input: (
                                <span className="text-white">./projects</span>
                            ),
                            output: (
                                <div className="mb-5 text-[#9A9A9A]">
                                    <span className="text-[#6F9D62]">
                                        [ OK ]
                                    </span>{" "}
                                    Opening file manager ...
                                </div>
                            ),
                        },
                    ]}
                    prompt="kristian@portfolio:~$"
                    zIndex={windowZIndexes.projectsTerminal}
                    initialX={200}
                    initialY={60}
                    onFocus={() => bringToFront('projectsTerminal')}
                />
            )}

            {visible[1] && (
                <FileManager
                    zIndex={windowZIndexes.fileManager}
                    initialX={550}
                    initialY={160}
                    onFocus={() => bringToFront('fileManager')}
                    onOpenProject={openProject}
                    selectedProject={selectedProject}
                />
            )}

            {openedProjects.map((project, index) => (
                <ProjectWindow
                    key={project.name}
                    project={project}
                    initialX={400 + index * 40}
                    initialY={50 + index * 40}
                    zIndex={windowZIndexes.projectWindow + index}
                    onFocus={() => bringToFront('projectWindow')}
                    onClose={() => closeProject(project)}
                    className='hidden md:m-0 sm:m-0 lg:block'
                />
            ))}
        </section>
    )
}

export default Projects