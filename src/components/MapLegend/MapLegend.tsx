import { CSSProperties } from "react"

export interface LegendItem {
    color?:string;
    label:string;
    style?:CSSProperties
}

interface MapLegendProps {
    items:LegendItem[]
    style?:CSSProperties
}

const default_style:CSSProperties = {
    backgroundColor: 'rgba(256,256,256,0.8)',
    padding: '10px',
    borderRadius: '4px',
    border:'1px solid grey', 
    margin:8
}

const MapLegend: React.FC<MapLegendProps> = ({ items, style }) => {
    const divStyle = {...default_style, ...style}

    return (
        <div style={divStyle}>
            {items.map((item, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
                    <div style={{
                        width: '16px',
                        height: '16px',
                        backgroundColor: item.color,
                        borderRadius: '2px',
                        marginRight: '8px'
                    }}></div>
                    <span>{item.label}</span>
                </div>
            ))}
    </div>
    )
}

export default MapLegend;