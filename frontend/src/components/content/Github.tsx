import Browser from "../apps/Browser";
import GithubIcon from "../../assets/icons/github-icon.png";

interface GithubProps {
    className?: string;
    initialX?: number;
    initialY?: number;
    zIndex?: number;
    onFocus?: () => void;
    onClose?: () => void;
}

const repositories = [
    ["Code-Lab-Exercise-1", "Jupyter Notebook", "#da5b0b"],
    ["Green-Cuisine", "JavaScript", "#f1e05a"],
    ["Project-Kresta", "SCSS", "#c6538c"],
    ["PokeFinder", "Jupyter Notebook", "#da5b0b"],
];

const githubLink = "https://github.com/KristKross";

function Github({
    className,
    initialX,
    initialY,
    zIndex,
    onFocus,
    onClose,
}: GithubProps) {
    return (
        <Browser
            tab="GitHub"
            searchBar={githubLink}
            className={className}
            initialX={initialX}
            initialY={initialY}
            zIndex={zIndex}
            onFocus={onFocus}
            onClose={onClose}
        >
            <section className="w-full bg-white p-3 text-slate-900 sm:p-5 md:p-7 lg:p-10">

                {/* Profile Header */}
                <header className="flex flex-wrap items-center gap-3 border-b border-slate-200 pb-4 sm:gap-4 sm:pb-5 lg:pb-6">
                    <div className="flex items-center gap-2 text-lg font-semibold sm:gap-3 sm:text-xl">
                        <img
                            src={GithubIcon}
                            alt="GitHub"
                            className="h-6 w-6 object-contain sm:h-7 sm:w-7 lg:h-8 lg:w-8"
                        />

                        <span className="text-xs sm:text-sm">
                            KristKross
                        </span>
                    </div>

                    <div className="flex min-w-[160px] flex-1 items-center gap-2 rounded-md border border-slate-300 px-2.5 py-1.5 text-xs text-slate-500 sm:min-w-[220px] sm:px-3 sm:py-2 sm:text-sm">
                        <span className="text-base sm:text-lg">⌕</span>
                        <span>Type / to search</span>
                    </div>
                </header>

                {/* Navigation */}
                <nav
                    className="flex gap-4 overflow-x-auto border-b border-slate-200 text-xs font-medium text-slate-600 sm:gap-6 sm:text-sm md:gap-7"
                    aria-label="GitHub navigation"
                >
                    <button
                        type="button"
                        className="relative shrink-0 py-3 text-slate-900 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-orange-500 sm:py-4"
                    >
                        Overview
                    </button>

                    <button
                        type="button"
                        className="shrink-0 py-3 sm:py-4"
                    >
                        Repositories
                    </button>

                    <button
                        type="button"
                        className="shrink-0 py-3 sm:py-4"
                    >
                        Projects
                    </button>
                </nav>

                {/* Content */}
                <div className="py-5 sm:py-6 md:py-7 lg:py-8">

                    {/* Profile */}
                    <div className="mb-5 flex flex-col sm:mb-7 lg:mb-8">
                        <div
                            className="h-16 w-16 rounded-full border-4 border-slate-200 bg-slate-300 sm:h-20 sm:w-20 lg:h-24 lg:w-24"
                            aria-label="Profile image placeholder"
                        />

                        <p className="mt-2 text-base font-semibold sm:mt-3 sm:text-lg">
                            KristKross
                        </p>
                    </div>

                    <h2 className="mb-4 text-base font-semibold sm:mb-5 sm:text-lg">
                        Popular Repositories
                    </h2>

                    <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
                        {repositories.map(([name, language, color]) => (
                            <article
                                key={name}
                                className="flex h-full flex-col rounded-md border border-slate-200 p-3 transition hover:border-orange-400 sm:p-4 lg:p-5"
                            >
                                <a
                                    href="#"
                                    className="text-xs font-semibold text-blue-700 hover:underline sm:text-sm"
                                >
                                    {name}
                                </a>

                                <div className="mt-auto flex flex-wrap items-center gap-2 pt-4 text-[10px] text-slate-500 sm:gap-4 sm:pt-5 sm:text-xs">
                                    <span className="flex items-center gap-1.5">
                                        <i
                                            className="h-2.5 w-2.5 rounded-full sm:h-3 sm:w-3"
                                            style={{ backgroundColor: color }}
                                        />
                                        {language}
                                    </span>

                                    <span>★ 1</span>
                                    <span>Public</span>
                                </div>
                            </article>
                        ))}
                    </div>

                    <a
                        href={githubLink}
                        target="_blank"
                        rel="noreferrer"
                        className="mx-auto mt-7 block w-fit text-xs font-medium text-blue-700 hover:underline sm:mt-9 sm:text-sm lg:mt-10"
                    >
                        View GitHub Profile →
                    </a>
                </div>
            </section>
        </Browser>
    );
}

export default Github