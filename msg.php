<?php
// Connexion à la base de données
$bdd = new PDO('mysql:host=localhost;dbname=login_register_db;charset=utf8', 'root', '');

// Cette fonction génère le HTML pour le nombre d'étoiles en fonction de la note
function genererEtoiles($nombreEtoiles) {
    $etoilesHtml = '';
    for($i = 0; $i < $nombreEtoiles; $i++) {
        $etoilesHtml .= '<i class="fa fa-star" aria-hidden="true"></i> ';
    }
    return $etoilesHtml;
}

// Assurez-vous que $currentActiviteId contient l'ID de l'activité actuelle
$currentActiviteId = 1; // Remplacez par la logique de récupération dynamique de l'ID si nécessaire

// La requête SQL pour calculer la note moyenne pour l'activité concernée
$requete = $bdd->prepare("SELECT AVG(Note) AS moyenneNote FROM evaluation WHERE activite_id = :activite_id;");
$requete->execute(['activite_id' => $currentActiviteId]);

// Récupérer le résultat et afficher la note moyenne pour l'activité en question
$resultat = $requete->fetch();
if ($resultat) {
    $moyenneNote = round($resultat['moyenneNote'], 2); // Arrondi à deux décimales
    $nombreEtoiles = round($moyenneNote); // Le nombre d'étoiles à afficher

    // Afficher la note moyenne avec des étoiles
    echo "<div class='info-activite'>";
    echo "<p>Moyenne des notes : " . genererEtoiles($nombreEtoiles) . " (" . $moyenneNote . ") sur 5 </p>";
    echo "</div><br>";
} else {
    echo "<div class='info-activite'>";
    echo "<p>Pas de note disponible pour cette activité.</p>";
    echo "</div><br>";
}
?>

<div class="moyenne-note" style="text-align: right">
    <p>Moyenne des notes : <?= $moyenneNote; ?> /5 </p>
</div>
