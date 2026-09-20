import FileSystemIcon from "../../assets/icons/file-system-icon.svg"
import HomeIcon from "../../assets/icons/home-icon.svg"
import TrashIcon from "../../assets/icons/trash-icon.svg"

interface DesktopIconProps {
    icon: string
    label: string
}

function DesktopDecor() {
    return (
        <div className="pointer-events-none fixed left-6 top-24 z-0 hidden select-none lg:flex lg:flex-col lg:gap-5">
            <DesktopIcon
                icon={FileSystemIcon}
                label="File System"
            />

            <DesktopIcon
                icon={HomeIcon}
                label="Home"
            />

            <DesktopIcon
                icon={TrashIcon}
                label="Trash"
            />
        </div>
    )
}

function DesktopIcon({
    icon,
    label,
}: DesktopIconProps) {
    return (
        <div className="flex w-32 flex-col items-center gap-3 mb-8">
            <img
                src={icon}
                alt=""
                className="h-12 w-12 opacity-75"
            />

            <span className="text-center text-xs text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.8)]">
                {label}
            </span>
        </div>
    )
}

export default DesktopDecor