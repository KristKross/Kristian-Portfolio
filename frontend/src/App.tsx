import './App.css'
import { useEffect, useRef, useState } from 'react'
import Background from './assets/desktop-background.jpg'
import Navbar from './components/desktop/Navbar.tsx'
import DesktopDecor from './components/desktop/DesktopDecor.tsx'
import StartupSequence from './components/desktop/StartupSequence.tsx'
import Landing from './pages/Landing'
import About from './pages/About.tsx'
import Projects from './pages/Projects.tsx'
import Skills from './pages/Skills.tsx'
import Contact from './pages/Contact.tsx'

const initialWindowZIndexes = {
    landingTerminal: 1,
    imageViewer: 2,
    profileMarkdown: 3,
    aboutTerminal: 4,
    aboutMarkdown: 5,
    projectsTerminal: 6,
    fileManager: 7,
    skillsTerminal: 8,
    systemMonitor: 9,
    contactTerminal: 10,
    mail: 11,
    github: 12,
    linkedin: 13,
    projectWindow: 14,
}

function Wallpaper() {
    const [scrollOffset, setScrollOffset] = useState(0)

    useEffect(() => {
        const updateScrollOffset = () => {
            setScrollOffset(
                Math.min(
                    window.scrollY,
                    window.innerHeight * 0.1
                )
            )
        }

        updateScrollOffset()

        window.addEventListener('scroll', updateScrollOffset, {
            passive: true,
        })

        return () => {
            window.removeEventListener(
                'scroll',
                updateScrollOffset
            )
        }
    }, [])

    return (
        <img
            src={Background}
            alt=""
            className="pointer-events-none fixed inset-0 -z-10 h-full w-full object-cover"
            style={{
                transform: `
                    translate3d(0, ${scrollOffset}px, 0)
                    scale(1.25)
                `,
            }}
        />
    )
}

function App() {
    const [isStarted, setIsStarted] = useState(() => {
        return sessionStorage.getItem('portfolio-started') === 'true'
    })

    const highestZIndex = useRef(14)

    const [windowZIndexes, setWindowZIndexes] = useState(
        initialWindowZIndexes
    )

    const bringToFront = (
        window: keyof typeof initialWindowZIndexes
    ) => {
        const newZIndex = highestZIndex.current + 1

        highestZIndex.current = newZIndex

        setWindowZIndexes((current) => ({
            ...current,
            [window]: newZIndex,
        }))
    }

    if (!isStarted) {
        return (
            <StartupSequence
                onComplete={() => {
                    sessionStorage.setItem('portfolio-started', 'true')
                    setIsStarted(true)
                }}
            />
        )
    }

    return (
        <div className="relative min-h-screen isolate">
            <Wallpaper />
            <DesktopDecor />
            <Navbar />

            <div className="px-4 sm:px-6 lg:px-20">
                <div className="relative isolate min-h-fit max-h-[calc(100vh)]">
                    <Landing
                        windowZIndexes={windowZIndexes}
                        bringToFront={bringToFront}
                    />
                    <About
                        windowZIndexes={windowZIndexes}
                        bringToFront={bringToFront}
                    />
                    <Projects
                        windowZIndexes={windowZIndexes}
                        bringToFront={bringToFront}
                    />
                    <Skills
                        windowZIndexes={windowZIndexes}
                        bringToFront={bringToFront}
                    />
                    <Contact
                        windowZIndexes={windowZIndexes}
                        bringToFront={bringToFront}
                    />
                </div>
            </div>
        </div>
    )
}

export default App