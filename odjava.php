<?php
	require "init.php";
	session_start();
	//delete the cookies and sessions of the currently logged in user and redirect to the login page
	//unset($_COOKIE["uporabnisko_ime"]);	setcookie("uporabnisko_ime", "", time() - 3600, "/");
	session_unset();		session_destroy();	
	header('Location: index.html');
?>
