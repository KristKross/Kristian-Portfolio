import { useEffect, useState } from 'react'
import Terminal from '../components/apps/Terminal'
import ImageViewer from '../components/apps/ImageViewer'
import MarkdownViewer from '../components/apps/MarkdownViewer'
import type { BringToFront, WindowZIndexes } from '../types/window'

interface LandingProps {
    windowZIndexes: WindowZIndexes
    bringToFront: BringToFront
}

const LandingContent = (
    <div className="text-gray-700">
        <h1 className="block text-3xl font-bold text-gray-900 md:text-5xl">
            Kristian Demonteverde
        </h1>

        <h2 className="mb-2 block text-2xl text-gray-600 md:text-3xl">
            Software Developer
        </h2>

        <p className="my-10 block min-w-[300px] max-w-[600px] text-base leading-[1.5] md:text-xl">
            I build clean, scalable systems and experiment with cyber-inspired
            interfaces. I enjoy turning ideas into fast, functional, and
            well-designed applications.
        </p>

        <div className="space-y-1 text-base md:text-xl">
            <p>
                <span className="text-[#4FC1E9]">Frontend → </span>
                <span className="font-semibold">
                    React, TypeScript, Tailwind
                </span>
            </p>

            <p>
                <span className="text-[#4FC1E9]">Backend → </span>
                <span className="font-semibold">
                    Node.js, Express, REST APIs
                </span>
            </p>

            <p>
                <span className="text-[#4FC1E9]">Languages → </span>
                <span className="font-semibold">
                    TypeScript · JavaScript · Python
                </span>
            </p>
        </div>
    </div>
);

function ScrollPrompt() {
    const [isVisible, setIsVisible] = useState(true)

    useEffect(() => {
        let ticking = false

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    setIsVisible(false)
                    ticking = false
                })

                ticking = true
            }
        }

        window.addEventListener('scroll', handleScroll, {
            passive: true,
        })

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const handleClick = () => {
        document
            .getElementById('about')
            ?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <button
            type="button"
            onClick={handleClick}
            className={`absolute bottom-0 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-gray-400 transition-all duration-500 ease-out hover:text-gray-200 ${isVisible ? 'visible translate-y-0 opacity-100 blur-none' : 'invisible -translate-y-3 opacity-0 blur-sm pointer-events-none'}`}
        >
            <span className="text-[20px]">
                SCROLL TO CONTINUE
            </span>

            <span className="animate-bounce text-[20px]">
                ↓
            </span>
        </button>
    )
}

function Landing({ windowZIndexes, bringToFront }: LandingProps) {
    return (
        <section id="landing" className="relative mt-8 flex flex-col items-center justify-center gap-6 px-2 py-4 lg:min-h-[calc(100vh-20px)]">
            <Terminal
                title="kristian@portfolio: ~"
                initialX={900}
                initialY={60}
                zIndex={windowZIndexes.landingTerminal}
                onFocus={() => bringToFront('landingTerminal')}
                lines={[
                    {
                        input: [
                            {
                                text: "whoami",
                                className: "text-[#4FC1E9]",
                            },
                        ],
                        output: [
                            {
                                text: "kristian",
                                className: "text-[#9A9A9A]",
                            },
                        ],
                    },
                    {
                        input: [
                            {
                                text: "xdg-open",
                                className: "text-[#4FC1E9]",
                            },
                            {
                                text: " profile.jpg",
                                className: "text-[#E6E6E6]",
                            },
                        ],
                        output: (
                            <div className="mb-5 text-[#9A9A9A]">
                                <span className="text-[#6F9D62]">
                                    [ OK ]
                                </span>{" "}
                                Opening profile.jpg ...
                            </div>
                        )
                    },
                    {
                        input: [
                            {
                                text: "xdg-open",
                                className: "text-[#4FC1E9]",
                            },
                            {
                                text: " profile.md",
                                className: "text-[#E6E6E6]",
                            },
                        ],
                        output: (
                            <div className="mb-5 text-[#9A9A9A]">
                                <span className="text-[#6F9D62]">
                                    [ OK ]
                                </span>{" "}
                                Opening profile.md ...
                            </div>
                        )
                    },
                ]}
                prompt="kristian@portfolio:~$"
            />

            <ImageViewer
                initialX={140}
                initialY={70}
                zIndex={windowZIndexes.imageViewer}
                onFocus={() => bringToFront('imageViewer')}
                className="sm:max-w-[100%] md:max-w-[100%] lg:max-w-[600px]"
            />

            <MarkdownViewer
                title="profile.md"
                initialX={700}
                initialY={370}
                zIndex={windowZIndexes.profileMarkdown}
                onFocus={() => bringToFront('profileMarkdown')}
                className="w-full max-w-[920px]"
                text={LandingContent}
            />

            <ScrollPrompt />
        </section>
    )
}

export default Landing