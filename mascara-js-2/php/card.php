<?php

require_once "db.php";

if(isset($_POST['postCard']['number']) && isset($_POST['postCard']['date']) && isset($_POST['postCard']['cvv']) ){
    $number =  mysqli_real_escape_string($connection, $_POST['postCard']['number']);
    $date = mysqli_real_escape_string($connection,$_POST['postCard']['date']);
    $cvv = mysqli_real_escape_string($connection,$_POST['postCard']['cvv']);


    $sql = "INSERT INTO cards (cardNumber, dateNumber, cvvNumber)
            VALUES ('$number','$date','$cvv')";


    $result = mysqli_query($connection, $sql);
    if(!$result){
    die('La consulta ha fallado' . mysqli_error($connection));
    }
    echo 'Tarjeta agregada con éxito';
    }

?>