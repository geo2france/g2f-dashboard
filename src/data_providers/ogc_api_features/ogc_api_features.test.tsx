import '@testing-library/jest-dom';
import { QueryClient } from '@tanstack/react-query'
import { OGCApiProvider } from '../..';
import { CrudFilters, Pagination } from '../types';

const test_provider_url = "https://demo.ldproxy.net/cologne_lod2"
const test_page_size = 3;
const test_filter_field = "roofType";
const test_filter_value = "1000";

const resource = "building";
const filters: CrudFilters = [
  {
    field: test_filter_field,
    operator: "eq",
    value: test_filter_value,
  },
];

const pagination: Pagination = {
  mode: "server",
  pageSize: test_page_size,
};


//TODO ajouter un test avec fitre sur valeur numérique #47 https://github.com/geo2france/g2f-dashboard/issues/47

const queryClient = new QueryClient()


describe("OGC API Provider", () => {

    test("basic filter & limit", async () => {
        const provider = OGCApiProvider(test_provider_url)

        const queryKey = [provider.getApiUrl, resource, filters, pagination, undefined, undefined];

        const result = await queryClient.fetchQuery({
            queryKey: queryKey,
            queryFn: () => provider.getList({
                resource: resource, 
                filters: filters,
                pagination: pagination,
                sorters: undefined,
                meta:undefined
            }),
        });
        expect(result).toHaveProperty('data');
        expect(result.data).toHaveLength(test_page_size); 
        expect(result.data[0][test_filter_field]).toEqual(test_filter_value);

    });


    test("properties selection", async () => {
      const meta = {
        properties:['datenquelleLage','gemeindeschluessel'] // Ne récuperer que ces champs
      }
      const provider = OGCApiProvider(test_provider_url)

      const queryKey = [provider.getApiUrl, resource, filters, pagination, undefined, meta];

      const result = await queryClient.fetchQuery({
          queryKey: queryKey,
          queryFn: () => provider.getList({
              resource: resource, 
              filters: filters,
              pagination: pagination,
              sorters: undefined,
              meta:meta
          }),
      });
      expect(result).toHaveProperty('data');
      expect(result.data).toHaveLength(test_page_size); 
      expect(result.data[0]).not.toHaveProperty("roofType"); 

  });

});