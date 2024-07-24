import { mapOperator } from "./mapOperator";

export const generateFilter = (filters?: any[]) => {
  const array_filter: string[] = []
  let bbox: string = ''
  if (filters) {
    filters.map((filter) => {

      if (filter.operator !== "or" && filter.operator !== "and" && "field" in filter){ // LogicalFilter
        const mappedOperator = mapOperator(filter.operator);
        if (filter.field === "geometry"){
          bbox = filter.value;
        }else{
          const value = (() => {switch (filter.operator){
            case "contains":
            case "containss":
            case "ncontains":
            case "ncontainss":
              return  `'%${filter.value}%'`
            case "startswith":
            case "startswiths":
            case "nstartswith":
            case "nstartswiths":
              return  `'${filter.value}%'`
            case "endswith":
            case "endswiths":
            case "nendswith":
            case "nendswiths":
              return  `'%${filter.value}'`
            case "in":
              return `(${filter.value.map((i:string) => `'${i}'`).join(',')})`
            default:
              return `'${filter.value}'`
          }})()
          array_filter.push( `${filter.field} ${mappedOperator} ${value}`)
        }
      }else{ //Conditionnal filter
        throw new Error(
          `[wfs-data-provider]: Condtionnal filter 'OR' not implemented yet `
          ); 
      }

    });
  }

  return {cql_filter : array_filter.join(' and '), bbox:bbox};
};
