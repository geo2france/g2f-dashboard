# wfs-data-provider

[WFS](https://www.ogc.org/standard/wfs/) data provider for [refine](https://github.com/refinedev/refine).

Tested with WFS 2.0.0 and geoserver.

## Installation

```bash
npm install https://github.com/geo2france/refine-wfs.git
```

```typescript
import {dataProvider as wfsDataProvider} from "refine-wfs";
```

Example : https://github.com/geo2france/odema-dashboard/blob/main/src/App.tsx

## CRUD

Only read operations are supported (pagination, sorters, getlist, getone, getmany).

## Supported filters operators
- `ne`
- `gte`
- `gt`
- `lte`
- `lt`
- `eq`
- `contains`
- `startswith`
- `endswith`
- `containss`
- `startswiths`
- `endswiths`
- `ncontains`
- `nstartswith`
- `nendswith`
- `ncontainss`
- `nstartswiths`
- `nendswiths`
- `in`

In combination with `geometry` field, the `in` operator is used to specify the _bounding box_.
Otherwith, it is used to check if field is included in array.


## Meta

- `srsname` : specify coordinates systeme (e.g. : `EPSG:2154`)
- `propertyname` : return only given list of properties (e.g. : `['name','annee']`). Useful for avoid fetching large geometries.

See [WFS Reference](https://docs.geoserver.org/latest/en/user/services/wfs/reference.html) for details.
