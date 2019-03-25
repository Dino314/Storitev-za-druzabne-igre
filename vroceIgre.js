$(document).ready(function(){

		$.ajax({
			url:'https://api.geekdo.com/xmlapi2/hot?type=boardgame',
			dataType:'xml',
			//async:false,
			success:function(data){
				$(data).find("items item").each(function(i){
					var id = $(this).attr("id");
					var name = $(this).find("name").attr("value");
					//var name = "<a href='https://boardgamegeek.com/boardgame/"+id+"' target='_blank'>"+name+"</a>";
					var name = "<a href='igra.html?igra="+id+"'>"+name+"</a>";

					$('#vroceIgre > tbody:last-child').append("<tr><td>"+(i+1)+"</td><td>"+name+"</td></tr>");
					
					if(i>8){
						return false;
					}
				});
				$("table").addClass("table-striped");
			},
			error: function(){
				//$("#test").text("Failed");
			}
		});
	


	$("#iskanjeIger").click(function(){
		document.location.href = "iskanjeIger.html";
	});
});
