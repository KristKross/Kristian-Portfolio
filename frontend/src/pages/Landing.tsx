import { useEffect, useState } from "react"
import Terminal from "../components/apps/Terminal"
import ImageViewer from "../components/apps/ImageViewer"
import MarkdownViewer from "../components/apps/MarkdownViewer"
import ProfileImage from "../assets/profile-image.png"
import type { BringToFront, WindowZIndexes } from "../types/window"
import useSectionAppearance from "../hooks/useSectionAppearance"

interface LandingProps {
    windowZIndexes: WindowZIndexes
    bringToFront: BringToFront
}

function LandingContent() {
    const handleSectionClick = (id: string) => {
        const element = document.getElementById(id)

        if (!element) return

        const navbarHeight = 32

        const elementPosition =
            element.getBoundingClientRect().top + window.scrollY

        window.scrollTo({
            top: elementPosition - navbarHeight,
            behavior: "smooth",
        })
    }

    return (
        <div className="text-gray-700">
            <h1 className="block text-3xl font-bold text-gray-900 md:text-5xl">
                Kristian Demonteverde
            </h1>

            <h2 className="mb-2 block text-2xl text-gray-600 md:text-3xl">
                Software Developer
            </h2>

            <p className="my-10 block min-w-[300px] max-w-[600px] text-base leading-[1.5] md:text-xl">
                I am a developer who enjoys building things from the ground up.
                I like exploring new technologies, solving problems, and turning
                my interests and ideas into{" "}
                <button
                    type="button"
                    onClick={() => handleSectionClick("projects")}
                    className="font-semibold text-[#4FC1E9] underline decoration-[#4FC1E9]/40 underline-offset-4 transition-colors hover:text-[#2D9CC5] hover:decoration-white"
                >
                    applications
                </button>{" "}
                that I can{" "}
                <button
                    type="button"
                    onClick={() => handleSectionClick("contact")}
                    className="font-semibold text-[#4FC1E9] underline decoration-[#4FC1E9]/40 underline-offset-4 transition-colors hover:text-[#2D9CC5] hover:decoration-white"
                >
                    share with others
                </button>
                .
            </p>

            <p className="text-sm md:text-base">
                <span className="font-semibold text-[#00D26A]">
                    Currently →
                </span>{" "}
                Building projects · Learning · Experimenting
            </p>
        </div>
    )
}

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

        window.addEventListener("scroll", handleScroll, {
            passive: true,
        })

        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [])

    const handleClick = () => {
        const element = document.getElementById("about")

        if (!element) return

        const navbarHeight = 32

        const elementPosition =
            element.getBoundingClientRect().top + window.scrollY

        window.scrollTo({
            top: elementPosition - navbarHeight,
            behavior: "smooth",
        })
    }

    return (
        <button
            type="button"
            onClick={handleClick}
            className={`absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-gray-400 transition-all duration-500 ease-out hover:text-gray-200 ${
                isVisible
                    ? "visible translate-y-0 opacity-100 blur-none"
                    : "invisible -translate-y-3 opacity-0 blur-sm pointer-events-none"
            }`}
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
    const { sectionRef, visible } = useSectionAppearance([
        200,
        1000,
        1200,
        1200,
    ])

    return (
        <section
            ref={sectionRef}
            id="landing"
            className="relative flex flex-col items-center justify-center gap-6 px-2 pt-8 lg:min-h-[calc(100vh-20px)]"
        >
            {visible[0] && (
                <Terminal
                    title="kristian@portfolio: ~"
                    initialX={900}
                    initialY={60}
                    zIndex={windowZIndexes.landingTerminal}
                    onFocus={() => bringToFront("landingTerminal")}
                    lines={[
                        {
                            input: (
                                <div className="text-[#4FC1E9]">
                                    whoami
                                </div>
                            ),
                            output: (
                                <div className="mb-5 text-[#9A9A9A]">
                                    kristian
                                </div>
                            ),
                        },
                        {
                            input: (
                                <div>
                                    <span className="text-[#4FC1E9]">
                                        xdg-open
                                    </span>{" "}
                                    <span className="text-[#E6E6E6]">
                                        profile.jpg
                                    </span>
                                </div>
                            ),
                            output: (
                                <div className="mb-5 text-[#9A9A9A]">
                                    <span className="text-[#6F9D62]">
                                        [ OK ]
                                    </span>{" "}
                                    Opening profile.jpg ...
                                </div>
                            ),
                        },
                        {
                            input: (
                                <div>
                                    <span className="text-[#4FC1E9]">
                                        xdg-open
                                    </span>{" "}
                                    <span className="text-[#E6E6E6]">
                                        profile.md
                                    </span>
                                </div>
                            ),
                            output: (
                                <div className="mb-5 text-[#9A9A9A]">
                                    <span className="text-[#6F9D62]">
                                        [ OK ]
                                    </span>{" "}
                                    Opening profile.md ...
                                </div>
                            ),
                        },
                    ]}
                    prompt="kristian@portfolio:~$"
                />
            )}

            {visible[1] && (
                <ImageViewer
                    initialX={140}
                    initialY={70}
                    zIndex={windowZIndexes.imageViewer}
                    onFocus={() => bringToFront("imageViewer")}
                    image={ProfileImage}
                    className="sm:max-w-[100%] md:max-w-[100%] lg:max-w-[600px]"
                />
            )}

            {visible[2] && (
                <MarkdownViewer
                    title="profile.md"
                    initialX={700}
                    initialY={240}
                    zIndex={windowZIndexes.profileMarkdown}
                    onFocus={() => bringToFront("profileMarkdown")}
                    className="w-full max-w-[920px]"
                    text={<LandingContent />}
                />
            )}

            {visible[3] && <ScrollPrompt />}
        </section>
    )
}

export default Landing