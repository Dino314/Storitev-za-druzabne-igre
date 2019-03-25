<?php
	require "init.php";
	
	$uporabnisko_ime=$_POST["uporabnisko_ime"];
	$geslo=password_hash($_POST["geslo"], PASSWORD_DEFAULT);
	$email=$_POST["email"];
	$time=date("Y-m-d H:i:s");

	//check if the username already exists in database
	$sql_query="select uporabnisko_ime from Uporabniki where uporabnisko_ime like '$uporabnisko_ime';";
	$resultGeslo = mysqli_query($con,$sql_query);
	
	$sql_query="select email from Uporabniki where email like '$email';";
	$resultEmail = mysqli_query($con,$sql_query);
	
	if(mysqli_num_rows($resultGeslo)>0){
		echo "registerError";
	}
	elseif(mysqli_num_rows($resultEmail)>0){
		echo "registerError";
	}
	else{
	//insert new user into database
	$sql_query="insert into Uporabniki (uporabnisko_ime, geslo, email, datum_prijave) values('$uporabnisko_ime', '$geslo', '$email', '$time');";
	mysqli_query($con,$sql_query);
	
	echo "registerSuccess";
	}
?>
