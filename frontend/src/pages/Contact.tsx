import { useEffect, useState } from "react"
import Terminal from "../components/apps/Terminal"
import Mail from "../components/apps/Mail"
import Linkedin from "../components/content/Linkedin"
import Github from "../components/content/Github"
import type { BringToFront, WindowZIndexes } from "../types/window"

interface ContactProps {
    windowZIndexes: WindowZIndexes
    bringToFront: BringToFront
    onOpenmail?: () => void
    onOpenGithub?: () => void
    onOpenLinkedin?: () => void
}

function Contact({
    windowZIndexes,
    bringToFront,
    onOpenmail,
    onOpenGithub,
    onOpenLinkedin,
}: ContactProps) {
    const [_, setIsDesktop] = useState(false)

    const [opened, setOpened] = useState({
        mail: true,
        github: false,
        linkedin: false,
    })

    useEffect(() => {
        const mediaQuery = window.matchMedia("(min-width: 1024px)")

        const updateBreakpoint = () => {
            const desktop = mediaQuery.matches

            setIsDesktop(desktop)

            setOpened({
                mail: true,
                github: !desktop,
                linkedin: !desktop,
            })
        }

        updateBreakpoint()
        mediaQuery.addEventListener("change", updateBreakpoint)

        return () => {
            mediaQuery.removeEventListener("change", updateBreakpoint)
        }
    }, [])

    const openWindow = (
        type: "mail" | "github" | "linkedin",
        callback?: () => void
    ) => {
        setOpened((previous) => ({
            ...previous,
            [type]: true,
        }))

        bringToFront(type)
        callback?.()
    }

    return (
        <section
            id="contact"
            className="relative flex min-h-screen flex-col items-center justify-center gap-6 px-2 lg:mt-0 lg:block"
        >
            <Terminal
                title="kristian@portfolio: ~"
                lines={[
                    {
                        input: (
                            <div className="text-white">
                                ./contact
                            </div>
                        ),
                        output: (
                            <div className="mb-5 text-[#9A9A9A]">
                                <span className="text-[#6F9D62]">
                                    [ OK ]
                                </span>{" "}
                                Ready to connect ...
                            </div>
                        ),
                    },
                    {
                        input: (
                            <div className="text-white">
                                ls
                            </div>
                        ),
                        output: (
                            <div className="space-y-1">
                                <div className="flex flex-wrap gap-x-6 gap-y-1">
                                    <button
                                        type="button"
                                        disabled={opened.mail}
                                        onClick={() =>
                                            openWindow("mail", onOpenmail)
                                        }
                                        className={
                                            opened.mail
                                                ? "cursor-default text-[#6B7280]"
                                                : "cursor-pointer text-[#4FC1E9] transition-colors hover:text-white hover:underline"
                                        }
                                    >
                                        email
                                    </button>

                                    <button
                                        type="button"
                                        disabled={opened.github}
                                        onClick={() =>
                                            openWindow("github", onOpenGithub)
                                        }
                                        className={
                                            opened.github
                                                ? "cursor-default text-[#6B7280]"
                                                : "cursor-pointer text-[#4FC1E9] transition-colors hover:text-white hover:underline"
                                        }
                                    >
                                        github
                                    </button>

                                    <button
                                        type="button"
                                        disabled={opened.linkedin}
                                        onClick={() =>
                                            openWindow("linkedin", onOpenLinkedin)
                                        }
                                        className={
                                            opened.linkedin
                                                ? "cursor-default text-[#6B7280]"
                                                : "cursor-pointer text-[#4FC1E9] transition-colors hover:text-white hover:underline"
                                        }
                                    >
                                        linkedin
                                    </button>
                                </div>
                            </div>
                        ),
                    },
                ]}
                prompt="kristian@portfolio:~$"
                zIndex={windowZIndexes.contactTerminal}
                onFocus={() => bringToFront("contactTerminal")}
            />

            {opened.mail && (
                <Mail
                    initialX={700}
                    initialY={280}
                    zIndex={windowZIndexes.mail}
                    onFocus={() => bringToFront("mail")}
                    onClose={() =>
                        setOpened((previous) => ({
                            ...previous,
                            mail: false,
                        }))
                    }
                    className="max-w-[900px]"
                />
            )}

            {opened.linkedin && (
                <Linkedin
                    initialX={700}
                    initialY={40}
                    zIndex={windowZIndexes.linkedin}
                    onFocus={() => bringToFront("linkedin")}
                    onClose={() =>
                        setOpened((previous) => ({
                            ...previous,
                            linkedin: false,
                        }))
                    }
                />
            )}

            {opened.github && (
                <Github
                    initialX={700}
                    initialY={40}
                    zIndex={windowZIndexes.github}
                    onFocus={() => bringToFront("github")}
                    onClose={() =>
                        setOpened((previous) => ({
                            ...previous,
                            github: false,
                        }))
                    }
                />
            )}
        </section>
    )
}

export default Contact