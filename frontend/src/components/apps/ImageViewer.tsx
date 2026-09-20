import WindowsControl from "../desktop/WindowControls";
import useDraggable from "../../hooks/useDraggable";
import ProfileImage from "../../assets/profile-image.png"

interface ImageViewerProps {
    y?: string;
    className?: string;
    initialX?: number;
    initialY?: number;
    zIndex?: number;
    onFocus?: () => void;
}

function ImageViewer({ 
    className,
    initialX,
    initialY,
    zIndex,
    onFocus,
}: ImageViewerProps) {
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
            className={`window-pop-in relative flex flex-col lg:absolute lg:m-4 bg-gray-900 text-gray-100 rounded-lg shadow-lg overflow-hidden w-full ${className}`}
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
                className="bg-gray-800 px-4 py-2 flex items-center border-b border-gray-700 relative cursor-default lg:cursor-grab select-none"
            >
                <div className="absolute left-1/2 -translate-x-1/2 text-sm font-semibold">profile.jpg</div>
                <div className="ml-auto flex items-center gap-2">
                    <WindowsControl />
                </div>
            </div>

            {/* Menu Bar */}
            <div className="bg-gray-800 px-4 py-2 flex gap-6 border-b border-gray-700 text-sm">
                <button className="hover:bg-gray-700 px-2 py-1 rounded transition">File</button>
                <button className="hover:bg-gray-700 px-2 py-1 rounded transition">View</button>
                <button className="hover:bg-gray-700 px-2 py-1 rounded transition">Edit</button>
                <button className="hover:bg-gray-700 px-2 py-1 rounded transition">Help</button>
            </div>

            {/* Main Content Area */}
            <div className="flex min-h-[500px] items-center justify-center overflow-hidden bg-gray-900 p-8">
                <img src={ProfileImage} alt="Profile" className="max-h-[calc(100vh-200px)] max-w-full object-contain" />
            </div>
        </div>
    );
}

export default ImageViewer