<?php
	//required script for initial connection to the database
	$db_name="mmglobal_druzabneIgre";
	$mysql_user="mmglobal_dino";
	$mysql_pass="Test1234";
	$server_name="localhost";
	
	$con = mysqli_connect($server_name, $mysql_user, $mysql_pass, $db_name);
	if (!$con){
		//echo "Connection Error...".mysqli_connect_error();
	}else{
		//echo "Database connection Success...";
	}
?>