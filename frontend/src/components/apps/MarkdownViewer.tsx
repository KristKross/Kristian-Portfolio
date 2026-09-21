import type { ReactNode } from "react";
import useDraggable from "../../hooks/useDraggable";
import WindowsControl from "../desktop/WindowControls";

interface MarkdownViewerProps {
    title?: string;
    y?: string;
    className?: string;
    margin?: string;
    text?: ReactNode;
    initialX?: number;
    initialY?: number;
    zIndex?: number;
    onFocus?: () => void;
}

function MarkdownViewer({
    title,
    className,
    text,
    initialX,
    initialY,
    zIndex,
    onFocus,
}: MarkdownViewerProps) {
    const {
        draggableRef,
        position,
        isDesktop,
        handlePointerDown,
        handlePointerMove,
        handlePointerUp,
    } = useDraggable<HTMLDivElement>(
        initialX,
        initialY,
    );

    return (
        <div
            ref={draggableRef}
            onPointerDown={onFocus}
            className={`window-pop-in relative flex flex-col lg:absolute lg:m-4 bg-gray-900 text-gray-100 rounded-lg shadow-lg overflow-hidden ${className}`}
            style={{
                ...(isDesktop && { left: position.x, top: position.y }),
                zIndex,
            }}
        >
            {/* Title Bar */}
            <div
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                className="bg-gray-800 px-4 py-2 flex items-center border-b border-gray-700 relative shrink-0 cursor-default lg:cursor-grab select-none"
            >
                <div className="absolute left-1/2 -translate-x-1/2 text-xs lg:text-sm font-semibold">
                    {title}
                </div>

                <div className="ml-auto flex items-center gap-2">
                    <WindowsControl />
                </div>
            </div>

            {/* Menu Bar */}
            <div className="bg-gray-800 px-4 py-2 flex gap-6 border-b border-gray-700 text-xs lg:text-sm">
                <button className="hover:bg-gray-700 px-2 py-1 rounded transition">
                    File
                </button>

                <button className="hover:bg-gray-700 px-2 py-1 rounded transition">
                    View
                </button>

                <button className="hover:bg-gray-700 px-2 py-1 rounded transition">
                    Edit
                </button>

                <button className="hover:bg-gray-700 px-2 py-1 rounded transition">
                    Help
                </button>
            </div>

            {/* Content */}
            <div className="font-['JetBrains_Mono'] bg-white p-6 py-12 h-full flex-1 text-gray-900 text-sm lg:text-base">
                {text}
            </div>
        </div>
    );
}

export default MarkdownViewer