<!DOCTYPE html>
<html lang="fr">
<head>
   <meta charset="UTF-8">
   <meta http-equiv="X-UA-Compatible" content="IE=edge">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <title>BlueAcces - Carte 3D Paris 8</title>

   <link rel="stylesheet" href="https://unpkg.com/swiper@7/swiper-bundle.min.css" />
   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
   <link rel="stylesheet" href="css/style.css">
   <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
   <script>
      $(document).ready(function(){
         $(".scroll-top").click(function() {
            $("html, body").animate({
               scrollTop: 0
            }, "slow");
            return false;
         });
      });
   </script>
</head>
<body>
   <section class="header">
      <nav class="navbar">
         <a href="home.php">Accueil</a>
         <a href="about.php">À Propos</a>
         <a href="package.php">Les activités</a>
         <a href="rentabilite.php">Rentabilité</a>
         <a href="map.php" class="active">Carte 3D</a>
         <a href="book.php">Reservation</a>
         <a href="logout.php">Déconnexion</a>
      </nav>

      <div id="menu-btn" class="fas fa-bars"></div>
      <a href="home.php" class="logo"><img src="images/logo-SNR.png" height="80px" width="110px" alt="SNR"></a>
   </section>

   <div class="heading map-heading">
      <h1>Carte 3D</h1>
   </div>

   <section class="campus-map">
      <div class="map-intro">
         <span class="eyebrow">Université Paris 8</span>
         <h2>Plan 3D du campus Vincennes-Saint-Denis</h2>
         <p>
            Cette carte 3D simplifiée reprend les principaux bâtiments indiqués sur le plan Paris 8 :
            bâtiments A, B1, B2, C, D, BU, MDE, CROUS, G, J et L. Elle aide à visualiser les zones
            clés du campus pour l’orientation et l’accessibilité.
         </p>
      </div>

      <div class="map-frame">
         <img src="images/paris8-map-3d.svg" alt="Plan 3D simplifié du campus Paris 8 Vincennes-Saint-Denis">
      </div>
      <p class="map-note">
         Carte stylisée à partir du plan fourni : elle sert de support visuel pour présenter
         l’orientation BlueAcces et ne remplace pas la signalétique officielle du campus.
      </p>

      <div class="map-legend">
         <h2>Légende</h2>
         <div class="legend-grid">
            <div class="legend-item"><span class="legend-color building-a"></span>Bâtiment A</div>
            <div class="legend-item"><span class="legend-color building-b"></span>Bâtiments B1 et B2</div>
            <div class="legend-item"><span class="legend-color building-c"></span>Bâtiments C et D</div>
            <div class="legend-item"><span class="legend-color building-d"></span>BU, MDE et CROUS</div>
            <div class="legend-item"><span class="legend-color building-g"></span>Bâtiments G, J et L</div>
            <div class="legend-item"><span class="legend-color access"></span>Entrée M13 et parcours</div>
         </div>
      </div>

      <div class="map-accessibility">
         <h2>Repères utiles</h2>
         <ul>
            <li><strong>Entrée M13 :</strong> accès Saint-Denis Université.</li>
            <li><strong>BU :</strong> bibliothèque universitaire.</li>
            <li><strong>MDE :</strong> maison de l’étudiant et services de vie étudiante.</li>
            <li><strong>Bâtiment G :</strong> accueil, scolarité et services administratifs.</li>
            <li><strong>Bâtiment A :</strong> zones pédagogiques et amphithéâtres.</li>
         </ul>
         <p>
            Objectif BlueAcces : transformer ce repérage en parcours accessibles, lisibles et
            faciles à suivre pour tous les étudiants.
         </p>
      </div>
   </section>

   <button type="button" class="scroll-top"><i class="fa fa-angle-double-up" aria-hidden="true"></i></button>

   <section class="footer">
      <div class="box-container">
         <div class="box">
            <h3>quick links</h3>
            <a href="home.php"> <i class="fas fa-angle-right"></i> Accueil</a>
            <a href="about.php"> <i class="fas fa-angle-right"></i> À Propos</a>
            <a href="package.php"> <i class="fas fa-angle-right"></i> Activités</a>
            <a href="rentabilite.php"> <i class="fas fa-angle-right"></i> Rentabilité</a>
            <a href="map.php"> <i class="fas fa-angle-right"></i> Carte 3D</a>
            <a href="book.php"> <i class="fas fa-angle-right"></i> Réservation</a>
         </div>
         <div class="box">
            <h3>extra links</h3>
            <a href="#"> <i class="fas fa-angle-right"></i> about us</a>
            <a href="#"> <i class="fas fa-angle-right"></i> Questions</a>
            <a href="#"> <i class="fas fa-angle-right"></i> terms of use</a>
            <a href="#"> <i class="fas fa-angle-right"></i> privacy policy</a>
         </div>
         <div class="box">
            <h3>contact info</h3>
            <a href="#"> <i class="fas fa-phone"></i> +880-1517-089144 </a>
            <a href="#"> <i class="fas fa-phone"></i> +111-2222-333333 </a>
            <a href="#"> <i class="fas fa-envelope"></i> ch@gmail.com </a>
            <a href="#"> <i class="fas fa-map"></i> 75015, Paris </a>
         </div>
         <div class="box">
            <h3>follow us</h3>
            <a href="#"> <i class="fab fa-linkedin"></i> linkedin </a>
            <a href="#"> <i class="fab fa-facebook-f"></i> facebook </a>
            <a href="#"> <i class="fab fa-instagram"></i> instagram </a>
            <a href="#"> <i class="fab fa-twitter"></i> twitter </a>
         </div>
      </div>
      <div class="credit"> designed by <span>mr. bingo mingo</span> | all rights reserved! </div>
   </section>

   <script src="https://unpkg.com/swiper@7/swiper-bundle.min.js"></script>
   <script src="js/script.js"></script>
</body>
</html>
