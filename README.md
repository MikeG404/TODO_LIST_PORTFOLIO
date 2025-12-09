## Training Microtasks

- [x] Pouvoir afficher la liste des tâches depuis MongoDB dans Next.js
    - [X] Créer la fonction getTodos
        - [X] Se connecter à la base de données avec connectDB()
        - [x] Récupèrer la liste des données
        - [x] retourner les données reçues
        - [x] console.log pour vérifier les données
    PARTIE UI
    - [X] Créer un composant Task avec les valeurs récupèrer en DB
    - [X] Afficher le composant pour vérification
    - [x] Créer le composants TaskList
        - [x] Utiliser Map et importer Task
    - [x] Afficher la liste dans le Dahsboard

-  [X] Gèrer la partie checkbox
    - [X] Vérifier quelle propriété permet de checker
    - [X] Si isCompleted est true la checkbox est coché
    - [X] Faire le changement en DB
        - [X] Récupèrer l'id de l'élément checker
        - [X] Changer la valeur de isCompleted par true si il 
              est false et inversément
        - [X] Renvoyer un success
- [X] Gérer la partie supprimer
    - [X] Créer la fonction deleteTodo
        - [X] Se connecter à la base de données avec connectDB()
        - [X] Supprimer la tâche
        - [X] Renvoyer un success

- [X] Créer la partie UI
    - [X] Créer le bouton supprimer pour chaque Todo

- [ ] Passer le formulaire sur react-hook-form et retirer Form data dans les actions
    - [X] utiliser le hook useForm
    - [X] utiliser le register
    - [] Validation de données