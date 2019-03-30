$(document).ready(function(){
	$('[data-toggle="tooltip"]').tooltip();

	//checks first if either or both fields are empty, if not then it attempts to log the user in and either displays an error or loads the welcome page
	$("#logIn").click(function(){
		
		var login = $("#usernameInput").val();
		var pass = $("#passwordInput").val();
		
		if (login=="" && pass==""){
			$("#error").text("Polji sta prazni");
		}
		else if(login==""){
			$("#error").text("Uporabniško ime je prazno");
		}
		else if(pass==""){
			$("#error").text("Geslo je prazno");
		}
		else{
			$("#error").text("Vpisovanje...");
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
					$("#error").text("Wrong username or password");
				}
				else{
					$("#error").text("Error in connecting to database: ("+response+"), ("+status+")");
				}
			});
		}
	});
	
$("#register").click(function(){
	
	
	
	var login = $("#usernameInput").val();
	var pass = $("#passwordInput").val();
	var eposta = $("#emailInput").val();

	if (login=="" || pass=="" || eposta==""){
		$("#error").text("Nekatera polja so prazna");
	}
	else{

		var data={
			uporabnisko_ime:login,
			geslo:pass,
			email:eposta
		};
		
		//sending data via POST method to a php script, returns a response
		$.post("register.php", data, function(response, status){

			if(response=="registerSuccess"){
				
				$("#error").text("Registration Successful, you may log in now");
			}
			else if(response=="registerError"){
				$("#error").text("Registraion failed, username already exists");
			}
			else{
				$("#error").text("Error in connecting to database: ("+response+"), ("+status+")");
			}
		});
	}
});
	
	/*$("#sssearchButton").click(function(){
		var query = $("#gameSearch").val().replace(/ /g, "+");
		var id = "";
		
		
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
				url:'https://api.geekdo.com/xmlapi2/thing?id='+id.slice(1)+type,
				dataType:'xml',
				async:false,
				success:function(data){
					
					$(data).find("items item").each(function(i){
						var id = $(this).attr("id");
						//var name = "<a href='https://boardgamegeek.com/boardgame/"+id+"' target='_blank'>"+$(this).find("name").attr("value")+"</a>";
						var name = "<a class='nav-link' href='igra.html?igra="+id+"'>"+$(this).find("name").attr("value")+"</a>";
						var thumbnail = "<img width=\"50%\" src='"+$(this).find("thumbnail").text()+"'></img>";
						var yearpublished = $(this).find("yearpublished").attr("value");
						
						var minplayers = $(this).find("minplayers").attr("value");
						var maxplayers = $(this).find("maxplayers").attr("value");
						
						var players = checkMinMax(minplayers, maxplayers);
						
						var minplaytime = $(this).find("minplaytime").attr("value");

						
						var maxplaytime = $(this).find("maxplaytime").attr("value");

						var playtime = checkMinMax(minplaytime, maxplaytime);
						
						var categories = "";
						$(this).find("link[type='boardgamecategory']").each(function(){
										categories = categories+$(this).attr("value")+"<br />";
									});
						
						
						$('#tableSearch > tbody:last-child').append("<tr><td>"+thumbnail+
																	"</td><td>"+name+
																	"</td><td class=\"d-none d-sm-table-cell\">"+categories+
																	"</td><td class=\"d-none d-sm-table-cell\">"+yearpublished+
																	"</td><td class=\"d-none d-sm-table-cell\">"+players+
																	"</td><td class=\"d-none d-sm-table-cell\">"+playtime+
																	"</td></tr>");
					
						if(i>48){
							return false;
						}
					});
					
					

				},
				error: function(){
					$("#test").text("Failed");
				}
			});
		}
		
	});*/
	/*
	function UroUriUre(time){
		if(time == 1){
			console.log("asd"+time);
			time+=" uro";
		}else if(time == 2){
			time+=" uri";
		}else{
			time+=" ure";
		}
	}*/
	
	//load navbar on a page
	$(function(){
		$("#navBar").load("navbar.html");
	});
	
	//load a bottom div  to link to the top of the page
	$(window).scroll(function() {
		if ($(this).scrollTop() == 0) {
			$('.fixed-bottom').hide();
		} else {
			$('.fixed-bottom').show();
		}
	});
	
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
	
	/*function checkIfEmpty(array[]){
		
	}*/
});
