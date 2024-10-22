# DashboardLayout

Ce composant permet de rendre une mise en page de tableau de bord.
Il prend pour enfant des composants [DashboardElement](../DashboardElement/) et les dipose dans une grille 
(2 colonne sur ordinateur, 1 seule sur mobile).
Si au moins un des [DashboardElement](../DashboardElement/) a une pripriété `section`, le composant `DashboardLayout` propose à l'utilisateur
des boutons permettants de naviguer entre les sections, en ajoutant une éventuelle section _Autres_.

Il est possible de lui passer une propriété `controle` contenant des **éléments de formulaire** (choix de l'année ou autres paramètres).
Ceux-ci seront affichées dans une barre en haut de la page.
![TODO](https://img.shields.io/badge/TODO-A%20compléter-orange)

## Exemple 

```tsx
 <DashboardLayout
    control={<MonFormulaireDeControle>} >

    <DashboardElement
        title="Mon graphique de démo"
        section="Catégorie 1"
        >
        <MonGraphique1 />
    </DashboardElement>

    <DashboardElement
        title="Un autre graphique de démo"
        section="Catégorie 2"
        >
        <MonGraphique2 />
    </DashboardElement>

</DashboardLayout>
```