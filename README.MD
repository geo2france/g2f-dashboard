# G2F-Dashboard

Collection de composants React pour faciliter la création de tableaux de bords.

Utilisés pour le [tableau de bord de l'Odema](https://github.com/geo2france/odema-dashboard).

## Utilisation

### DashboardElement

Le composant [DashboardElement](src/components/dashboard_element/index.tsx) peut-être utilisé pour ajouter des fonctionnalités à un _element_ (graphique ou cartographique) de tableau de bord.
Il ajoute :
- Une _card_ servant de conteneur, avec titre et crédit.
- Un menu contextuel permettant à l'utilisateur de :
    - Afficher le contenu en plein écran
    - Exporter le contenu en format image (png)

Pour fonctionner correctement, le composant enfant doit exporter la référence de l'élément graphique (_echart_ ou _maplibre_) à l'aide de du hook `useDashboardElement`.

Exemples :
```typescript
export const MapIsdnd: React.FC<IMapProps> = ({ data, style }) => {
  const mapRef = useRef<any>(null);
  useDashboardElement({chartRef:mapRef})
  [...]
  return (
    <Map
      reuseMaps
      preserveDrawingBuffer={true}
      ref={mapRef}
      style={style} [...]/>
    )
}
```
Pour les cartes, la propriété `preserveDrawingBuffer={true}` est nécessaire pour permettre l'export PNG (sinon, le fichier exporté sera blanc).

```typescript
export const ChartIsdndGlobal: React.FC<IChartIsdndGlobalProps> = ({ data, style}) => {
    const chartRef = useRef<any>();
    useDashboardElement({chartRef})
    [...]
    return (
        <ReactECharts
        option={option} ref={chartRef} style={style} />
    )
}
```

Les données proposées au téléchargement à l'utilisateur sont à définir dans le hook `useExportData`. Si, pour un graphique, les données sont susceptibles de changer, on passera les variables qui déclanche se changement dans le paramètre `dependencies`

Exemple :
```typescript
    //La sélection d'une autre année change les données affichées
    useChartData({data:data_chart, dependencies:[year]})
```

### useChartEvents

Le hook `useChartEvents` permet de définir des fonctions callback à executer au click (_onClick_) ou au survol (_onFocus_) des graphiques.
Le callback reçoit comme paramètres un objet qui contient des informations sur l'élément qui l'a déclanché (nom de la série, données, etc.). La structure de l'objet varie selon le type de graphique.

Généralement, le callback sera une fonction qui va modifier un état (_state_) du parent (_setState_).

TODO : Exemple concret montrant comment l'année cliquée sur le graphique est remontée à la page.

Exemple :
```typescript
    useChartEvents({chartRef, onFocus})
```

### useChartActionHightlight

Le hook `useChartActionHightlight` permet de manuellement mettre en évidence (_highlight_) une portion du graphique.
L'élement à éclairer peut-être défini par son nom ou le nom de sa série (ou plus rarement son index).

TODO : Exemple concret avec _bar_ et _pie_ et cas d'usage.

Notes : le _hilight_ est un effet subtil. Souvent on privilégiera un changement de couleur pour mettre en évidence une information importante (par exemple l'année sélectionnée).
Le _hilight_ sera plus souvent utilisé pour mettre un évidence un élément similaire à plusieurs graphique lors du survol d'un des deux graphique.

### useSearchParamsState

Récuperer des etats depuis l'URL. C'est l'équivalent de [useState](https://react.dev/reference/react/useState), mais dont la valeur initiale peut être récupérer via l'URL. Utile pour permettre aux utilisateurs de partager un tableau de bord avec ces états (filtres, etc.).