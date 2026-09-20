export type WindowId =
    | 'landingTerminal'
    | 'imageViewer'
    | 'profileMarkdown'
    | 'aboutTerminal'
    | 'aboutMarkdown'
    | 'projectsTerminal'
    | 'fileManager'
    | 'skillsTerminal'
    | 'systemMonitor'
    | 'contactTerminal'
    | 'mail'
    | 'github'
    | 'linkedin'
    | 'projectWindow'

export type WindowZIndexes = Record<WindowId, number>

export type BringToFront = (window: WindowId) => void