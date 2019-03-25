<?php
	require "init.php";
	session_start();
	
	$uporabnisko_ime=$_POST["login_ime"];
	//$_SESSION['id_uporabniki']=$uporabnisko_ime;
	$geslo=$_POST["login_geslo"];
	
	//check if there is a row with the same username and check if the password matches with the hash
	$sql_query="select id_uporabniki, geslo from Uporabniki where uporabnisko_ime like '$uporabnisko_ime';";
	$result = mysqli_fetch_row(mysqli_query($con,$sql_query));
	
	if(password_verify($geslo, $result[1])){
		$_SESSION['id_uporabniki']=$result[0];
		//$_SESSION['uporabnisko_ime']=$uporabnisko_ime;
		setcookie("uporabnisko_ime", $uporabnisko_ime, time() + (86400 * 30), "/");
		
		echo "loginSuccess";
	}else{
		echo "loginError";
	}
?>