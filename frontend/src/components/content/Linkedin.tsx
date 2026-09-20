import Browser from "../apps/Browser";
import LinkedinIcon from "../../assets/icons/linkedin-icon.png";
import ProfileImage from "../../assets/profile-image.png"
import LinkedinBanner from "../../assets/linkedin-banner.png"

interface LinkedinProps {
    className?: string;
    initialX?: number;
    initialY?: number;
    zIndex?: number;
    onFocus?: () => void;
    onClose?: () => void;
}

const linkedinLink = "https://www.linkedin.com/in/kkd14";

function Linkedin({
    className,
    initialX,
    initialY,
    zIndex,
    onFocus,
    onClose,
}: LinkedinProps) {
    return (
        <Browser tab="LinkedIn" searchBar={linkedinLink} className={className} initialX={initialX} initialY={initialY} zIndex={zIndex} onFocus={onFocus} onClose={onClose}>
            <div className="bg-[#f3f2ef] text-[#1d2226]">
                {/* LinkedIn Navigation */}
                <nav className="flex min-w-[200px] items-center gap-5 border-b border-[#d0d3d6] bg-white px-6 py-4 text-sm text-[#666] sm:px-10 lg:h-16 lg:px-20 lg:py-0">
                    <img src={LinkedinIcon} alt="LinkedIn" className="h-8 w-8 object-contain" />

                    <div className="flex min-w-0 flex-1 items-center gap-2 rounded-md bg-[#eef3f8] px-3 py-2">
                        <span className="text-base">⌕</span>
                        <span>Search</span>
                    </div>

                    <div className="hidden items-center gap-5 whitespace-nowrap lg:flex">
                        <span>Home</span>
                        <span>My Network</span>
                        <span>Jobs</span>
                        <span>Messages</span>
                        <span>Me ▾</span>
                    </div>
                </nav>

                {/* Profile */}
                <div className="mx-auto max-w-6xl px-4 pb-4 mt-5 sm:px-8 lg:px-20">
                    <section className="overflow-hidden rounded-lg border border-[#d0d3d6] bg-white">
                        <img src={LinkedinBanner} alt="banner" className="w-full" />

                        <div className="px-5 pb-6 sm:px-6">
                            <div className="-mt-16 flex h-32 w-32 items-center justify-center rounded-full border-4 border-white bg-white sm:-mt-20 sm:h-40 sm:w-40">
                                <img src={ProfileImage} alt="Profile" className="h-full w-full rounded-full" />
                            </div>

                            <h1 className="mt-3 text-2xl font-semibold">
                                Kristian Demonteverde
                            </h1>

                            <p className="mt-1 text-base">
                                Software Developer  
                            </p>

                            <p className="mt-2 text-sm text-[#666]">
                                Dubai, United Arab Emirates
                            </p>

                            <div className="mt-4 flex flex-wrap gap-2">
                                <a
                                    href={linkedinLink}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="rounded-full border-2 border-[#0a66c2] bg-[#0a66c2] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-[#0a66c2]"
                                >
                                    Connect
                                </a>
                                <a
                                    href={linkedinLink}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="rounded-full border border-[#0a66c2] px-5 py-2 text-sm font-semibold text-[#0a66c2] transition-colors hover:bg-[#0a66c2] hover:text-white"
                                >
                                    Message
                                </a>
                            </div>
                        </div>
                    </section>

                    {/* About */}
                    <section className="mt-4 rounded-lg border border-[#d0d3d6] bg-white p-6">
                        <h2 className="text-xl font-semibold">
                            About
                        </h2>

                        <p className="mt-3 leading-7 text-[#444]">
                            Software Developer focused on full-stack applications, backend systems, APIs, databases, and clean user interfaces.
                        </p>
                    </section>

                    {/* Profile Link */}
                    <div className="my-4 flex justify-center">
                        <a href={linkedinLink} target="_blank" rel="noreferrer" className="font-semibold text-[#0a66c2] hover:underline">
                            View LinkedIn Profile →
                        </a>
                    </div>
                </div>
            </div>
        </Browser>
    );
}

export default Linkedin;