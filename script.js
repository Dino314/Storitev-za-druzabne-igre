$(document).ready(function(){
	
	//checks first if either or both fields are empty, if not then it attempts to log the user in and either displays an error or loads the welcome page
	$("#logIn").click(function(){
		
		var login = $("#usernameInput").val();
		var pass = $("#passwordInput").val();
		
		if (login=="" && pass==""){
			$("#infoFormLog").text("Polji sta prazni");
		}
		else if(login==""){
			$("#infoFormLog").text("Uporabniško ime je prazno");
		}
		else if(pass==""){
			$("#infoFormLog").text("Geslo je prazno");
		}
		else{
			$("#infoFormLog").text("Vpisovanje...");
			var data={
				login_ime:login,
				login_geslo:pass
				};
			
			//sending data via POST method to a php script, returns a response
			$.post("login.php", data, function(response, status){
				//"response" receives - whatever written in echo of above PHP script.
				//alert(response);
				
				if (response=="loginSuccess"){
					//load page instead of "error"
					//$("#infoForm").text("loadPage");
					document.location.href = "dobrodosli.html";
				}
				else if(response=="loginError"){
					$("#infoFormLog").text("Wrong username or password");
				}
				else{
					$("#infoFormLog").text("Error in connecting to database: ("+response+"), ("+status+")");
				}
			});
		}
	});
	
	$("#searchButton").click(function(){
		var query = $("#gameSearch").val().replace(/ /g, "+");
		var id = "";
		
		//CHANGE IDS TO ONLY ARRAY, THEN MAKE FUNCTION TO CONCATINATE WITH ,
		
		//var idArr = [];
		var type = "&type=";
		//console.log($('#inlineCheckbox1').is(":checked"))
		if($('#inlineCheckbox1').is(":checked")){
			type += "boardgame,";
		}
		if($('#inlineCheckbox2').is(":checked")){
			type += "boardgameexpansion,";
		}
		if($('#inlineCheckbox3').is(":checked")){
			type += "boardgameaccessory,";
		}
		//console.log(type);
		$("#test").text("");
		$("tbody").text("");
		if(type.length==6){
			$("#test").text("Niste označili kaj bi iskali");
			return;
		}
		else if(query.length < 4){
			$("#test").text("Prekratko");
		}
		else{
			$("#test").text("Iskanje...");
			$.ajax({
				url:'https://api.geekdo.com/xmlapi2/search?query='+query+type,
				dataType:'xml',
				async:false,
				success:function(data){
					//console.log(data);
					$("#test").text("");
					$("tbody").text("");
					
					if($(data).find("items").attr("total")==0){
						$("#test").text("Ni rezultatov");
						return;
					}
					
					$(data).find("items item").each(function(){
						id = id+","+$(this).attr("id");
						//idArr[i] = $(this).attr("id");
						//console.log(idArr);
					});
				},
				error: function(){
					$("#test").text("Failed");
				}
			});
			
			$.ajax({
				url:'https://api.geekdo.com/xmlapi2/thing?id='+id.slice(1)+type,//+'&type=boardgame,boardgameexpansion,boardgameaccessory',
				dataType:'xml',
				async:false,
				success:function(data){
					
					$(data).find("items item").each(function(){
						var name = $(this).find("name").attr("value");
						var id = $(this).attr("id");
						var name = "<a href='https://boardgamegeek.com/boardgame/"+id+"' target='_blank'>"+name+"</a>";
						var thumbnail = $(this).find("thumbnail").text();
						var yearpublished = $(this).find("yearpublished").attr("value");
						var minplayers = $(this).find("minplayers").attr("value");
						var maxplayers = $(this).find("maxplayers").attr("value");
						var minplaytime = $(this).find("minplaytime").attr("value");
						var maxplaytime = $(this).find("maxplaytime").attr("value");
						var categories = "";
						$(this).find("link[type='boardgamecategory']").each(function(){
										categories = categories+$(this).attr("value")+"<br />";
									});
						
						
						$("tbody").append("<tr>");
						
						$("tbody").append("<td><img src='"+thumbnail+"'></img></td>");
						
						$("tbody").append(
							$("<td />", {
								html: name
							})
						);
						
						$("tbody").append(
							$("<td />", {
								html: categories
							})
						);
												
						$("tbody").append(
							$("<td />", {
								text: yearpublished
							})
						);
						
						$("tbody").append(
							$("<td />", {
								text: minplayers+" - "+maxplayers
							})
						);
						
						$("tbody").append(
							$("<td />", {
								text: minplaytime+" min - "+maxplaytime+" min"
							})
						);
						
						$("tbody").append("</tr>");
					});

				},
				error: function(){
					$("#test").text("Failed");
				}
			});
		}
		
	});

	//DEPRECATED
	$("#searchButton2").click(function(){
		var id = $("#gameSearch").val();
		
		$.ajax({
			url:'https://api.geekdo.com/xmlapi2/thing?id='+id+'&type=boardgame,boardgameexpansion,boardgameaccessory',
			dataType:'xml',
			success:function(data){
				//console.log(data);
				
				var imag = $(data).find("image").text();
				$("#imag").attr("src", imag);

				var test = $(data).find("name").attr("value");
				$("#test").text(test);
				
				$("#test").append("<br />asd");

			},
			error: function(){
				$("#test").text("Failed");
			}
		});

	});
	
	$("#iskanjeIger").click(function(){
		document.location.href = "iskanjeIger.html";
	});
});
