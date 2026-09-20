import WindowControls from '../desktop/WindowControls'
import useDraggable from '../../hooks/useDraggable'

interface SystemMonitorProps {
    className?: string;
    y?: string;
    initialX?: number;
    initialY?: number;
    zIndex?: number;
    onFocus?: () => void;
}

const skillGroups = [
    {
        name: 'DEVELOPMENT',
        skills: [
            ['JavaScript', 'Language', '03'],
            ['TypeScript', 'Language', '03'],
            ['Python', 'Language', '02'],
            ['SQL', 'Language', '02'],
        ],
    },
    {
        name: 'FRONTEND',
        skills: [
            ['React', 'Frontend', '03'],
            ['Next.js', 'Frontend', '03'],
            ['HTML / CSS', 'Frontend', '03'],
        ],
    },
    {
        name: 'BACKEND',
        skills: [
            ['Node.js', 'Backend', '03'],
            ['REST APIs', 'Backend', '02'],
        ],
    },
    {
        name: 'DATABASE',
        skills: [
            ['MySQL', 'Database', '02'],
            ['MongoDB', 'Database', '01'],
        ],
    },
]

function SystemMonitor({
    className,
    initialX,
    initialY,
    zIndex,
    onFocus,
}: SystemMonitorProps) {
    const totalSkills = skillGroups.reduce((total, group) => total + group.skills.length, 0)
    const totalCategories = skillGroups.length
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
            className={`window-pop-in relative flex flex-col lg:absolute lg:m-4 w-full max-w-[920px] px-6 pb-10 ${className}`} 
            style={
                {
                    ...(isDesktop && { left: position.x, top: position.y }),
                    zIndex,
                }
            }
        >
            <div className="overflow-hidden rounded-2xl border border-[#2a2a2a] bg-[#0f1115]/90">

                {/* Header */}
                <div className="border-b border-[#2a2a2a] text-gray-300 bg-[#11151a]">

                    <div
                        onPointerDown={handlePointerDown}
                        onPointerMove={handlePointerMove}
                        onPointerUp={handlePointerUp}
                        className="relative flex cursor-default lg:cursor-grab select-none justify-center px-4 py-2.5"
                    >
                        <span className="text-sm font-semibold text-[#e6e6e6]">
                            System Monitor
                        </span>

                        <div className="absolute right-4 flex items-center justify-center">
                            <WindowControls />
                        </div>
                    </div>

                    <div className="flex gap-2 border-t border-[#2a2a2a] bg-[#141b22] px-4 py-2">
                        {['File', 'View', 'Help'].map((item) => (
                            <button
                                key={item}
                                className="rounded px-2 py-1 text-sm hover:bg-gray-700"
                            >
                                {item}
                            </button>
                        ))}
                    </div>

                </div>

                {/* Content */}
                <main className="bg-[#0f1115] p-4 text-sm text-[#E6E6E6] sm:p-6">

                    {/* Column titles */}
                    <div className="grid grid-cols-4 gap-4 border-b border-[#2a2a2a] pb-3 font-semibold text-[#9A9A9A]">
                        <span>Skills</span>
                        <span>Category</span>
                        <span>Used In</span>
                        <span>Status</span>
                    </div>

                    <div className="min-h-[430px]">

                        {skillGroups.map((group) => (
                            <div key={group.name} className="mt-5">

                                <div className="mb-2 font-semibold text-[#4FC1E9]">
                                    {group.name}
                                </div>

                                {group.skills.map(([skill, category, used]) => (
                                    <div
                                        key={skill}
                                        className="grid grid-cols-4 gap-4 py-1.5"
                                    >
                                        <span>{skill}</span>
                                        <span className="text-[#9A9A9A]">
                                            {category}
                                        </span>
                                        <span>{used}</span>
                                        <span className="text-[#6F9D62]">
                                            Active
                                        </span>
                                    </div>
                                ))}

                            </div>
                        ))}

                    </div>

                    {/* Footer */}
                    <div className="mt-5 flex justify-between border-t border-[#2a2a2a] pt-3 text-[#9A9A9A]">
                        <div>{totalSkills} skills loaded <span className="mx-4">{totalCategories} categories</span></div>
                        <div className="text-[#6F9D62]">
                            ● Operational
                        </div>
                    </div>

                </main>
            </div>
        </div>
    )
}

export default SystemMonitor