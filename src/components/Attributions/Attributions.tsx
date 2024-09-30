import { Tooltip, Typography } from 'antd';
import React, { CSSProperties } from 'react';
import CC from "../../assets/img/cc.svg?react";
import BY  from "../../assets/img/by.svg?react";

const { Text, Link } = Typography;

export interface SourceProps {
    name:string,
    url?:string,
}

interface AttributionProps {
    data:SourceProps[]
    style?:CSSProperties
}

const Attribution: React.FC<AttributionProps> = ({ data, style }) => {
    const licence_logo_style:React.CSSProperties = {height:'12px', width:'12px'}
    const plural = data.length > 1 ? 's' : ''
    return (
        <div style={{paddingLeft:4, paddingBottom:4, ...style}}>
            <Text type="secondary">{`Source${plural} des données: `}
                {data.map((e: SourceProps, i:number) => (
                    <span key={i}>
                        <Link href={e.url}>{e.name}</Link>
                        {i < data.length - 1 ? ", " : ""}
                    </span>
                ))}
                <span> | Réalisation : <a href='https://www.hautsdefrance.fr/communique-de-presse-lancement-de-lobservatoire-dechets-matieres-odema-des-hauts-de-france/' >Odema</a> </span>
                <Tooltip title="CC BY" placement="bottom">
                    <CC style={licence_logo_style}/>
                    <BY style={licence_logo_style} />
                </Tooltip>
            </Text>

        </div>
    )
};

export default Attribution;