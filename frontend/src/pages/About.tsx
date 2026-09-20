import { useEffect, useRef, useState } from "react";
import Terminal from "../components/apps/Terminal";
import MarkdownViewer from "../components/apps/MarkdownViewer";
import type { BringToFront, WindowZIndexes } from "../types/window";

interface AboutProps {
    windowZIndexes: WindowZIndexes;
    bringToFront: BringToFront;
}

const AboutContent = (
    <div className="text-gray-700">
        <h1 className="text-lg font-bold sm:text-xl md:text-2xl">
            About Me
        </h1>

        <p className="mt-4 text-sm text-gray-600 sm:text-base md:text-lg">
            Hi, I'm Kristian — a Software Developer who enjoys building things
            and figuring out how they work. I like taking an idea, breaking it
            down, and turning it into something I can actually use.
        </p>

        <p className="mt-4 text-sm text-gray-600 sm:text-base md:text-lg">
            I'm interested in web development, software, cybersecurity, and the
            creative side of technology. I enjoy experimenting with new tools and
            technologies, especially when they give me a chance to build something
            a little different.
        </p>

        <h2 className="mt-12 text-lg font-bold sm:text-xl md:text-2xl">
            What I Do
        </h2>

        <div className="mt-4 space-y-1 text-sm sm:text-base md:text-lg">
            <p>
                <span className="mr-2 inline-block w-[38px] text-gray-400">
                    01
                </span>
                Build web applications
            </p>
            <p>
                <span className="mr-2 inline-block w-[38px] text-gray-400">
                    02
                </span>
                Develop APIs and backend systems
            </p>
            <p>
                <span className="mr-2 inline-block w-[38px] text-gray-400">
                    03
                </span>
                Work with databases and application architecture
            </p>
            <p>
                <span className="mr-2 inline-block w-[38px] text-gray-400">
                    04
                </span>
                Spend time playing video games, chess, and tabletop games
            </p>
        </div>

        <h2 className="mt-12 text-lg font-bold sm:text-xl md:text-2xl">
            How I Work
        </h2>

        <p className="mt-4 text-sm text-gray-600 sm:text-base md:text-lg">
            I like diving into things head on. I learn
            best by building, experimenting, and occasionally breaking things
            along the way. I enjoy the process of figuring things out and making
            them better.
        </p>
    </div>
);

function About({ windowZIndexes, bringToFront }: AboutProps) {
    const sectionRef = useRef<HTMLElement>(null);

    const [showTerminal, setShowTerminal] = useState(false);
    const [showMarkdown, setShowMarkdown] = useState(false);

    useEffect(() => {
        const section = sectionRef.current;

        if (!section) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) return;

                const terminalTimer = setTimeout(() => {
                    setShowTerminal(true);
                }, 300);

                const markdownTimer = setTimeout(() => {
                    setShowMarkdown(true);
                }, 1000);

                observer.disconnect();

                return () => {
                    clearTimeout(terminalTimer);
                    clearTimeout(markdownTimer);
                };
            },
            {
                threshold: 0.2,
            }
        );

        observer.observe(section);

        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="about"
            className="relative mt-8 flex flex-col items-center justify-center gap-6 px-2 min-h-screen"
        >
            {showTerminal && (
                <Terminal
                    title="kristian@portfolio: ~"
                    lines={[
                        {
                            input: (
                                <div className="text-xs sm:text-sm md:text-base">
                                    <span className="text-[#4FC1E9]">
                                        xdg-open
                                    </span>
                                    <span className="text-white">
                                        {" "}about.md
                                    </span>
                                </div>
                            ),
                            output: (
                                <div className="mb-5 text-[#9A9A9A]">
                                    <span className="text-[#6F9D62]">
                                        [ OK ]
                                    </span>{" "}
                                    Opening about.md ...
                                </div>
                            ),
                        },
                    ]}
                    prompt="kristian@portfolio:~$"
                    initialX={200}
                    initialY={40}
                    zIndex={windowZIndexes.aboutTerminal}
                    onFocus={() => bringToFront("aboutTerminal")}
                    className="min-[1200px]:left-[15%]"
                />
            )}

            {showMarkdown && (
                <MarkdownViewer
                    title="about.md"
                    initialX={700}
                    initialY={60}
                    zIndex={windowZIndexes.aboutMarkdown}
                    onFocus={() => bringToFront("aboutMarkdown")}
                    className="min-[1500px]:right-[10%] w-full max-w-[920px]"
                    text={AboutContent}
                />
            )}
        </section>
    );
}

export default About;