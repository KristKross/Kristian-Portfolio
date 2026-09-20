import WindowsControl from "../desktop/WindowControls"
import useDraggable from "../../hooks/useDraggable"

interface MailProps {
    className?: string;
    y?: string;
	initialX?: number;
	initialY?: number;
    zIndex?: number;
    onFocus?: () => void;
	onClose?: () => void;
}

function Mail({
	className,
	initialX,
	initialY,
	zIndex,
	onFocus,
	onClose,
}: MailProps) {
	const {
		draggableRef,
		position,
		isDesktop,
		handlePointerDown,
		handlePointerMove,
		handlePointerUp,
	} = useDraggable<HTMLElement>(initialX, initialY)

	return (
		<section
			ref={draggableRef}
			onPointerDown={onFocus}
			className={`window-pop-in relative flex flex-col lg:absolute lg:m-4 w-full px-6 pb-10 ${className}`} 
			style={
				{
					...(isDesktop && { left: position.x, top: position.y }),
					zIndex,
				}
			}
		>
			<div className="overflow-hidden rounded-2xl border border-[#2a2a2a] bg-[#0f1115]/95 text-[#e6e6e6] shadow-[0_0_30px_rgba(0,0,0,0.25)] backdrop-blur-sm">
				<div className="border-b border-[#2a2a2a] bg-[#11151a] text-[11px] text-gray-300">
					<div
						onPointerDown={handlePointerDown}
						onPointerMove={handlePointerMove}
						onPointerUp={handlePointerUp}
						className="relative flex cursor-default lg:cursor-grab select-none items-center justify-center px-4 py-2.5"
					>
						<div className="font-semibold text-sm text-[#e6e6e6]">email — kristian@portfolio</div>
						<div className="absolute right-4 flex items-center gap-2">
							<WindowsControl onClose={onClose} />
						</div>
					</div>
					<div className="flex items-center gap-2 border-t border-[#2a2a2a] bg-[#141b22] px-4 py-2 text-sm">
						{['File', 'Edit', 'View', 'Go', 'Message', 'Tools', 'Help'].map((item) => (
							<button key={item} className="rounded px-2 py-1 transition hover:bg-gray-700">
								{item}
							</button>
						))}
					</div>
				</div>

				<div className="flex min-h-[560px]">
					<aside className="w-[220px] border-r border-[#2a2a2a] bg-[#121820] p-4 text-sm text-gray-300">
						<div className="mb-5 text-[14px] font-semibold text-gray-300">MAIL</div>
						<div className="space-y-2 text-gray-400">
							<div className="rounded-md bg-[#1a212b] px-2 py-1.5 text-[#E6E6E6]">Inbox <span className="float-right">01</span></div>
							<div className="px-2 py-1.5">Sent</div>
							<div className="px-2 py-1.5">Drafts</div>
						</div>
					</aside>

					<main className="flex flex-1 flex-col bg-[#0f1115]">
						<div className="grid grid-cols-3 gap-4 border-b border-[#2a2a2a] px-5 py-3 text-xs font-semibold text-gray-400">
							<span>Subject</span>
							<span>From</span>
							<span>Date</span>
						</div>
						<div
							className="grid grid-cols-3 items-center gap-4 border-b border-[#2a2a2a] bg-[#1d4f68] px-5 py-3 text-sm text-white ring-1 ring-inset ring-[#4FC1E9]"
							aria-selected="true"
						>
							<span className="font-semibold">Let's work together!</span>
							<span className="text-xs text-gray-100">Kristian Demonteverde</span>
							<span className="text-xs text-gray-100">Sep 17 · 20:42</span>
						</div>
						<div className="grid grid-cols-3 items-center gap-4 border-b border-[#2a2a2a] bg-[#18212b] px-5 py-3 text-sm">
							<span className="text-gray-500">—</span>
							<span className="text-xs text-gray-500">—</span>
							<span className="text-xs text-gray-500">—</span>
						</div>
						<div className="grid grid-cols-3 items-center gap-4 border-b border-[#2a2a2a] bg-[#131b23] px-5 py-3 text-sm">
							<span className="text-gray-500">—</span>
							<span className="text-xs text-gray-500">—</span>
							<span className="text-xs text-gray-500">—</span>
						</div>
						<article className="flex-1 p-6 text-sm leading-6 text-gray-300">
							<div className="mb-6 space-y-1 border-b border-[#2a2a2a] pb-5 text-xs text-gray-400">
								<div><span className="inline-block w-20">To:</span> You</div>
								<div><span className="inline-block w-20">From:</span> Kristian Demonteverde &lt;kristian@email.com&gt;</div>
								<div><span className="inline-block w-20">Subject:</span> Let's work together!</div>
								<div><span className="inline-block w-20">Date:</span> September 17, 2026 · 20:42</div>
							</div>
							<p>Hi, I'm currently open to interesting projects, collaboration and opportunities.</p>
							<p className="mt-4">If you’d like to get in touch, feel free to send me an email.</p>
							<p className="mt-4">Best,<br />Kristian</p>
						</article>
						<div className="flex gap-5 border-t border-[#2a2a2a] px-6 py-4 text-sm text-[#4FC1E9]">
							<button className="rounded px-2 py-1 transition hover:bg-[#1d4f68] hover:text-white focus-visible:bg-[#1d4f68] focus-visible:text-white focus-visible:outline-none">↩ Reply</button>
							<button className="rounded px-2 py-1 transition hover:bg-[#1d4f68] hover:text-white focus-visible:bg-[#1d4f68] focus-visible:text-white focus-visible:outline-none">→ Forward</button>
							<button className="rounded px-2 py-1 transition hover:bg-[#1d4f68] hover:text-white focus-visible:bg-[#1d4f68] focus-visible:text-white focus-visible:outline-none">⋮ More</button>
						</div>
					</main>
				</div>
			</div>
		</section>
	)
}

export default Mail