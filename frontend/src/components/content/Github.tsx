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
        <Browser tab="GitHub" searchBar={githubLink} className={className} initialX={initialX} initialY={initialY} zIndex={zIndex} onFocus={onFocus} onClose={onClose}>
            <section className="w-full bg-white p-5 text-slate-900 sm:p-10">
                {/* Profile Header */}
                <header className="flex flex-wrap items-center gap-4 border-b border-slate-200 pb-6">
                    <div className="flex items-center gap-3 text-xl font-semibold">
                        <img src={GithubIcon} alt="GitHub" className="h-8 w-8 object-contain" />
                        <span className="text-sm">KristKross</span>
                    </div>

                    <div className="flex min-w-[220px] flex-1 items-center gap-2 rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-500">
                        <span className="text-lg">⌕</span>
                        <span>Type / to search</span>
                    </div>
                </header>

                {/* Navigation */}
                <nav className="flex gap-7 border-b border-slate-200 text-sm font-medium text-slate-600" aria-label="GitHub navigation">
                    <button type="button" className="relative py-4 text-slate-900 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-orange-500">
                        Overview
                    </button>

                    <button type="button" className="py-4">
                        Repositories
                    </button>

                    <button type="button" className="py-4">
                        Projects
                    </button>
                </nav>

                {/* Content */}
                <div className="py-8">
                    <div className="mb-8 flex flex-col">
                        <div className="h-24 w-24 rounded-full border-4 border-slate-200 bg-slate-300" aria-label="Profile image placeholder" />

                        <p className="mt-3 text-lg font-semibold">
                            KristKross
                        </p>
                    </div>

                    <h2 className="mb-5 text-lg font-semibold">
                        Popular Repositories
                    </h2>

                    <div className="grid gap-4 sm:grid-cols-2">
                        {repositories.map(([name, language, color]) => (
                            <article key={name} className="flex h-full flex-col rounded-md border border-slate-200 p-5 hover:border-orange-400">
                                <a href="#" className="font-semibold text-blue-700 hover:underline">
                                    {name}
                                </a>

                                <div className="mt-auto flex flex-wrap items-center gap-4 pt-5 text-xs text-slate-500">
                                    <span className="flex items-center gap-1.5">
                                        <i className="h-3 w-3 rounded-full" style={{ backgroundColor: color }} />
                                        {language}
                                    </span>

                                    <span>★ 1</span>
                                    <span>Public</span>
                                </div>
                            </article>
                        ))}
                    </div>

                    <a href={githubLink} target="_blank" rel="noreferrer" className="mx-auto mt-10 block w-fit text-sm font-medium text-blue-700 hover:underline">
                        View GitHub Profile →
                    </a>
                </div>
            </section>
        </Browser>
    );
}

export default Github;