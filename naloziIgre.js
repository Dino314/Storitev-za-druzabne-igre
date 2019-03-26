var xhr = new XMLHttpRequest();
xhr.open("GET", "naloziIgre.php", true);
xhr.onload = function (e) {
  if (xhr.readyState === 4) {
	if (xhr.status === 200) {
	  var Arr = (xhr.responseText);
	  console.log(Arr);
	  document.getElementById("mojeIgre").innerHTML = Arr;

	  
	} else {
	  console.error(xhr.statusText);
	}
  }
}.bind(this);
xhr.onerror = function (e) {
  console.error(xhr.statusText);
};
xhr.send(null);