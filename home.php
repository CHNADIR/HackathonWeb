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
         <a href="logout.php">Déconnexion</a>
      </nav>
      <div id="menu-btn" class="fas fa-bars"></div>
      <a href="home.php" class="logo"><img src="images/logo-SNR.png" height="80px" width="110px"></a>
   </section>
   <!-- header section ends -->
   <!-- home section starts  -->
   <section class="home">
      <div class="swiper home-slider">
         <div class="swiper-wrapper">
            <div class="swiper-slide slide" style="background:url(images/Paris1.jpg) no-repeat">
               <div class="content">
                  <span>search, express, tour</span>
                  <h3>Tour autour de PARIS</h3>
                  <a href="package.php" class="btn">See more</a>
               </div>
            </div>
            <div class="swiper-slide slide" style="background:url(images/Paris2.webp) no-repeat">
               <div class="content">
                  <span>search, express, tour</span>
                  <h3>Paris Réinventé : Découvrez la Ville Hôte des Jeux Olympiques</h3>
                  <a href="package.php" class="btn">See more</a>
               </div>
            </div>
            <div class="swiper-slide slide" style="background:url(images/Paris3.jpg) no-repeat">
               <div class="content">
                  <span>search, express, tour</span>
                  <h3>Rendez Votre Tour Efficace</h3>
                  <a href="package.php" class="btn">See more</a>
               </div>
            </div>
         </div>
         <div class="swiper-button-next"></div>
         <div class="swiper-button-prev"></div>
      </div>
   </section>
   <!-- home section ends -->
   <!-- services section starts  -->
   <section class="services">
      <h1 class="heading-title"> Nos services </h1>
      <div class="box-container">
         <div class="box">
            <img src="images/icon-2.png" alt="">
            <h3>tour guide</h3>
         </div>
         <div class="box">
            <img src="images/icon-6.png" alt="">
            <h3>camping</h3>
         </div>
         <div class="box">
            <img src="images/icon-1.png" alt="">
            <h3>adventure</h3>
         </div>
         <div class="box">
            <img src="images/icon-3.png" alt="">
            <h3>trekking</h3>
         </div>
         <div class="box">
            <img src="images/icon-5.png" alt="">
            <h3>off road</h3>
         </div>
         <div class="box">
            <img src="images/icon-4.png" alt="">
            <h3>camp fire</h3>
         </div>
      </div>
   </section>
   <!-- services section ends -->
   <!-- home about section starts  -->
   <section class="home-about">
      <div class="image">
         <img src="images/Paris5.jpg" alt="">
      </div>
      <div class="content">
         <h3>about us</h3>
         <p>Amazing Tours a Best tour Operator and Travel agent in Bangladesh. We are Tour Package, Hotel booking. Bangladesh Tours & Travel agent. Find international and domestic tour packages from bangladesh at low prices including best ... Travel Package | Honeymoon Package | Tour Package</p>
         <a href="about.php" class="btn">read more</a>
      </div>
   </section>
   <!-- home about section ends -->
   <!-- home packages section starts  -->
   <section class="home-packages">
      <h1 class="heading-title"> our packages </h1>
      <div class="box-container">
         <div class="box">
            <div class="image">
               <img src="images/croi3.jpeg" alt="">
            </div>
            <div class="content">
               
               <div id="details">
                  <h3>River cruise on the Seine </h3>
                  <p>Paris 5th district (75)</p>
                  <h2>€ 14.90</h2>
               </div>
               <div id="btn"><a href="act1.php" class="btn">Afficher plus</a></div>
            </div>
         </div>
         <div class="box">
            <div class="image">
               <img src="images/bm1.webp" alt="">
            </div>
            <div class="content">
               <div id="details">
                  <h3>Bmw car driving</h3>
                  <p>Passenger Drift baptism in a BMW M3 on the Le Mans circuit!</p>
                  <h2>€ 39</h2>
               </div>
               <div id="btn"><a href="act2.php" class="btn">Afficher plus</a></div>
            </div>
         </div>
         <div class="box">
            <div class="image">
               <img src="images/img-3.jpg" alt="">
            </div>
            <div class="content">
               <h3>Japan Tour Packages</h3>
               <p>Enjoy the Emirates with unforgettable fun with our Japan top selling packages!</p>
               <h2>BDT 11,900</h2>
               <a href="book.php" class="btn">book now</a>
            </div>
         </div>
      </div>
      <div class="load-more"> <a href="package.php" class="btn">load more</a> </div>
   </section>
   <section class="home-offer home-packages">
      <div class="content">
         <div class="offerimage">
         <img src="images/offer.jpg">
         </div>
      </div>
      <div class="content">
         <h3>upto 40% off</h3>
         <p>Bali Dynasty Resort is centrally located within walking distance to the nightlife and excitement of the Kuta area. This popular Bali accommodation offers a wide range of room types to suit families and couples. The kids can enjoy the kids club while the adults spoil themselves at Ashoka Spa or the Beach Club. For a memorable and relaxing stay in Kuta why not stay at Bali Dynasty Resort.</p>
         <a href="book.php" class="btn">book now</a>
      </div>
   </section>
   <!-- home offer section ends -->

   <button type="button" class="scroll-top"><i class="fa fa-angle-double-up" aria-hidden="true"></i></button>
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