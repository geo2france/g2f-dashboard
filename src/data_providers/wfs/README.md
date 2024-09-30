# wfs-data-provider

## Fournisseurs de données (non exhaustif)

- [Geo2France](https://www.geo2france.fr/datahub/)
- [Métropole Européenne de Lille](https://data.lillemetropole.fr/)
- [DataGrandEst](https://www.datagrandest.fr/data4citizen)

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
