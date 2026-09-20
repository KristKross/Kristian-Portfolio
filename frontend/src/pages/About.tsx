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
            Hi, I'm Kristian — a Software Developer focused on building clean,
            scalable, and reliable applications. I enjoy working across the
            stack, from designing intuitive interfaces to developing backend
            systems, APIs, and database solutions. I'm also interested in
            exploring developer tools, automation, and cyber-inspired
            interfaces that make software feel more engaging.
        </p>

        <h2 className="mt-12 text-lg font-bold sm:text-xl md:text-2xl">
            What I Do
        </h2>

        <div className="mt-4 space-y-1 text-sm sm:text-base md:text-lg">
            <p>
                <span className="mr-2 inline-block w-[38px] text-gray-400">
                    01
                </span>
                Build full-stack web applications
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
                Design clean, functional user interfaces
            </p>

            <p>
                <span className="mr-2 inline-block w-[38px] text-gray-400">
                    04
                </span>
                Work with databases and application architecture
            </p>

            <p>
                <span className="mr-2 inline-block w-[38px] text-gray-400">
                    05
                </span>
                Explore automation and developer tooling
            </p>
        </div>

        <h2 className="mt-12 text-lg font-bold sm:text-xl md:text-2xl">
            How I Work
        </h2>

        <p className="mt-4 text-sm text-gray-600 sm:text-base md:text-lg">
            I care about writing maintainable code, keeping interfaces simple,
            and building systems that are practical and reliable. I like taking
            an idea from concept to a working application — while continuously
            learning, experimenting, and improving along the way.
        </p>
    </div>
);

function About({ windowZIndexes, bringToFront }: AboutProps) {
    return (
        <section id="about" className="relative mt-8 flex flex-col items-center justify-center gap-6 px-2 min-h-screen">
            <Terminal
                title="kristian@portfolio: ~"
                lines={[
                    {
                        input: [
                            {
                                text: "xdg-open",
                                className: "text-xs sm:text-sm md:text-base text-[#4FC1E9]",
                            },
                            {
                                text: " about.md",
                                className: "text-xs sm:text-sm md:text-base text-white",
                            },
                        ],
                        output: (
                            <div className="mb-5 text-[#9A9A9A]">
                                <span className="text-[#6F9D62]">
                                    [ OK ]
                                </span>{" "}
                                Opening about.md ...
                            </div>
                        )
                    },
                ]}
                prompt="kristian@portfolio:~$"
                initialX={200}
                initialY={60}
                zIndex={windowZIndexes.aboutTerminal}
                onFocus={() => bringToFront("aboutTerminal")}
                className="min-[1200px]:left-[15%]"
            />

            <MarkdownViewer
                title="about.md"
                initialX={700}
                initialY={90}
                zIndex={windowZIndexes.aboutMarkdown}
                onFocus={() => bringToFront("aboutMarkdown")}
                className="min-[1500px]:right-[10%] w-full max-w-[920px]"
                text={AboutContent}
            />
        </section>
    );
}

export default About;