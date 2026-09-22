import { useRef, type ReactNode } from "react";
import useDraggable from "../../hooks/useDraggable";
import WindowsControl from "../desktop/WindowControls";

interface TerminalLine {
    input: ReactNode;
    output?: ReactNode;
}

interface TerminalProps {
    title?: string;
    lines?: TerminalLine[];
    prompt?: string;
    showCursor?: boolean;
    className?: string;
    initialX?: number;
    initialY?: number;
    zIndex?: number;
    onFocus?: () => void;
}

function Terminal({
    title,
    lines = [],
    prompt = "kristian@portfolio:~$",
    className,
    initialX,
    initialY,
    zIndex,
    onFocus,
}: TerminalProps) {
    const terminalRef = useRef<HTMLDivElement>(null);

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
            ref={(element) => {
                terminalRef.current = element;
                draggableRef.current = element;
            }}
            onPointerDown={onFocus}
            className={`window-pop-in hidden lg:flex relative flex w-full max-w-2xl flex-col rounded-lg bg-[#202837] p-4 font-mono text-xs text-white shadow-lg sm:text-sm lg:absolute lg:my-4 lg:text-base ${className ?? ""}`}
            style={{
                ...(isDesktop && {
                    left: position.x,
                    top: position.y,
                }),
                zIndex,
            }}
        >
            {/* Title bar */}
            <div
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                className="terminal-titlebar relative mb-10 flex flex-row select-none cursor-default lg:cursor-grab"
            >
                <span className="absolute left-1/2 -translate-x-1/2">
                    {title}
                </span>

                <div className="ml-auto flex items-center gap-2">
                    <WindowsControl />
                </div>
            </div>

            {/* Terminal content */}
            <div className="terminal-content">
                {lines.map((line, index) => (
                    <div key={index} className="terminal-line">
                        <div className="terminal-input flex items-baseline">
                            <span className="shrink-0 text-[#5DADE2]">
                                {prompt}
                            </span>

                            <span className="shrink-0">
                                {" "}
                            </span>

                            <div className="min-w-0 ml-2">
                                {line.input}
                            </div>
                        </div>

                        {line.output && (
                            <div className="terminal-output mb-5">
                                {line.output}
                            </div>
                        )}
                    </div>
                ))}

                <div className="terminal-prompt flex items-baseline">
                    <span className="text-[#5DADE2]">
                        {prompt}
                    </span>

                    <span className="terminal-cursor">
                        {" "}█
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Terminal