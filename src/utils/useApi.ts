import {UseQueryOptions, UseQueryResult, useQuery} from "@tanstack/react-query";
import { CrudFilters, CrudSorting, DataProvider, Pagination } from "../data_providers/types";

interface useApiProps<TData, TError> {
    dataProvider:DataProvider<TData>
    resource:string
    filters?:CrudFilters
    pagination?:Pagination
    sorters?:CrudSorting
    meta?:any
    useQueryParams?:Partial<UseQueryOptions<TData, TError>>;
}

export const useApi = <TData, TError>({dataProvider, resource, filters, pagination, sorters, meta, useQueryParams }:useApiProps<TData, TError>):UseQueryResult<TData, TError> => (
    useQuery<TData, TError>({
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
        ...useQueryParams
    })
)
