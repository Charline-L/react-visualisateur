# react-visualisateur


Projet réalisé dans le cours de React Native ECV Digital.

J'ai souhaité créer une projet en utilisant la réalité augmenté étant une technologie qui m'est totalemetn inconnue mais qui m'intrigue.

Pour l'utiliser j'ai donc du me documenter sur Three.js librairiee open source de WEBGL.
Pour travailler avec le son j'avais commencé l prjet côté navigateur et j'avais utilisé l'ap web audio... je me suis retrouvé donc bloquée lors de la mise en place sur le react.
Par manque de temps je n'ai pas trouvé d'équivalent pour le context audio. Le code est cependant toujours présent dans Analyzer.js

Vu que le son n'a pas pu être utiliser comme je le souahitais j'ai donc voulu travailler sur l'image, en détextant les couleurs présentes et les appliquer sur les formes 3D.
Pour faire cela dépendant de nombreuses librairie javascript, j'ai donc mis en place une vue qui est une page html classique et qui va lire l'image et retourner les couleurs extraites.
J'ai utiliser la fonction postMessage et son event listener pour communiquer.

Pour le son j'ai utiliser le composant Audio de Expo.

J'ai garder la navigation en onglets pensant que cela pouvait être pratique pour l'application étant en plusieurs étapes.

J'ai voulu intégrer une animation lottie pour le logo, en revanche je n'ai pas eu le temps de faire des animations, ce qui manque à l'application je trouve.