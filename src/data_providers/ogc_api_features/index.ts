import { axiosInstance, generateSort, generateFilter } from "../wfs/utils";
import { AxiosInstance } from "axios";
import queryString from "query-string";
import { DataProvider } from "../types";

type MethodTypes = "get" | "delete" | "head" | "options";


export const dataProvider = (
  apiUrl: string,
  httpClient: AxiosInstance = axiosInstance
):DataProvider => ({
  getList: async ({ resource, pagination, filters, sorters, meta }) => {
    const url = `${apiUrl}/collections/${resource}/items`;

    const { current = 1, pageSize = 10, mode = "server" } = pagination ?? {};

    const { headers: headersFromMeta, method } = meta ?? {};
    const requestMethod = (method as MethodTypes) ?? "get";

    const {cql_filter:queryFilters, bbox} = generateFilter(filters);
    const generatedSort = generateSort(sorters);

    const query: {
      offset?: number;
      limit?: number;
      filter?: string;
      bbox?:string;
      crs?:string; //Meta
      properties?:string; //Meta
      sortby?:string
    } = {properties:meta?.properties?.join(','), crs:meta?.crs, sortby:''};

    if (mode === "server") {
      query.offset = (current - 1) * pageSize;
      query.limit = pageSize;
    }

    if (generatedSort) {
      query.sortby = generatedSort;
    }

    if (queryFilters) {
      query.filter=queryFilters
    }

    if (bbox !==''){
      query.bbox=bbox
    }
    

    const { data, headers:_headers } = await httpClient[requestMethod](
      `${url}?${queryString.stringify({...query, sortby : undefined})}&sortby=${query.sortby}&`, //"le + - de sortby ne doit pas être urlencode"
      {
        headers: {...headersFromMeta, Accept:"application/vnd.ogc.fg+json"}, //Par défaut, Axios indique "application/json", et OGC API ne retourne alors PAS du geojson (toute les instances ou que la MEL ?)
      }
    );

    const features: any[] = data.features.map((feature:any) => 
        { const { properties, type, ...rest } = feature; //Remonter d'un niveau les properties, supprimer root.type
        return { ...rest, ...properties };}
    )

    return {
      data: features, 
      geojson:data,
      total: data.numberMatched,
    };
  },


  getApiUrl: () => {
    return apiUrl;
  },

})
