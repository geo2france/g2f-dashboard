export const generateSort = (sorters?: any[]) => {
  if (sorters && sorters.length > 0) {
    const _sort: string[] = [];

    sorters.map((item) => {
      const order = (() => {switch (item.order) {
        case 'desc':
          return '-'
        case 'asc':
        default :
          return ''
      }})();
      _sort.push(`${order}${item.field}`);
    });

    return _sort.join(',');
  }

  return;
};
