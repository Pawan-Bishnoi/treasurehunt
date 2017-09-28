(function(){
	var x = document.getElementById("login")
	x.onclick=function(){
		alert("login clicked");

	var name = document.getElementById("name");
	var password = document.getElementById("password");

	var url =""
	var xhr = new XMLHttpRequest();
	xhr.open('POST',url, true);
	xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	xhr.onload = function () {
	 //do nothing
	};
	xhr.send('user='+name+'&pass='+password);

	}
})()