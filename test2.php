<?php
	require "init.php";
	session_start();
	
	$id_uporabniki = $_SESSION['id_uporabniki'];
	$id_druzabnaIgra = $_GET['id'];

	$sql_query="SELECT moja, priljubljena, zazeljena, biIgral FROM SeznamIger WHERE id_uporabniki like '$id_uporabniki' AND id_druzabnaIgra = '$id_druzabnaIgra'";
	$result = mysqli_query($con,$sql_query);
	$result = mysqli_fetch_array($result);
	$result = array(boolval($result[0]), boolval($result[1]), boolval($result[2]), boolval($result[3]));

	echo json_encode($result);
	//echo true;




mysqli_close($con);
?>