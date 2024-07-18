// Documentation Echarts : https://echarts.apache.org/en/option.html
// Documentation Alasql : https://github.com/AlaSQL/alasql/wiki/

import React, { CSSProperties, useRef } from "react";
import ReactECharts from 'echarts-for-react';
import { EChartsOption, BarSeriesOption } from "echarts";
import alasql from "alasql";

import { useChartData, useDashboardElement } from "../src/components/DashboardElement/hooks"
import { useChartActionHightlight, useChartEvents } from "../utils/usecharthightlight";

/**
 * La structures des données attendues.
 */
interface DataProps { 
    key1:number
    key2:string
    key3?:number // Champs optionnel
    [key: string]: any // Permettre les champs supplémentaires
}

/**
 * Les properties du composant
 */
export interface ChartMychartProps {
    data: DataProps[]
    onFocus?: (e:any) => void;
    focus_item?: string;
    style?: CSSProperties; // Style à appliquer au graphique ECharts
    year?: number
  }


export const ChartMychart: React.FC<ChartMychartProps> = ({data, onFocus, focus_item, style, year} )  => {
    const chartRef = useRef<any>()
    
    useChartEvents({chartRef:chartRef, onFocus:onFocus}) // Optionnel, récupérer des évenements (click ou focus) vers le parents
    useChartActionHightlight({chartRef:chartRef, target:{seriesName:focus_item}}) // Optionnel, pour déclencher des Hightlight sur le graphique
    useDashboardElement({chartRef})  // Nécessaire pour DashboardElement

    const data_chart = alasql(`SELECT 
    [key1] AS [value], 
    [key2] AS [item]
    FROM ?`,
    [data.filter((e) => e.annee == year)]) // Traitement SQL et/ou JS des données. Le format de sortie doit être utilisable par EChart

    useChartData({data:data_chart, dependencies:[year]}) // Données proposées en export à l'utilisateur (xls, csv, ods) via DashboardElement

    const serie:BarSeriesOption = { // Adapter le type (PieSeriesOption, etc.)
         name:'Ma série',
         data:data_chart,
         type:'bar',
         emphasis:{
            focus:'series'
        },
    }

    const option:EChartsOption = {
        series:[serie],
        tooltip:{
            show:true,
        },
        xAxis: [
            {
                type: 'category'
            }],
        yAxis: [
            {
                type: 'value'
            }
        ]

    }
    return (
        <ReactECharts option={option} ref={chartRef} style={style} />
    )
}