import alasql from "alasql";
import { EChartsOption } from "echarts";
import ReactECharts from 'echarts-for-react'; 

type EChartsSeriesTypes = ('line' | 'bar' | 'pie' | 'scatter');

interface IDashboardChartProps {
    data?: any[];
    chart_type?: EChartsSeriesTypes;  // Utiliser directement le type de SeriesOption
    sql? : string;
    echarts_option?: any;
}


// Les données doivent être de la forme {x :   y : }

const DashboardChart: React.FC<IDashboardChartProps> = ({data, chart_type='line', sql}) => {

    const data_xy = sql ? alasql(sql, [data]) : data;

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
        option={options} />
    )
}


export default DashboardChart;
 