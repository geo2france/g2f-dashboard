import {useQuery} from "@tanstack/react-query";

interface useApiProps { // TODO: Reprendre les types depuis le projet refine
    dataProvider:any
    resource:string
    filters?:any[]
    pagination?:any
    sorters?:any[]
    meta?:any 
}

export const useApi = ({dataProvider, resource, filters, pagination, sorters, meta }:useApiProps) => (
    useQuery({
        queryKey:[dataProvider.getApiUrl, resource],
        queryFn: () => dataProvider.getList(
            {
                resource:resource, 
                filters:filters,
                pagination:pagination,
                sorters:sorters,
                meta:meta
            }
        ),
        enabled: true
    })
)
