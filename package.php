<?php
session_start();

// Assurez-vous que l'utilisateur est connecté et que son ID est stocké dans $_SESSION['userID']
// Ce script suppose que l'ID de l'utilisateur est déjà dans la session. Sinon, vous devez ajouter cette logique.

// Connexion à la base de données
try {
    $bdd = new PDO('mysql:host=localhost;dbname=login_register_db;charset=utf8', 'root', '');
    $bdd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(Exception $e) {
    die('Erreur : '.$e->getMessage());
}

if(isset($_GET['activite_id'])) {
   $activite_id = $_GET['activite_id']; // Récupérer activite_id de l'URL
   $_SESSION['activite_id'] = $activite_id; // Stocker activite_id dans la session
}
?>



<!DOCTYPE html>
<html lang="en">
<head>
   <meta charset="UTF-8">
   <meta http-equiv="X-UA-Compatible" content="IE=edge">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <title>SNR:: Bienvenue à Paris</title>

   <!-- swiper css link  -->
   <link rel="stylesheet" href="https://unpkg.com/swiper@7/swiper-bundle.min.css" />

   <!-- font awesome cdn link  -->
   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">

   <!-- custom css file link  -->
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
   
<!-- header section starts  -->

<section class="header">

   <nav class="navbar">
      <a href="home.php" class="active">Accueil</a>
      <a href="about.php">À Propos</a>
      <a href="package.php">Les activités</a>
      <a href="book.php">Reservation</a>
   </nav>

   <div id="menu-btn" class="fas fa-bars"></div>

   <a href="home.php" class="logo"><img src="images/logo-SNR.png" height="80px" width="110px"></a>

</section>

<!-- header section ends -->

<div class="heading" style="background:url(images/header-bg-2.png) no-repeat">
   <h1>Activités</h1>
</div>

<!-- packages section starts  -->

<section class="packages">
   <div class="box-container">

      <div class="box">
         <div class="image">
            <img src="images/croi3.jpeg" alt="">
         </div>
         <div class="content">
            <div id="btn"><a href="act1.php?activite_id=1" class="btn">Afficher plus</a></div>
            <div id="details">
               <h3>River cruise on the Seine </h3>
               <p>Paris 5th district (75)</p>
               <h2>€ 14.90</h2>
            </div>
         </div>
      </div>

      <div class="box">
         <div class="image">
            <img src="images/bm1.webp" alt="">
         </div>
         <div class="content">
            <div id="btn"><a href="act2.php?activite_id=2" class="btn">Afficher plus</a></div>
            <div id="details">
               <h3>Bmw car driving</h3>
               <p>Passenger Drift baptism in a BMW M3 on the Le Mans circuit!</p>
               <h2>€ 39</h2>
            </div>
         </div>
      </div>

      <div class="box">
         <div class="image">
            <img src="images/footer-bg1.jpg" alt="">
         </div>
         <div class="content">
            <div id="btn"><a href="book.php" class="btn">afficher plus</a></div>
            <div id="details">
               <h3>---</h3>
               <p>Enjoy !</p>
               <h2>€ -</h2>
            </div>
         </div>
      </div>
      <div class="box">
         <div class="image">
            <img src="images/footer-bg1.jpg" alt="">
         </div>
         <div class="content">
            <div id="btn"><a href="book.php" class="btn">afficher plus</a></div>
            <div id="details">
               <h3>---</h3>
               <p>Enjoy !</p>
               <h2>€ -</h2>
            </div>
         </div>
      </div>
      <div class="box">
         <div class="image">
            <img src="images/footer-bg1.jpg" alt="">
         </div>
         <div class="content">
            <div id="btn"><a href="book.php" class="btn">afficher plus</a></div>
            <div id="details">
               <h3>---</h3>
               <p>Enjoy !</p>
               <h2>€ -</h2>
            </div>
         </div>
      </div>
      <div class="box">
         <div class="image">
            <img src="images/footer-bg1.jpg" alt="">
         </div>
         <div class="content">
            <div id="btn"><a href="book.php" class="btn">afficher plus</a></div>
            <div id="details">
               <h3>---</h3>
               <p>Enjoy !</p>
               <h2>€ -</h2>
            </div>
         </div>
      </div>
      <div class="box">
         <div class="image">
            <img src="images/footer-bg1.jpg" alt="">
         </div>
         <div class="content">
            <div id="btn"><a href="book.php" class="btn">afficher plus</a></div>
            <div id="details">
               <h3>---</h3>
               <p>Enjoy !</p>
               <h2>€ -</h2>
            </div>
         </div>
      </div>
      <div class="box">
         <div class="image">
            <img src="images/footer-bg1.jpg" alt="">
         </div>
         <div class="content">
            <div id="btn"><a href="book.php" class="btn">afficher plus</a></div>
            <div id="details">
               <h3>---</h3>
               <p>Enjoy !</p>
               <h2>€ -</h2>
            </div>
         </div>
      </div>
      <div class="box">
         <div class="image">
            <img src="images/footer-bg1.jpg" alt="">
         </div>
         <div class="content">
            <div id="btn"><a href="book.php" class="btn">afficher plus</a></div>
            <div id="details">
               <h3>---</h3>
               <p>Enjoy !</p>
               <h2>€ -</h2>
            </div>
         </div>
      </div>
      <div class="box">
         <div class="image">
            <img src="images/footer-bg1.jpg" alt="">
         </div>
         <div class="content">
            <div id="btn"><a href="book.php" class="btn">afficher plus</a></div>
            <div id="details">
               <h3>---</h3>
               <p>Enjoy !</p>
               <h2>€ -</h2>
            </div>
         </div>
      </div>
      <div class="box">
         <div class="image">
            <img src="images/footer-bg1.jpg" alt="">
         </div>
         <div class="content">
            <div id="btn"><a href="book.php" class="btn">afficher plus</a></div>
            <div id="details">
               <h3>---</h3>
               <p>Enjoy !</p>
               <h2>€ -</h2>
            </div>
         </div>
      </div>
      <div class="box">
         <div class="image">
            <img src="images/footer-bg1.jpg" alt="">
         </div>
         <div class="content">
            <div id="btn"><a href="book.php" class="btn">afficher plus</a></div>
            <div id="details">
               <h3>---</h3>
               <p>Enjoy !</p>
               <h2>€ -</h2>
            </div>
         </div>
      </div>
      <div class="box">
         <div class="image">
            <img src="images/footer-bg1.jpg" alt="">
         </div>
         <div class="content">
            <div id="btn"><a href="book.php" class="btn">afficher plus</a></div>
            <div id="details">
               <h3>---</h3>
               <p>Enjoy !</p>
               <h2>€ -</h2>
            </div>
         </div>
      </div>
      <div class="box">
         <div class="image">
            <img src="images/footer-bg1.jpg" alt="">
         </div>
         <div class="content">
            <div id="btn"><a href="book.php" class="btn">afficher plus</a></div>
            <div id="details">
               <h3>---</h3>
               <p>Enjoy !</p>
               <h2>€ -</h2>
            </div>
         </div>
      </div>
      <div class="box">
         <div class="image">
            <img src="images/footer-bg1.jpg" alt="">
         </div>
         <div class="content">
            <div id="btn"><a href="book.php" class="btn">afficher plus</a></div>
            <div id="details">
               <h3>---</h3>
               <p>Enjoy !</p>
               <h2>€ -</h2>
            </div>
         </div>
      </div>
      <div class="box">
         <div class="image">
            <img src="images/footer-bg1.jpg" alt="">
         </div>
         <div class="content">
            <div id="btn"><a href="book.php" class="btn">afficher plus</a></div>
            <div id="details">
               <h3>---</h3>
               <p>Enjoy !</p>
               <h2>€ -</h2>
            </div>
         </div>
      </div>
      <div class="box">
         <div class="image">
            <img src="images/footer-bg1.jpg" alt="">
         </div>
         <div class="content">
            <div id="btn"><a href="book.php" class="btn">afficher plus</a></div>
            <div id="details">
               <h3>---</h3>
               <p>Enjoy !</p>
               <h2>€ -</h2>
            </div>
         </div>
      </div>
      <div class="box">
         <div class="image">
            <img src="images/footer-bg1.jpg" alt="">
         </div>
         <div class="content">
            <div id="btn"><a href="book.php" class="btn">afficher plus</a></div>
            <div id="details">
               <h3>---</h3>
               <p>Enjoy !</p>
               <h2>€ -</h2>
            </div>
         </div>
      </div>
      <div class="box">
         <div class="image">
            <img src="images/footer-bg1.jpg" alt="">
         </div>
         <div class="content">
            <div id="btn"><a href="book.php" class="btn">afficher plus</a></div>
            <div id="details">
               <h3>---</h3>
               <p>Enjoy !</p>
               <h2>€ -</h2>
            </div>
         </div>
      </div>
      <div class="box">
         <div class="image">
            <img src="images/footer-bg1.jpg" alt="">
         </div>
         <div class="content">
            <div id="btn"><a href="book.php" class="btn">afficher plus</a></div>
            <div id="details">
               <h3>---</h3>
               <p>Enjoy !</p>
               <h2>€ -</h2>
            </div>
         </div>
      </div>
      <div class="box">
         <div class="image">
            <img src="images/footer-bg1.jpg" alt="">
         </div>
         <div class="content">
            <div id="btn"><a href="book.php" class="btn">afficher plus</a></div>
            <div id="details">
               <h3>---</h3>
               <p>Enjoy !</p>
               <h2>€ -</h2>
            </div>
         </div>
      </div>
      <div class="box">
         <div class="image">
            <img src="images/footer-bg1.jpg" alt="">
         </div>
         <div class="content">
            <div id="btn"><a href="book.php" class="btn">afficher plus</a></div>
            <div id="details">
               <h3>---</h3>
               <p>Enjoy !</p>
               <h2>€ -</h2>
            </div>
         </div>
      </div>
      <div class="box">
         <div class="image">
            <img src="images/footer-bg1.jpg" alt="">
         </div>
         <div class="content">
            <div id="btn"><a href="book.php" class="btn">afficher plus</a></div>
            <div id="details">
               <h3>---</h3>
               <p>Enjoy !</p>
               <h2>€ -</h2>
            </div>
         </div>
      </div>
   </div>

      
   <div class="load-more"><span class="btn">see more</span></div>
   <button type="button" class="scroll-top"><i class="fa fa-angle-double-up" aria-hidden="true"></i></button>

</section>

<!-- packages section ends -->
<!-- footer section starts  -->

<section class="footer">
   <div class="box-container">
      <div class="box">
         <h3>quick links</h3>
         <a href="home.php"> <i class="fas fa-angle-right"></i> Accueil</a>
         <a href="about.php"> <i class="fas fa-angle-right"></i>À Propos </a>
         <a href="package.php"> <i class="fas fa-angle-right"></i> Activités</a>
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

<!-- footer section ends -->
<!-- swiper js link  -->
<script src="https://unpkg.com/swiper@7/swiper-bundle.min.js"></script>

<!-- custom js file link  -->
<script src="js/script.js"></script>

</body>
</html>