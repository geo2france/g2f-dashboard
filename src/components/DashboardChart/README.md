# DashboardChart

Le composant DashboardChart facilite la création de graphique à deux dimensions.
Le type de graphique `chart_type` est à choisir parmis les suivants : `'bar' | 'pie' | 'line' | 'scatter' `. 

## Les données et les axes

Les données `data` doivent être une liste d'objets ayant chacun _exactement_ deux propriétés. Le nom des propriétés est libre, et consitituerons les noms des axes.
Par défaut, la première clé correspond aux abscisses (X) et la seconde aux ordonnées (Y). Il est possible d'inverser ceci avec `reverse_axies=true`.
Le type d'axe (`value` ou `category`) est déterminé automatiquement à partir du contenu des données (numérique ou texte).

DashboardChart permet également d'appliquer une requête `sql` pour traiter les données à la volée (par exemple pour réaliser une aggrégation). Le nom de la table à utilisé est `?` (exemple : `SELECT x as commune, y as population FROM ?`). Pour plus d'information, voir la [documentation AlaSQL](https://github.com/AlaSQL/alasql/wiki/Select).
Si aucune requête n'est fournie, les données `data` sont directement utilisées.

## Intégration dans la page

Il est intéressant de placer _DashboardChart_ en tant qu'enfant de [_DashboardElement_](../DashboardElement/) : En plus de l'habillage du graphique (titre, crédits, etc.), ceci permettra de proposer automatiquement à l'utilisateur d'exporter les données en format tabulaire (CSV, ODS, etc.).


## Personnalisation avancée

La propriété `echarts_option` permet de personnaliser le graphique en éditant directement la configuration du graphique. Voir les paramètres disponibles dans la [documentation de Apache ECharts](https://echarts.apache.org/en/option.html).

## Exemple 

```tsx
  <DashboardElement title="Mon graphique de test">
      <DashboardChart 
          data={[{mavar:'a', autrevar:2},{mavar:'b', autrevar:5},{mavar:'c', autrevar:4}]}
          chart_type="bar"
          echarts_option={{
            xAxis:{show:false}, 
            yAxis:{axisLabel:{color:'red'}}, 
            tooltip:{show:true} 
          }}
      />
  </DashboardElement>
```
