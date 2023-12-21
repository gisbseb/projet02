# projet02

Dans le dossier server ctrl + s pour relancer le script de génération de la base de donnée si erreur
![Capture d'écran 2023-12-18 100508](https://github.com/gisbseb/projet02/assets/134271562/2c4e44f0-06ae-4d59-9b6e-50f96e7ebaec)
![Capture d'écran 2023-12-21 123701](https://github.com/gisbseb/projet02/assets/134271562/42ec5e6a-c368-4c84-a862-638a4f8d21d5)

Besoin du client
Présentation générale

Le client est un designer, il ne se considère pas comme un artiste, mais plutôt comme un artisan. Il dessine les plans de ses meubles, commande les différents matériaux puis les donne à un atelier spécialisé qui les réalise.

Il ne possède pas de magasin pour exposer ses réalisations.

Voici l'organisation du client :

Travail de recherche.
Calcul des différentes quantités de matière première nécessaires.
Commande des quantités de matière première.
Envoi des plans de conception avec les matières premières à l'atelier spécialisé.
Livraison au client ou magasin ou stockage des meubles dans son entreprise.
Il aimerait avoir une application qui liste les meubles qu'il réalise avec la possibilité de voir exactement quels sont les matériaux qu'il a utilisé pour chaque réalisation. Il donne un nom pour chaque meuble qu'il conçoit. Parfois il fait le même meuble plusieurs fois.

Contraintes techniques
Vous devez faire un trello pour organiser/planifier les étapes de conception.

Votre code sera versionné à l'aide de Git sur Github ou Gitlab, le dépôt devra être donné au formateur dès le départ du projet.

Utilisez Node.js, Express et un moteur de rendu (pug). Vous pouvez également utiliser React pour la partie "front".

Vous devez également créer une persistance pour les données avec MySQL ou MongoDB avec Mongoose pour Node.js et l'intégrer à l'API ou à l'application.

Il faudra également mettre en place une page de login pour consulter/lancer la création des statistiques.

Vous devez faire la partie interface utilisateur à partir du chapitre qui suit ci-dessous.

Organisation & contraintes de développement
Le client aimerait avoir dans son application les matériaux utilisés suivants, il indique également le nom de chaque entreprise le fournissant :

Il y a 7 matières premières et que 3 entreprises :

Bois : frêne , chêne et noyer. Entreprise : BBois

Fer : acier inox et aluminum. Entreprise : MetaLo

Plastique. Entreprise : pPlastique.

Il aimerait également avoir les catégories de meuble suivantes dans lequel il pourrait enregistrer l'ensemble de ses réalisations :

Armoire

Etagère

Il aimerait avoir les fonctionnalités suivantes dans son application :

Un système de mot clés sera mis en place pour associer meuble et matière(s) première(s). Ces mots clés sont cliquables et la page présentera le détail de cette matière.

Vous êtes libre sur le choix des technologies à utiliser pour le développement de cette application. Cependant vous devez considéré les points suivants : L'utilisation d'une librairie JavaScript comme Chart.js pour la réalisation des graphiques.

Vous devez analyser les besoins du client décrit dans ce document et fournir un schéma de la base de données sous forme d'un pdf.

Le client aimerait que son application s'inspire des modèles suivants : Bootstrap 5 Admin Dashboard Theme.
trello: https://trello.com/b/ktb3VpNP/projet-02
