import { useRef, type ReactNode } from "react";
import useDraggable from "../../hooks/useDraggable";
import WindowsControl from "../desktop/WindowControls";

interface TerminalSegment {
    text: string;
    className?: string;
}

interface TerminalLine {
    input: TerminalSegment[];
    output?: ReactNode | TerminalSegment[];
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

function isTerminalSegmentArray(
    output: ReactNode | TerminalSegment[],
): output is TerminalSegment[] {
    return (
        Array.isArray(output) &&
        output.every(
            (segment) =>
                typeof segment === "object" &&
                segment !== null &&
                "text" in segment,
        )
    );
}

function Terminal({
    title,
    lines = [],
    prompt = "kristian@portfolio:~$",
    showCursor = true,
    className,
    initialX = 100,
    initialY = 100,
    zIndex = 1,
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
            className={`window-pop-in lg:flex relative flex-col lg:absolute lg:my-4 bg-[#202837] p-4 rounded-lg shadow-lg text-white font-mono text-xs sm:text-sm lg:text-base w-full max-w-2xl ${className ?? ""}`}
            style={{
                ...(isDesktop && { left: position.x, top: position.y }),
                zIndex,
            }}
        >

            {/* Title bar */}
            <div
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                className="terminal-titlebar relative flex flex-row items-center mb-10 cursor-default lg:cursor-grab select-none"
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

                        <div className="terminal-input">
                            <span className="text-[#5DADE2]">
                                {prompt}
                            </span>

                            <span> </span>

                            {line.input.map((segment, segmentIndex) => (
                                <span
                                    key={segmentIndex}
                                    className={segment.className}
                                >
                                    {segment.text}
                                </span>
                            ))}
                        </div>

                        {line.output && (
                            <div className="terminal-output mb-5">
                                {isTerminalSegmentArray(line.output)
                                    ? line.output.map(
                                          (segment, segmentIndex) => (
                                              <span
                                                  key={segmentIndex}
                                                  className={segment.className}
                                              >
                                                  {segment.text}
                                              </span>
                                          )
                                      )
                                    : line.output}
                            </div>
                        )}

                    </div>
                ))}

                <div className="terminal-prompt">
                    <span className="text-[#5DADE2]">
                        {prompt}
                    </span>

                    {showCursor && <span className="terminal-cursor"> █</span>}
                </div>

            </div>
        </div>
    );
}

export default Terminal;