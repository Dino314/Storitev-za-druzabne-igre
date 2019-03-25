<?php
	require "init.php";
	session_start();
	
	//delete the cookies and sessions of the currently logged in user and redirect to the login page
	unset($_COOKIE["uporabnisko_ime"]);
	unset($_SESSION['id_uporabniki']);
	header('Location: index.html');
?>
