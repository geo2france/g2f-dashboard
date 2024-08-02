# Hooks et fonctions

### useApi

Permet de récupérer des données depuis un [Dataprovider](/src/data_providers/).
Paramètres : 
- _resource_ (jeu de données)
- _filters_
- _sorters_
- _pagination_
- _meta_
- _useQueryParams_ : pour passer directement des paramètres à `useQuery`

Retourne les données et différentes informations sur la requête, voir [useQuery](https://tanstack.com/query/v4/docs/framework/react/reference/useQuery)

Par défaut, le _staleTime_ est à 5 minutes. Cela permet d'alléger le serveur en s'assurant que la même requête n'est pas effectuée plus d'une fois par tranche de 5 minutes. Ce comportement peut-être modifié en surcouchant le paramètre avec _useQueryParams_.

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

### useChartExport

Obtenir l'export image (img64) d'un composant ECharts ou MapLibre dont la référence `chartRef` est passé en paramètre.
L'image peut ensuite être proposée en téléchargement à l'utilisateur (ou utilisée d'une autre manière).

Exemple : 
```typescript
const {img64, exportImage} = useChartExport({chartRef:chartRef})

const downloadImage = () => { // Fonction déclenchée au click de l'utilisateur
   exportImage()
   setRequestDlImage(true)
}

useEffect(() => { //Proposer le téléchargement d'une image générée.
    if(img64 && requestDlImage){
        const link = document.createElement('a');
        link.href = img64;
        link.download = `${title}.png`;
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setRequestDlImage(false)
    }
}, [img64])
```