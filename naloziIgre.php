<?php
	require "init.php";
	session_start();
	$id_uporabniki = $_SESSION['id_uporabniki'];
	
	//$sql_query="select id_druzabnaIgra from SeznamIger where id_uporabniki like '$id_uporabniki';";
	$sql_query="select id_druzabnaIgra from SeznamIger where id_uporabniki like '1';";
	$result = mysqli_query($con,$sql_query);
	$numOfGames = mysqli_num_rows($result);
	//$result = mysqli_fetch_all($result);
	$url = "https://api.geekdo.com/xmlapi2/thing?id=";
	
	
	while($row = mysqli_fetch_array($result)){
		//print_r($row);
		$url = $url.$row[0].",";		
	}
	
	$xml=simplexml_load_file($url) or die("Error: Cannot create object");
	
	//echo ("<pre>");
	//print_r($xml);
	//echo ("</pre>");
	
	//echo $xml->item[0]->description	 . "<br>";

	echo "banana";
	

?>