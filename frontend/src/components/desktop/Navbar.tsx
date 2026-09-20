import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const sectionLinks = [
    { label: "Landing", id: "landing" },
    { label: "About", id: "about" },
    { label: "Projects", id: "projects" },
    { label: "Skills", id: "skills" },
    { label: "Contact", id: "contact" },
];

const actionButtons = [
    {
        label: "Internet",
        src: "https://unpkg.com/lucide-static@latest/icons/globe.svg",
    },
    {
        label: "Volume",
        src: "https://unpkg.com/lucide-static@latest/icons/volume-2.svg",
    },
    {
        label: "Bell",
        src: "https://unpkg.com/lucide-static@latest/icons/bell.svg",
    },
    {
        label: "Battery",
        src: "https://unpkg.com/lucide-static@latest/icons/battery-full.svg",
    },
];

const utilityButtons = [
    {
        label: "Lock",
        src: "https://unpkg.com/lucide-static@latest/icons/lock.svg",
    },
    {
        label: "Power",
        src: "https://unpkg.com/lucide-static@latest/icons/power.svg",
    },
];

function Clock() {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = window.setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => window.clearInterval(timer);
    }, []);

    const formatTime = (date: Date) => {
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");

        return `${hours}:${minutes}`;
    };

    return (
        <div aria-live="polite" className="min-w-[64px] text-right text-sm font-semibold tracking-[0.08em] sm:text-base lg:min-w-[72px] lg:text-[20px]">
            {formatTime(currentTime)}
        </div>
    );
}

function StatusIcons() {
    return (
        <div className="hidden items-center lg:flex">
            {actionButtons.map(({ label, src }) => (
                <button key={label} type="button" aria-label={label} className="flex h-9 w-9 items-center justify-center opacity-90 transition-opacity hover:opacity-100 focus:outline-none">
                    <img src={src} alt="" aria-hidden="true" className="h-[21px] w-[21px] object-contain invert" />
                </button>
            ))}
        </div>
    );
}

function UtilityButtons() {
    return (
        <div className="flex items-center">
            {utilityButtons.map(({ label, src }) => (
                <button key={label} type="button" aria-label={label} className="flex h-9 w-9 items-center justify-center opacity-90 transition-opacity hover:opacity-100 focus:outline-none">
                    <img src={src} alt="" aria-hidden="true" className="h-[21px] w-[21px] object-contain invert" />
                </button>
            ))}
        </div>
    );
}

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
    if (!isOpen) return null;

    return (
        <div className="border-t border-[#46515f] bg-[#1b2028] px-3 py-2 lg:hidden">
            <div className="flex flex-col gap-1 text-xs text-[#aeb9c6]">
                {sectionLinks.map(({ label, id }) => (
                    <a key={id} href={`#${id}`} onClick={onClose} className="border border-transparent px-3 py-2 hover:border-[#3d7185] hover:bg-[#263743] hover:text-[#67d4e8]">
                        ~/ {label.toLowerCase()}
                    </a>
                ))}
            </div>
        </div>
    );
}

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleSectionClick = (
        event: React.MouseEvent<HTMLAnchorElement>,
        id: string
    ) => {
        event.preventDefault();

        document.getElementById(id)?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };

    return (
        <header className="font-sans fixed top-0 left-0 right-0 z-[9999] border-b border-[#11161d] bg-[#1b2028] font-mono shadow-[0_2px_8px_rgba(0,0,0,0.35)]">
            <nav className="mx-auto flex h-8 w-full items-center gap-4 px-3 text-white sm:px-5">

                <div className="flex min-w-0 flex-1 items-center gap-4">
                    <div className="shrink-0 border-r border-[#46515f] pr-5 text-sm font-bold tracking-[0.04em] text-[#dce7f2]">
                        [ kristian ]
                    </div>

                    {/* DESKTOP TABS */}
                    <div className="hidden min-w-0 flex-1 items-center overflow-hidden lg:flex">
                        <div className="flex min-w-max items-center">
                            {sectionLinks.map(({ label, id }) => (
                                <a key={id} href={`#${id}`} onClick={(event) => handleSectionClick(event, id)} className="relative flex h-8 shrink-0 items-center border-x border-[#11161d] bg-[#252c35] px-8 text-sm text-[#c5ced8] shadow-[inset_0_1px_0_rgba(255,255,255,0.04),inset_0_-1px_0_rgba(0,0,0,0.35)] transition-colors hover:bg-[#303943] hover:text-white focus:outline-none focus-visible:z-10 focus-visible:border-[#67d4e8] focus-visible:text-white">
                                    <span className="mr-2 text-[#687582]">
                                        ▸
                                    </span>

                                    <span>
                                        {label.toLowerCase()}
                                    </span>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* MOBILE MENU BUTTON */}
                    <button 
                        type="button"
                        aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                        aria-expanded={isMenuOpen} onClick={() => setIsMenuOpen((open) => !open)}
                        className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center border-[#46515f] text-[#c9d4df] transition-colors hover:border-[#67d4e8] hover:text-[#67d4e8] lg:hidden">
                        {isMenuOpen ? (
                            <X className="h-5 w-5" />
                        ) : (
                            <Menu className="h-5 w-5" />
                        )}
                    </button>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                    <StatusIcons />
                    <Clock />

                    {/* DIVIDER */}
                    <div className="mx-1 h-6 w-px bg-white/80" aria-hidden="true" />

                    <UtilityButtons />
                </div>
            </nav>

            {/* MOBILE MENU */}
            <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        </header>
    );
}

export default Navbar;