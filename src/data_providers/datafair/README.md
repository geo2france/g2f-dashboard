# Refine-datafair

[Data Fair API](https://data-fair.github.io/3/en/user-guide-frontoffice/datasetpage/) data-provider for [refine](https://refine.dev/).

## Installation

```bash
npm install https://github.com/geo2france/refine-datafair.git
```

```typescript
import {dataProvider as dfDataProvider} from "refine-datafair";
```

Example : https://github.com/geo2france/odema-dashboard/blob/main/src/App.tsx

## Limitation

Read operations only : sort, pagination, filter (_contains_, _(n)eq_, _(n)startswith_, _(n)endswith_)
