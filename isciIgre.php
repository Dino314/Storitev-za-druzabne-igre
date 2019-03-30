<?php
	require "init.php";
	session_start();
	
	$query = $_GET['query'];
	$type = $_GET['type'];
	$query = str_replace(" ", "+", $query);
	$url = "https://api.geekdo.com/xmlapi2/search?query=".$query."&type=".$type;
	$xml=simplexml_load_file($url) or die("Error: Cannot create object");
	$output = '';
	//$idArr = array();
	$i = 0;
	$boardgame = strpos($type, "boardgame,boardgameexpansion,");
	foreach($xml->children() as $item){	
		if (($boardgame !== false && $item["type"] != "boardgameexpansion") || $boardgame === false){
			$output = $output.$item["id"].",";
			//array_push($idArr, $item["id"]);
		}
	}	//echo $boardgame."<br /><br />";

	$url = "https://api.geekdo.com/xmlapi2/thing?id=".$output."&type=".$type;
	$xml=simplexml_load_file($url) or die("Error: Cannot create object");
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
		
		$players = $temp;
		unset($minplayers, $maxplayers);
		
		$output = $output."\"players\":\"".$players."\",";
		
		$minplaytime = (int)$item->minplaytime["value"];
		$maxplaytime = (int)$item->maxplaytime["value"];
		if ($minplaytime == 0 && $maxplaytime == 0){
			$temp = "Ni podatkov";
		}elseif($minplaytime == 0){
			$temp = timeCheck($maxplaytime);
		}elseif ($maxplaytime == 0 || $minplaytime == $maxplaytime){
			$temp = timeCheck($minplaytime);
		}else{
			$temp = $minplaytime." do ".timeCheck($maxplaytime);
		}
		
		$playtime = $temp;
		unset($minplaytime, $maxplaytime);
		
		$output = $output."\"playtime\":\"".$playtime."\",";
		
		$yearpublished = $item->yearpublished["value"];
		$output = $output."\"yearpublished\":\"".$yearpublished."\",";
		
		$output = $output."\"podatki\":\"<b>Leto Izdaje: </b>".$yearpublished."<br /><b>Število igralcev: </b>".$players."<br /><b>Čas igranja: </b>".$playtime."\",";
		
		$output = $output."\"id\":\"".$item["id"]."\",";
		$i = $i + 1;
		$output = $output."\"name\":\"".$item->name["value"]."\"},{";
	}
	//unset($idArr);
	$output = $output."}]";
	$output = str_replace(",{}", "", $output);
	$output = str_replace("[{}]", "", $output);
	
	echo $output;
	
	function timeCheck($time){
		return $time." minut";
	}
?>