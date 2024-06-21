import { BaseRecord } from "@refinedev/core";
import { FeatureCollection, Feature } from "geojson";

export interface IBaseRecordToGeojsonPoint{
    data : BaseRecord[],
    x : string,
    y : string,
    crs_name? :string
}

export interface FeatureCollection_crs extends FeatureCollection {crs?:any};

export const BaseRecordToGeojsonPoint = ({data, x, y, crs_name}:IBaseRecordToGeojsonPoint) => {

    //Tester maplibre avec CRS != 4326
    const features:Feature[] = data.map((e:BaseRecord) => 
       ( {
        type:"Feature",
        properties:{...e},
        geometry:{
            type:"Point",
            coordinates:[e[y], e[x]]
         }
       }
    ))

    const geojson:FeatureCollection_crs = {"type": "FeatureCollection", features:features}

    if (crs_name){
        geojson.crs={type:"name", properties:{"name":crs_name}} //no longer supported in geoJSON ? https://github.com/DefinitelyTyped/DefinitelyTyped/issues/21794
    }
    return geojson
}