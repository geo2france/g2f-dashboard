import { CrudSorting } from "@refinedev/core";

export const generateSort = (sorters?: CrudSorting) => {
  if (sorters && sorters.length > 0) {
    const _sort: string[] = [];

    sorters.map((item) => {
      const order = (() => {switch (item.order) {
        case 'asc':
          return 'A'
        case 'desc':
          return 'D'
        default :
          return 'A'
      }})();
      _sort.push(`${item.field}+${order}`);
    });

    return _sort.join(',');
  }

  return;
};
