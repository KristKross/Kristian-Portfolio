import { useEffect, useState } from "react"
import { Minus, Square, X } from "lucide-react"

interface WindowControlsProps {
    onClose?: () => void
}

function WindowControls({ onClose }: WindowControlsProps) {
    const [isDesktop, setIsDesktop] = useState(false)

    useEffect(() => {
        const mediaQuery = window.matchMedia("(min-width: 1024px)")

        const updateBreakpoint = () => {
            setIsDesktop(mediaQuery.matches)
        }

        updateBreakpoint()
        mediaQuery.addEventListener("change", updateBreakpoint)

        return () => {
            mediaQuery.removeEventListener("change", updateBreakpoint)
        }
    }, [])

    if (!onClose) {
        return <div className="flex h-6 items-center gap-2"></div>
    }

    return (
        <div className="flex h-6 items-center gap-2">
            <button
                type="button"
                aria-label="Minimize"
                className="flex h-6 w-6 items-center justify-center"
            >
                <Minus className="h-4 w-4 text-white" />
            </button>

            <button
                type="button"
                aria-label="Maximize"
                className="flex h-6 w-6 items-center justify-center"
            >
                <Square className="h-4 w-4 text-white" />
            </button>

            <button
                type="button"
                aria-label="Close"
                title={isDesktop ? "Close window" : "Window cannot be closed on this screen size"}
                disabled={!isDesktop}
                onPointerDown={(event) => event.stopPropagation()}
                onClick={onClose}
                className="flex h-6 w-6 items-center justify-center transition-colors disabled:cursor-default disabled:opacity-50 enabled:cursor-pointer enabled:hover:bg-[#7f1d1d]"
            >
                <X className="h-4 w-4 text-white" />
            </button>
        </div>
    )
}

export default WindowControls