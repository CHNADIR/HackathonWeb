<?php
session_start(); // Assurez-vous de démarrer la session au début du fichier.
include_once('connection.php');

if(isset($_POST['register'])){
    $name = $_POST['name'];
    $username = $_POST['username'];
    $pass = md5($_POST['password']); // Encodage MD5 pour le mot de passe (notez que MD5 n'est plus considéré comme sûr pour les mots de passe).

    $sql = "INSERT INTO `tbl_user`(`name`, `username`, `password`) VALUES ('$name','$username','$pass')";
    $result = mysqli_query($conn, $sql);

    if($result){ 
        // Redirige l'utilisateur et affiche un message
        echo "<script>alert('New User Register Success'); window.location='index.php';</script>";
    } else {
        die(mysqli_error($conn));
    }
}
?>
