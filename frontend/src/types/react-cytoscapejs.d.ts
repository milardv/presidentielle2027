declare module 'react-cytoscapejs' {
  import type { Core, ElementDefinition, LayoutOptions, Stylesheet } from 'cytoscape'
  import type { CSSProperties, ComponentType } from 'react'

  interface CytoscapeComponentProps {
    elements?: ElementDefinition[]
    stylesheet?: Stylesheet[]
    layout?: LayoutOptions
    style?: CSSProperties
    minZoom?: number
    maxZoom?: number
    wheelSensitivity?: number
    autolock?: boolean
    zoomingEnabled?: boolean
    userZoomingEnabled?: boolean
    panningEnabled?: boolean
    userPanningEnabled?: boolean
    cy?: (cy: Core) => void
  }

  const CytoscapeComponent: ComponentType<CytoscapeComponentProps>
  export default CytoscapeComponent
}
