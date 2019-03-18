<?php
	//required script for initial connection to the database
	$db_name="DR_ANDROID_1718";
	$mysql_user="dr";
	$mysql_pass="pwd";
	$server_name="localhost";
	$con = mysqli_connect($server_name, $mysql_user, $mysql_pass, $db_name);
	if (!$con){
		//echo "Connection Error...".mysqli_connect_error();
	}else{
		//echo "Database connection Success...";
	}
?>