<?php
	require "init.php";
	session_start();
	$id_uporabniki = $_SESSION['id_uporabniki'];
	$akcija = $_GET['akcija'];
	
	//$sql_query="select id_druzabnaIgra from SeznamIger where id_uporabniki like '$id_uporabniki';";
	$sql_query="select id_druzabnaIgra from SeznamIger where id_uporabniki like $id_uporabniki AND $akcija like '1';";
	$result = mysqli_query($con,$sql_query);
	$numOfGames = mysqli_num_rows($result);
	//$result = mysqli_fetch_all($result);
	$url = "https://api.geekdo.com/xmlapi2/thing?id=";
	$idArr = array();
	$i = 0;
	
	while($row = mysqli_fetch_array($result)){
		//print_r($row);
		array_push($idArr, $row[0]);
		$url = $url.$row[0].",";
	}
	
	$xml=simplexml_load_file($url) or die("Error: Cannot create object");
	unset($url);
	$output = '[{';
	
	foreach($xml->children() as $item){
		$output = $output."\"image\":\"".$item->thumbnail."\",";
		
		$temp = "";
		foreach($item->link as $sub){
			if ($sub["type"] == "boardgamecategory"){
				$temp = $temp.$sub["value"]."<br />";
			}
		}
		$output = $output."\"category\":\"".$temp."\",";
		
		$minplayers = (int)$item->minplayers["value"];
		$maxplayers = (int)$item->maxplayers["value"];
		if ($minplayers == 0 && $maxplayers == 0){
			$temp = "Ni podatkov";
		}elseif($minplayers == 0){
			$temp = $maxplayers;
		}elseif ($maxplayers == 0 || $minplayers == $maxplayers){
			$temp = $minplayers;
		}else{
			$temp = $minplayers." - ".$maxplayers;
		}
		
		$output = $output."\"players\":\"".$temp."\",";
		
		$minplaytime = (int)$item->minplaytime["value"];
		$maxplaytime = (int)$item->maxplaytime["value"];
		if ($minplaytime == 0 && $maxplaytime == 0){
			$temp = "Ni podatkov";
		}elseif($minplaytime == 0){
			$temp = timeCheck($maxplaytime);
		}elseif ($maxplaytime == 0 || $minplaytime == $maxplaytime){
			$temp = timeCheck($minplaytime);
		}else{
			$temp = timeCheck($minplaytime)." do <br />".timeCheck($maxplaytime);
		}
		
		
		
		$output = $output."\"playtime\":\"".$temp."\",";
		
		
		
		$output = $output."\"yearpublished\":\"".$item->yearpublished["value"]."\",";
		$output = $output."\"id\":\"".$idArr[$i]."\",";
		$i = $i + 1;
		$output = $output."\"name\":\"".$item->name["value"]."\"},{";
	}
	unset($idArr);
	$output = $output."}]";
	$output = str_replace(",{}", "", $output);
	$output = str_replace("[{}]", "", $output);
	
	echo($output);
	
	function timeCheck($time){
		if ($time % 60 == 0){
			$check = $time / 60;
			if ($check == 1){
				return $check." ura";
			}elseif($check == 2){
				return $check." uri";
			}else{
				return $check." ure";
			}
		}
		return $time." minut";
	}

?>