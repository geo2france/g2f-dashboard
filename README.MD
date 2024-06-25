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
- Un gestion du chargement de données

Pour fonctionner correctement, le composant enfant doit exporter la référence de l'élément graphique (_echart_ ou _maplibre_) à l'aide du hook `useDashboardElement`.

#### Propriétés

- `title` : Titre de l'élément
- `attributions` : Crédits, sous la forme `[{name: 'Source 1', url: 'url1'}, {name: 'Source 2', url: 'url2'},{...}]`
- `isFetching` : Booléen qui indique si les données sont en train d'être télécharger (floute le graphique si le chargement dépasse les 500ms)
- `toolbox` : Booléen pour afficher/masquer le menu contextuel permettant l'affichage plein écran et les exports de données/images
- `fullscreen` : Booléen pour autoriser le mode plein-écran
- `exportPNG` : Booléen pour autoriser l'export en format image
- `exportData` : Booléen pour autoriser l'export de données



#### Export des données

Les données proposées au téléchargement à l'utilisateur sont à définir dans le hook `useExportData`. Si, pour un graphique, les données sont susceptibles de changer, on passera les variables qui déclanchent ce changement dans le paramètre `dependencies`.
L'utilisateur peut télécharger les données en _csv_, _ods_ ou _xlsx_.

Il est possible de désactiver l'export de données en passant le paramètre `exportData=False` au composant `DashboardElement`.

Exemple :
```typescript
    // La sélection d'une autre année change les données a télécharger
    useChartData({data:data_chart, dependencies:[year]})
```


#### Export en image :

Les cartes et graphiques peuvent être exportées en PNG.
Il est possible de désactiver l'export d'image en passant le paramètre `exportPNG=False` au composant `DashboardElement`.


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

#### Plein-écran :

Il est possible de désactiver l'affichage en plein écran en passant le paramètre `fullscreen=False` au composant `DashboardElement`.


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

Récuperer des états depuis l'URL et met à jours l'URL en cas de modification des états. C'est l'équivalent de [useState](https://react.dev/reference/react/useState) mais avec synchronisation de l'URL. 
Utile pour permettre aux utilisateurs de partager un tableau de bord avec ces états (filtres, etc.).

Exemple :
```Typescript
    //Syncronise la variable 'year' avec le paramètre 'annee' de l'URL
    const [year, setYear] = useSearchParamsState('annee','2021')  
```
