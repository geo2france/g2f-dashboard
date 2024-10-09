import alasql from "alasql";
import { EChartsOption } from "echarts";
import ReactECharts from 'echarts-for-react'; 
import { useRef } from "react";
import { useChartData, useDashboardElement } from "../DashboardElement/hooks";

type EChartsSeriesTypes = ('line' | 'bar' | 'pie' | 'scatter');

interface IDashboardChartProps {
    data?: any[];
    chart_type?: EChartsSeriesTypes;  // Utiliser directement le type de SeriesOption
    sql? : string;
    echarts_option?: any;
}


// Les données doivent être de la forme {x :   y : }

const DashboardChart: React.FC<IDashboardChartProps> = ({data, chart_type='line', sql}) => {
    const chartRef = useRef<any>();
    useDashboardElement({chartRef})

    const data_xy = sql ? alasql(sql, [data]) : data;

    useChartData({data:data_xy})

    const xtype = typeof data_xy[0].x === 'number' ? 'value' : 'category';
    const ytype = typeof data_xy[0].y === 'number' ? 'value' : 'category';

    const options:EChartsOption = {
        series:[
            {
                type:chart_type,
                data:data_xy.map((e:any) => [e.x, e.y])
            }
        ],
        xAxis:{
            type:xtype
        },
        yAxis:{
            type:ytype
        }
    }
    return (
        <ReactECharts
        option={options} ref={chartRef} />
    )
}


export default DashboardChart;
 