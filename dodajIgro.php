<?php
	require "init.php";
	session_start();
	
	$id_uporabniki = $_SESSION['id_uporabniki'];
	$akcija = $_GET["akcija"];
	$id_druzabnaIgra = $_GET["id"];
		
	if($akcija == "Moja" || $akcija == "Priljubljena" || $akcija == "Zaželjena"){
		$temp = str_replace("ž", "z", strtolower($akcija));
		
		$sql_query="select id_uporabniki, id_druzabnaIgra from SeznamIger where id_uporabniki like '$id_uporabniki' and id_druzabnaIgra like 
			'$id_druzabnaIgra';";
		$result = mysqli_query($con,$sql_query);
		
		if(mysqli_num_rows($result)>0){
			$sql_query="update SeznamIger set $temp = '1' where id_uporabniki like '$id_uporabniki' and id_druzabnaIgra like 
			'$id_druzabnaIgra';";
		}else{
			$sql_query="insert into SeznamIger (id_uporabniki, id_druzabnaIgra, $temp) 
				values('$id_uporabniki', '$id_druzabnaIgra', 1);";
		}
		mysqli_query($con,$sql_query);
		echo "Success";
	}else{
		echo "Error";
	}
?>