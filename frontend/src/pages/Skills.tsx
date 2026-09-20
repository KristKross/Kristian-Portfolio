import Terminal from '../components/apps/Terminal'
import SystemMonitor from '../components/apps/SystemMonitor'
import type { BringToFront, WindowZIndexes } from '../types/window'
import { useSectionAppearance } from '../hooks/useSectionAppearance'

interface SkillsProps {
    windowZIndexes: WindowZIndexes
    bringToFront: BringToFront
}

function Skills({ windowZIndexes, bringToFront }: SkillsProps) {
    const { sectionRef, visible } = useSectionAppearance([300, 1000])

    return (
        <section
            ref={sectionRef}
            id="skills"
            className="relative mt-8 flex flex-col items-center justify-center gap-6 px-2 min-h-screen"
        >
            {visible[0] && (
                <Terminal
                    title="kristian@portfolio: ~"
                    initialX={120}
                    initialY={70}
                    lines={[
                        {
                            input: [
                                { text: "./skills", className: "text-white" },
                            ],
                            output: (
                                <div className="mb-5 text-[#9A9A9A]">
                                    <span className="text-[#6F9D62]">
                                        [ OK ]
                                    </span>{" "}
                                    Opening system monitor ...
                                </div>
                            )
                        },
                    ]}
                    prompt="kristian@portfolio:~$"
                    zIndex={windowZIndexes.skillsTerminal}
                    onFocus={() => bringToFront('skillsTerminal')}
                />
            )}

            {visible[1] && (
                <SystemMonitor
                    initialX={700}
                    initialY={90}
                    zIndex={windowZIndexes.systemMonitor}
                    onFocus={() => bringToFront('systemMonitor')}
                />
            )}
        </section>
    )
}

export default Skills