<?php
// Connexion à la base de données
$bdd = new PDO('mysql:host=localhost;dbname=login_register_db;charset=utf8', 'root', '');

// Calcul de la moyenne des notes dans la table 'evaluation'
$recupMoyenne = $bdd->query("SELECT AVG(Note) as moyenneNote FROM evaluation");
$moyenne = $recupMoyenne->fetch();

// Vérifiez si $moyenne['moyenneNote'] est NULL
if ($moyenne['moyenneNote'] !== NULL) {
    $moyenneNote = round($moyenne['moyenneNote'], 2); // Arrondi à deux décimales
} else {
    $moyenneNote = 0; // Ou une autre valeur par défaut si aucune note n'existe
}
?>
<div class="moyenne-note" style="text-align: right">
    <p>Moyenne des notes : <?= $moyenneNote; ?> /5 </p>
</div>
