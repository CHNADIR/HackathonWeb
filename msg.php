<?php
session_start();

if (isset($_SESSION['activite'])) {
    $activite_name = $_SESSION['activite'];
} 

// Fonction pour générer le HTML pour les étoiles
function genererEtoiles($nombreEtoiles) {
    $etoilesHtml = '';
    for ($i = 0; $i < $nombreEtoiles; $i++) {
        $etoilesHtml .= '<i class="fa fa-star" aria-hidden="true"></i> ';
    }
    for ($i = $nombreEtoiles; $i < 5; $i++) {
        $etoilesHtml .= '<i class="fa fa-star-o" aria-hidden="true"></i> ';
    }
    return $etoilesHtml;
}

// Connexion à la base de données
try {
    $bdd = new PDO('mysql:host=localhost;dbname=login_register_db;charset=utf8', 'root', '');
    $bdd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(Exception $e) {
    die('Erreur : '.$e->getMessage());
}

// Récupérer l'ID de l'activité depuis l'URL
$activityName = isset($_GET['activite_id']) ? $_GET['activite_id'] : null;


    // Préparer la requête pour calculer la moyenne des notes
    $requete = $bdd->prepare("SELECT nom_activite, moyenne_note 
                              FROM ( 
                                  SELECT nom_activite, AVG(note) AS moyenne_note 
                                  FROM `reviews` R 
                                  GROUP BY nom_activite 
                              ) F 
                              WHERE nom_activite = :activite_name");
    
    // Exécution de la requête avec le paramètre lié
    $requete->execute(['activite_name' => $activite_name]);

    //$requete = $bdd->prepare("SELECT nom_activite, moyenne_note from ( SELECT nom_activite, AVG(note) AS moyenne_note FROM `reviews` R GROUP BY nom_activite ) F where nom_activite = '$activite_name'");
    //$resultat = $bdd->query($requete);

    
    // Récupérer la moyenne des notes
    $resultat = $requete->fetch(PDO::FETCH_ASSOC);
    
    if ($resultat && $resultat['moyenne_note'] !== null) {
        $moyenneNote = round($resultat['moyenne_note'], 1);
        // Générer les étoiles HTML
        $etoilesHtml = genererEtoiles($moyenneNote);
        echo "La moyenne des notes est : " . $moyenneNote . "<br>" . $etoilesHtml;
    } else {
        echo "Il n'y a pas encore de notes pour cette activité.";
    }

?>
