(function(){
	var x = document.getElementById("login");
	x.onclick=function(ev){
		ev.preventDefault();
		var name = document.getElementById("name");
		var password = document.getElementById("password");

		var url ="/login";
		var xhr = new XMLHttpRequest();
		xhr.open('POST',url, true);
		xhr.setRequestHeader('Content-Type', 'application/json');
		xhr.onload = function () {
		 //do nothing
		};
		xhr.send(JSON.stringify({'username' : name.value,'password':password.value}));

	};
})();
