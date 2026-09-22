import WindowsControl from "../desktop/WindowControls"
import useDraggable from "../../hooks/useDraggable"
import { Reply } from "lucide-react"

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
			className={`window-pop-in w-full relative flex flex-col lg:absolute ${className}`}
			style={{
				...(isDesktop && {
					left: position.x,
					top: position.y,
				}),
				zIndex,
			}}
		>
			<div className="overflow-hidden rounded-[10px] lg:rounded-2xl border border-[#2a2a2a] bg-[#0f1115]/95 text-[#e6e6e6] shadow-[0_0_30px_rgba(0,0,0,0.25)] backdrop-blur-sm">

				{/* Window header */}
				<div className="border-b border-[#2a2a2a] bg-[#11151a] text-[11px] text-gray-300">
					<div
						onPointerDown={handlePointerDown}
						onPointerMove={handlePointerMove}
						onPointerUp={handlePointerUp}
						className="relative flex cursor-default lg:cursor-grab select-none items-center justify-center py-2.5"
					>
						<div className="truncate pr-10 text-xs sm:text-sm font-semibold text-[#e6e6e6]">
							email — kristian@portfolio
						</div>

						<div className="absolute right-3 sm:right-4 flex items-center gap-2">
							<WindowsControl onClose={onClose} />
						</div>
					</div>

					{/* Menu */}
					<div className="hidden sm:flex items-center gap-1 md:gap-2 overflow-x-auto border-t border-[#2a2a2a] bg-[#141b22] px-3 py-2 text-xs md:text-sm">
						{["File", "Edit", "View", "Go", "Message", "Tools", "Help"].map(
							(item) => (
								<button
									key={item}
									className="rounded px-2 py-1 transition hover:bg-gray-700"
								>
									{item}
								</button>
							)
						)}
					</div>
				</div>

				<div className="flex min-h-0 flex-col lg:min-h-[560px] lg:flex-row">

					{/* Sidebar */}
					<aside className="w-full border-b border-[#2a2a2a] bg-[#121820] px-3 py-2 sm:px-4 md:w-full lg:w-[220px] lg:border-b-0 lg:border-r lg:p-4">
						<div className="hidden lg:block mb-5 text-[14px] font-semibold text-gray-300">
							MAIL
						</div>

						<div className="flex items-center gap-2 overflow-x-auto text-sm sm:text-xs lg:block lg:space-y-2">
							<div className="rounded-md bg-[#1a212b] px-3 py-2 text-[#E6E6E6]">
								Inbox
								<span className="ml-2 text-[#4FC1E9] lg:float-right">
									01
								</span>
							</div>

							<div className="rounded-md px-3 py-2 text-gray-400 transition hover:bg-[#1a212b] hover:text-gray-200 lg:px-2">
								Sent
							</div>

							<div className="rounded-md px-3 py-2 text-gray-400 transition hover:bg-[#1a212b] hover:text-gray-200 lg:px-2">
								Drafts
							</div>
						</div>
					</aside>

					{/* Main mail area */}
					<main className="flex min-w-0 flex-1 flex-col bg-[#0f1115]">

						{/* Message list header */}
						<div className="hidden lg:grid grid-cols-3 gap-4 border-b border-[#2a2a2a] px-5 py-3 text-xs font-semibold text-gray-400">
							<span>Subject</span>
							<span>From</span>
							<span>Date</span>
						</div>

						{/* Selected email */}
						<div
							className="grid grid-cols-[1fr_auto] gap-3 border-b border-[#2a2a2a] bg-[#1d4f68] px-4 py-3 text-sm text-white ring-1 ring-inset ring-[#4FC1E9] sm:px-5 md:grid-cols-[1.5fr_1fr_auto] lg:grid-cols-3"
							aria-selected="true"
						>
							<span className="min-w-0 text-xs truncate font-semibold">
								Let's work together!
							</span>

							<span className="hidden truncate text-xs text-gray-100 md:block">
								Kristian Demonteverde
							</span>

							<span className="text-right text-[11px] text-gray-100 sm:text-xs md:text-left">
								Sep 17 · 20:42
							</span>
						</div>

						{/* Empty messages */}
						<div className="hidden lg:grid grid-cols-3 items-center gap-4 border-b border-[#2a2a2a] bg-[#18212b] px-5 py-3 text-sm">
							<span className="text-gray-500">—</span>
							<span className="text-xs text-gray-500">—</span>
							<span className="text-xs text-gray-500">—</span>
						</div>

						<div className="hidden lg:grid grid-cols-3 items-center gap-4 border-b border-[#2a2a2a] bg-[#131b23] px-5 py-3 text-sm">
							<span className="text-gray-500">—</span>
							<span className="text-xs text-gray-500">—</span>
							<span className="text-xs text-gray-500">—</span>
						</div>

						{/* Email content */}
						<article className="flex-1 p-4 text-sm leading-6 text-gray-300">

							{/* Email metadata */}
							<div className="mb-5 space-y-2 border-b border-[#2a2a2a] pb-4 text-xs text-gray-400">
								<div className="flex flex-col gap-0.5 sm:flex-row">
									<span className="w-auto text-gray-500 sm:w-20">
										To:
									</span>
									<span>You</span>
								</div>

								<div className="flex flex-col gap-0.5 sm:flex-row">
									<span className="w-auto text-gray-500 sm:w-20">
										From:
									</span>
									<span className="break-all">
										Kristian Demonteverde
										<span className="hidden sm:inline">
											{" "}
											&lt;kristian.k.demonteverde@gmail.com&gt;
										</span>
									</span>
								</div>

								<div className="flex flex-col gap-0.5 sm:flex-row">
									<span className="w-auto text-gray-500 sm:w-20">
										Subject:
									</span>
									<span>Let's work together!</span>
								</div>

								<div className="flex flex-col gap-0.5 sm:flex-row">
									<span className="w-auto text-gray-500 sm:w-20">
										Date:
									</span>
									<span>September 17, 2026 · 20:42</span>
								</div>
							</div>

							{/* Message */}
							<div className="max-w-3xl text-base sm:text-xs md:text-sm">
								<p>
									Hi, I'm currently open to interesting projects,
									collaboration and opportunities.
								</p>

								<p className="mt-4">
									If you’d like to get in touch, feel free to send me
									an email.
								</p>

								<p className="mt-4">
									Best,
									<br />
									Kristian
								</p>
							</div>
						</article>

						{/* Reply */}
						<div className="flex border-t border-[#2a2a2a] px-4 py-3">
							<a
								href="mailto:kristian.k.demonteverde@gmail.com?subject=Re:%20Let's%20work%20together!"
								className="inline-flex items-center gap-2 rounded px-2 py-1 text-sm text-[#4FC1E9] transition hover:bg-[#1d4f68] hover:text-white focus-visible:bg-[#1d4f68] focus-visible:text-white focus-visible:outline-none"
							>
								<Reply className="h-4 w-4" />
								Reply
							</a>
						</div>
					</main>
				</div>
			</div>
		</section>
	)
}

export default Mail