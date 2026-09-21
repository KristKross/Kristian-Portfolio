import Browser from "../apps/Browser";
import LinkedinIcon from "../../assets/icons/linkedin-icon.png";
import ProfileImage from "../../assets/profile-image.png";
import LinkedinBanner from "../../assets/linkedin-banner.png";

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
        <Browser
            tab="LinkedIn"
            searchBar={linkedinLink}
            className={className}
            initialX={initialX}
            initialY={initialY}
            zIndex={zIndex}
            onFocus={onFocus}
            onClose={onClose}
        >
            <div className="bg-[#f3f2ef] text-[#1d2226]">

                {/* LinkedIn Navigation */}
                <nav className="flex min-w-0 items-center gap-3 border-b border-[#d0d3d6] bg-white px-3 py-3 text-xs text-[#666] sm:gap-4 sm:px-5 sm:py-3.5 md:px-7 md:py-4 lg:h-16 lg:gap-5 lg:px-20 lg:py-0">
                    <img
                        src={LinkedinIcon}
                        alt="LinkedIn"
                        className="h-6 w-6 shrink-0 object-contain sm:h-7 sm:w-7 lg:h-8 lg:w-8"
                    />

                    <div className="flex min-w-0 flex-1 items-center gap-2 rounded-md bg-[#eef3f8] px-2.5 py-1.5 sm:px-3 sm:py-2">
                        <span className="text-sm sm:text-base">⌕</span>
                        <span className="text-xs sm:text-sm">Search</span>
                    </div>

                    <div className="hidden items-center gap-4 whitespace-nowrap text-xs md:flex lg:gap-5 lg:text-sm">
                        <span>Home</span>
                        <span>My Network</span>
                        <span>Jobs</span>
                        <span>Messages</span>
                        <span>Me ▾</span>
                    </div>
                </nav>

                {/* Profile */}
                <div className="mx-auto mt-3 max-w-6xl px-2 pb-3 sm:mt-4 sm:px-4 sm:pb-4 md:mt-5 md:px-6 lg:mt-5 lg:px-20">
                    <section className="overflow-hidden rounded-md border border-[#d0d3d6] bg-white sm:rounded-lg">

                        {/* Banner */}
                        <img
                            src={LinkedinBanner}
                            alt="banner"
                            className="h-24 w-full object-cover sm:h-32 md:h-36 lg:h-auto"
                        />

                        <div className="px-3 pb-4 sm:px-5 sm:pb-5 md:px-6 md:pb-6">

                            {/* Profile Image */}
                            <div className="-mt-10 flex h-20 w-20 items-center justify-center rounded-full border-3 border-white bg-white sm:-mt-14 sm:h-28 sm:w-28 sm:border-4 md:-mt-16 md:h-32 md:w-32 lg:-mt-20 lg:h-40 lg:w-40">
                                <img
                                    src={ProfileImage}
                                    alt="Profile"
                                    className="h-full w-full rounded-full"
                                />
                            </div>

                            {/* Profile Info */}
                            <h1 className="mt-2 text-lg font-semibold sm:mt-3 sm:text-xl md:text-2xl lg:text-2xl">
                                Kristian Demonteverde
                            </h1>

                            <p className="mt-1 text-xs sm:text-sm md:text-base">
                                Software Developer
                            </p>

                            <p className="mt-1.5 text-xs text-[#666] sm:mt-2 sm:text-sm">
                                Dubai, United Arab Emirates
                            </p>

                            {/* Buttons */}
                            <div className="mt-3 flex flex-wrap gap-2 sm:mt-4">
                                <a
                                    href={linkedinLink}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="rounded-full border-2 border-[#0a66c2] bg-[#0a66c2] px-4 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-white hover:text-[#0a66c2] sm:px-5 sm:py-2 sm:text-sm"
                                >
                                    Connect
                                </a>

                                <a
                                    href={linkedinLink}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="rounded-full border border-[#0a66c2] px-4 py-1.5 text-xs font-semibold text-[#0a66c2] transition-colors hover:bg-[#0a66c2] hover:text-white sm:px-5 sm:py-2 sm:text-sm"
                                >
                                    Message
                                </a>
                            </div>
                        </div>
                    </section>

                    {/* About */}
                    <section className="mt-3 rounded-md border border-[#d0d3d6] bg-white p-4 sm:mt-4 sm:rounded-lg sm:p-5 md:p-6">
                        <h2 className="text-base font-semibold sm:text-lg md:text-xl">
                            About
                        </h2>

                        <p className="mt-2 text-xs leading-6 text-[#444] sm:mt-3 sm:text-sm sm:leading-7">
                            Software Developer focused on full-stack applications,
                            backend systems, APIs, databases, and clean user interfaces.
                        </p>
                    </section>

                    {/* Profile Link */}
                    <div className="my-3 flex justify-center sm:my-4">
                        <a
                            href={linkedinLink}
                            target="_blank"
                            rel="noreferrer"
                            className="text-xs font-semibold text-[#0a66c2] hover:underline sm:text-sm"
                        >
                            View LinkedIn Profile →
                        </a>
                    </div>
                </div>
            </div>
        </Browser>
    );
}

export default Linkedin