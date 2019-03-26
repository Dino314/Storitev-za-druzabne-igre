$(document).ready(function(){
	
	$('[data-toggle="tooltip"]').tooltip();
	var url = new URL(window.location.href);
	var id = url.searchParams.get("igra");
	//console.log(id);
	
	$.ajax({
				url:'https://api.geekdo.com/xmlapi2/thing?id='+id,
				dataType:'xml',
				async:false,
				success:function(data){
					//console.log(data);
					var name = $(data).find("name").attr("value");
					var thumbnail = $(data).find("image").text();
					var yearpublished = $(data).find("yearpublished").attr("value");
					var boardgamepublisher = $(data).find("link[type='boardgamepublisher']").attr("value");

					var boardgameexpansion = "";
					$(data).find("link[type='boardgameexpansion']").each(function(){
						boardgameexpansion = boardgameexpansion+$(this).attr("value")+"<br />";
					});

					var boardgamedesigner = "";
					$(data).find("link[type='boardgamedesigner']").each(function(){
						boardgamedesigner = boardgamedesigner+$(this).attr("value")+"<br />";
					});

					var boardgameartist = "";
					$(data).find("link[type='boardgameartist']").each(function(){
						boardgameartist = boardgameartist+$(this).attr("value")+"<br />";
					});
					
					var minplayers = $(data).find("minplayers").attr("value");
					var maxplayers = $(data).find("maxplayers").attr("value");
					var players = checkMinMax(minplayers, maxplayers);
					
					var minplaytime = $(data).find("minplaytime").attr("value");
					var maxplaytime = $(data).find("maxplaytime").attr("value");
					var playtime = checkMinMax(minplaytime, maxplaytime);
					
					var description = $(data).find("description").text();
					description = description.replace(/&#10;/g, "<br />");
					
					var categories = "";
					$(data).find("link[type='boardgamecategory']").each(function(){
									categories = categories+$(this).attr("value")+"<br />";
								});
					
					$("title").append(" - "+name);
					
					$("#thumbnail").attr("src", thumbnail);
					
					
					
					$('#igra > tbody:last-child').append(
						"<tr><td class='text-center'><h3>"+name+
						"</h3></td></tr><tr><td><strong>Založnik:</strong> "+boardgamepublisher+
						"</td></tr><tr><td><strong>Leto izdaje:</strong> "+yearpublished+
						"</td></tr><tr><td><strong>Število igralcev:</strong> "+players+
						"</td></tr><tr><td><strong>Čas igranja:</strong> "+playtime+
						"</td></tr><tr><td><strong>Kategorije:</strong><br />"+categories+
						"</td></tr>");
					
					
					
					$('#description').html(description);
					
				}
				
	});
	
	/*$("p").click(function(){
		$.get("dodajIgro.php?id="+id+"&akcija="+$(this).text(), function(data, status){
		    //alert("Data: " + data + "\nStatus: " + status);
		  });
		
	});*/
	
	//check if the player or playtime numbers are zero or equal
	function checkMinMax(a, b){
		if (a == "0" && b == "0"){
			return "Ni informacij.";
		}else if(a == "0"){
			return b;
		}else if (b == "0"){
			return a;
		}else if (a == b){
			return a;
		}else{
			return a+" - "+b;
		}
	}
	
});
