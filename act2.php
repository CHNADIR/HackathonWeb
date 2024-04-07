<?php 
session_start();

$bdd = new PDO('mysql:host=localhost;dbname=login_register_db;charset=utf8', 'root', '');

if(isset($_POST['valider'])){
   if(!empty($_POST['commentaire']) AND isset($_POST['Note']) AND isset($_SESSION['userID'])) {  
      $commentaire = nl2br(htmlspecialchars($_POST['commentaire']));
      $Note = htmlspecialchars($_POST['Note']);
      $userID = $_SESSION['userID']; // Assumed that user's ID is stored in the session when they logged in

      // The insertion query now includes the user's ID
      $insererCommentaire = $bdd->prepare("INSERT INTO evaluation (ID, commentaire, Note) VALUES(?, ?, ?)");
      $insererCommentaire->execute(array($userID, $commentaire, $Note));

      echo "Commentaire et note ajoutés avec succès!";
   } else {
      echo "Vous devez remplir tous les champs...";
   }
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
   <script src="http://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
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


   <section class="booking">

      <form action="" method="post" class="book-form">

         <section class="home">
            <div class="swiper home-slider">
               <div class="swiper-wrapper">
                  <div class="swiper-slide slide" style="background:url(images/bm1.webp) no-repeat">
                     <div class="content">
                        <h3>Passenger Drift baptism </h3>
                     </div>
                  </div>
                  <div class="swiper-slide slide" style="background:url(images/bm2.webp) no-repeat">
                     <div class="content">
                       
                     </div>
                  </div>
                  <div class="swiper-slide slide" style="background:url(images/bm3.webp) no-repeat">
                     <div class="content">
                        
                     </div>
                  </div>
               </div>
               <div class="swiper-button-next"></div>
               <div class="swiper-button-prev"></div>
            </div>
         </section>


         <div class="flex">
            <div>
               <br><h2>Activity description :</h2>
               <p>Climb aboard a Police Academy car and enjoy a drifting lesson from the best in this spectacular discipline! 
                <br>Drifting is an activity that allows you to approach corners quickly, while controlling the car's glide through 
                <br>the curve. The show is guaranteed, and so is the smell of burning rubber!
                <br><b> How it works:</b>
                <br>Meet us at the circuit, where you'll be greeted by our team.
                <br>Once you've settled into the BMW M3 Police Academy, the Instructor Drifteur turns on the flashing light and 
                <br>sets off at full speed on the track for 2 laps!
                <br><br><b> Le Mans circuit </b>

                <br><br>Le Mans is a legendary circuit! The town in the Sarthe region of France is a Mecca for motor racing, famous in 
                <br> particular for the 24 Hours of Le Mans. The Circuit de la Maison Blanche, the 24-hour circuit, has a unique 
                <br> atmosphere, with a fast 1,900-meter track, a width of 9 meters and a series of bends.

                <br>For this exhilarating activity, don't hesitate to book a driving course with Sylvain and his team.
               </p>
            </div>
         </div>  
          
         <div class= "map">
            <i class="fas fa-map-marker-alt fa-2x" ></i> <b>1 Rue Panhard et Levassor, 78570 Chanteloup-les-Vignes</b><br><br>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10502.67429596528!2d2.3410725774154697!3d48.845460162466715!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e671ef6ff7f46f%3A0x50b82c368941a90!2s5th%20arrondissement%2C%2075005%20Paris!5e0!3m2!1sen!2sfr!4v1712366221533!5m2!1sen!2sfr" width="500" height="400" style="border: 0; border-radius: 8%;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
         </div>
         <div class="inputBox">    
            <br><span>Note :</span>
            <input type="number" min="0" max="5" placeholder="Note 0-5" name="Note" required>
         
         
            <br><span>Commentaire :</span>
            <input type="text" placeholder="commentaire" name="commentaire" required>
            
         </div>
         <input type="submit" value="Valider" class="btn" name="valider">

      </form>
   </section>
   <button type="button" class="scroll-top"><i class="fa fa-angle-double-up" aria-hidden="true"></i></button>
   <section id="messages"></section>

   <script>
      setInterval('load_message()',500);
      function load_message(){
         $("#messages").load("msg.php");
      }
   </script>

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