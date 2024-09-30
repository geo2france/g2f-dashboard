import { Tooltip, Typography } from 'antd';
import React, { CSSProperties } from 'react';
import CC from "../../assets/img/cc.svg?react";
import BY  from "../../assets/img/by.svg?react";
import SA from "../../assets/img/sa.svg?react";
import NC from "../../assets/img/nc.svg?react";
import ZERO from "../../assets/img/zero.svg?react";
import PD from "../../assets/img/pd.svg?react";
import { License } from '../../types';

const { Text, Link } = Typography;

export interface SourceProps {
    name:string,
    url?:string,
}

interface AttributionProps {
    data:SourceProps[]
    style?:CSSProperties
    licenses?:License[]
}

const Attribution: React.FC<AttributionProps> = ({ data, style, licenses }) => {
    const licence_logo_style:React.CSSProperties = {height:'12px', width:'12px'}
    const plural = data.length > 1 ? 's' : ''

    const logoMapping: { [key: string]: React.FunctionComponent<React.SVGProps<SVGSVGElement>> } = {
        CC,
        BY,
        SA,
        NC,
        ZERO,
        PD,
      };

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
                <Tooltip title={licenses?.join(' ')} placement="bottom">
                    { licenses?.map((license, index) => {
                        const LogoComponent = logoMapping[license];
                        return (<LogoComponent key={index} style={licence_logo_style} aria-label={license} />)
                    })}
                </Tooltip>
            </Text>

        </div>
    )
};

export default Attribution;