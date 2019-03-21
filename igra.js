$(document).ready(function(){
	
	var url = new URL(window.location.href);
	var id = url.searchParams.get("igra");
	//console.log(id);
	
	$.ajax({
				url:'https://api.geekdo.com/xmlapi2/thing?id='+id,
				dataType:'xml',
				async:false,
				success:function(data){
					console.log(data);
					var name = $(data).find("name").attr("value");
					var thumbnail = $(data).find("image").text();
					var yearpublished = $(data).find("yearpublished").attr("value");
					var boardgamepublisher = $(data).find("link[type='boardgamepublisher']").attr("value");
					
					var boardgameexpansion = "";
					$(data).find("link[type='boardgameexpansion']").each(function(){
									categories = categories+$(this).attr("value")+"<br />";
								});
					
					var boardgamedesigner = "";
					$(data).find("link[type='boardgamedesigner']").each(function(){
									categories = categories+$(this).attr("value")+"<br />";
								});
					
					var boardgameartist = "";
					$(data).find("link[type='boardgameartist']").each(function(){
									categories = categories+$(this).attr("value")+"<br />";
								});
					
					var minplayers = $(data).find("minplayers").attr("value");
					var maxplayers = $(data).find("maxplayers").attr("value");
					var players = minplayers+" - "+maxplayers;
					if (minplayers == "0" && maxplayers == "0"){
						players = "Ni informacij.";
					}else if(minplayers == "0"){
						players = maxplayers;
					}else if (maxplayers == "0"){
						players = minplayers;
					}else if (minplayers == maxplayers){
						players = minplayers;
					}
					
					var minplaytime = $(data).find("minplaytime").attr("value");
					var maxplaytime = $(data).find("maxplaytime").attr("value");
					var playtime = minplaytime+" minut - "+maxplaytime+" minut";
					if(minplaytime == "0" && maxplaytime == "0"){
						playtime = "Ni informacij.";
					}else if(minplaytime == "0"){
						playtime = maxplaytime;
					}else if(maxplaytime == "0"){
						playtime = minplaytime;
					}else if (minplaytime == maxplaytime){
						playtime = minplaytime+" minut";
					}
					
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
	
});
