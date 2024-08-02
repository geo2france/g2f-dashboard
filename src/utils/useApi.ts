import {useQuery} from "@tanstack/react-query";
import { CrudFilters, CrudSorting, DataProvider, Pagination } from "../data_providers/types";

interface useApiProps {
    dataProvider:DataProvider
    resource:string
    filters?:CrudFilters
    pagination?:Pagination
    sorters?:CrudSorting
    meta?:any
}

export const useApi = ({dataProvider, resource, filters, pagination, sorters, meta }:useApiProps) => (
    useQuery({
        queryKey:[dataProvider.getApiUrl, resource, filters, pagination, sorters, meta],
        queryFn: () => dataProvider.getList(
            {
                resource:resource, 
                filters:filters,
                pagination:pagination,
                sorters:sorters,
                meta:meta
            }
        ),
        enabled: true,
        staleTime: 5*60*1e3, //Default staletime 5min
    })
)
