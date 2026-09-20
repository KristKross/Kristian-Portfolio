import type { ReactNode } from "react";
import {
    ArrowLeft,
    ArrowRight,
    FileText,
    Plus,
    RotateCw,
    Star,
    X,
} from "lucide-react";
import WindowsControl from "../desktop/WindowControls";
import useDraggable from "../../hooks/useDraggable";

interface BrowserProps {
    tab?: string;
    searchBar?: string;
    className?: string;
    children?: ReactNode;
    initialX?: number;
    initialY?: number;
    zIndex?: number;
    onFocus?: () => void;
    onClose?: () => void;
}

const buttonClass = "inline-flex cursor-pointer items-center justify-center border-0 bg-transparent p-[3px]";

function Browser({
    tab,
    searchBar,
    className,
    children,
    initialX,
    initialY,
    zIndex,
    onFocus,
    onClose,
}: BrowserProps) {
    const {
        draggableRef,
        position,
        isDesktop,
        handlePointerDown,
        handlePointerMove,
        handlePointerUp,
    } = useDraggable<HTMLDivElement>(initialX, initialY);

    return (
        <div
            ref={draggableRef}
            onPointerDown={onFocus}
            className={`window-pop-in relative flex h-fit w-full max-w-[calc(100vw-16px)] flex-col overflow-hidden rounded-[10px] border border-[#454040] bg-[#242424] shadow-[0_8px_24px_rgba(0,0,0,0.25)] lg:absolute lg:m-4 lg:h-[700px] lg:max-h-[700px] lg:w-[900px] ${className ?? ""}`}
            style={{
                ...(isDesktop && {
                    left: position.x,
                    top: position.y,
                }),
                zIndex,
            }}
        >
            {/* Browser Tabs */}
            <div
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                className="flex min-h-[42px] shrink-0 select-none items-center gap-2 border-b border-[#454040] bg-[#242424] px-2.5 lg:cursor-grab"
            >
                <div className="flex h-8 min-w-0 max-w-[240px] items-center gap-2 rounded-t-lg bg-[#454040] px-3 text-[13px] text-white">
                    <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                        {tab}
                    </span>

                    <button
                        type="button"
                        aria-label="Close tab"
                        className={buttonClass}
                    >
                        <X className="h-4 w-4 text-white" />
                    </button>
                </div>

                <button
                    type="button"
                    aria-label="New tab"
                    className={buttonClass}
                >
                    <Plus className="h-4 w-4 text-white" />
                </button>

                <div className="ml-auto">
                    <WindowsControl onClose={onClose} />
                </div>
            </div>

            {/* Address Bar */}
            <div className="flex shrink-0 items-center gap-2.5 bg-[#242424] p-2.5">
                <div className="flex gap-2">
                    <button
                        type="button"
                        aria-label="Back"
                        className={buttonClass}
                    >
                        <ArrowLeft className="h-4 w-4 text-white" />
                    </button>

                    <button
                        type="button"
                        aria-label="Forward"
                        className={buttonClass}
                    >
                        <ArrowRight className="h-4 w-4 text-white" />
                    </button>

                    <button
                        type="button"
                        aria-label="Reload"
                        className={buttonClass}
                    >
                        <RotateCw className="h-4 w-4 text-white" />
                    </button>
                </div>

                <div className="flex h-[34px] min-w-0 flex-1 items-center gap-2 rounded-[18px] border border-[#454040] bg-[#454040] px-[11px] text-[13px] text-white">
                    <FileText className="h-4 w-4 shrink-0 text-white" />

                    <a
                        href={searchBar}
                        target="_blank"
                        rel="noreferrer"
                        className="flex min-w-0 flex-1 items-center rounded-md px-2 py-1 text-gray-300 transition-colors hover:bg-[#505050] hover:text-white"
                    >
                        <span className="overflow-hidden text-ellipsis whitespace-nowrap hover:underline">
                            {searchBar}
                        </span>
                    </a>
                </div>

                <button
                    type="button"
                    aria-label="Bookmark"
                    className={buttonClass}
                >
                    <Star className="h-4 w-4 text-white" />
                </button>
            </div>

            {/* Website Body */}
            <main className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden">
                {children}
            </main>
        </div>
    );
}

export default Browser;