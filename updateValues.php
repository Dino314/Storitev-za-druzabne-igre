<?php
	require "init.php";
	session_start();
	
	$id_uporabniki = $_SESSION['id_uporabniki'];
	$id_druzabnaIgra = $_GET['id'];
	$akcija = $_GET["akcija"];
	$value = $_GET["value"];
	
	if($value == "true"){
		$value = "false";
	}else{
		$value = "true";
	}
	//echo "pgp".$value;
	//$value = !$value;
	
	
	/*
	if ($akcija == "moja" || $akcija == "priljubljena" || $akcija == "zazeljena" || $akcija == "biIgral"){
		
	}*/

	$sql_query="select id_uporabniki, id_druzabnaIgra from SeznamIger where id_uporabniki like '$id_uporabniki' and id_druzabnaIgra like '$id_druzabnaIgra';";
	$result = mysqli_query($con,$sql_query);
	
	if(mysqli_num_rows($result)>0){
		
		$sql_query="update SeznamIger set $akcija = $value where id_uporabniki like '$id_uporabniki' and id_druzabnaIgra like 
		'$id_druzabnaIgra';";
		
		
	}else{
		
		$sql_query="insert into SeznamIger (id_uporabniki, id_druzabnaIgra, $akcija) 
			values('$id_uporabniki', '$id_druzabnaIgra', $value);";
		
		
	}
	
	$result = mysqli_query($con,$sql_query);
		

		echo $value;
?>