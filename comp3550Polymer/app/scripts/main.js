function clearFields(){
	document.getElementById('comment-form').reset();
}

function postToPage(name, country, comment){
	var commentDiv = document.getElementById("commentDiv");
	var paperEl = document.createElement('paper-material');

	paperEl.elevation = 1;
	paperEl.class = "newComment";
	paperEl.innerHTML = "<h3> " + name + " from " + country + " </h3> <p>" + comment + "</p>";
	commentDiv.appendChild(paperEl);
}

function handleForm(){
	console.log("Submit clicked");
	var form = document.forms[0];

	var name = form["ti_name"].value;
	var country = form["ti_country"].value;
	var comment = form["ti_comment"].value;

	if(name === ""){
		alert("Let YOUR voice be hear. Please enter a name.");
	}
	else if(country === ""){
		alert("Be the voice of YOUR country. Please state your country.");
	}
	else if(comment === ""){
		alert("Oops looks like you forgot to put a comment.");
	}

	else{
		postToPage(name, country, comment);
		clearFields();
	}
	return false;
}

window.onload = function(){
	var form = document.getElementById('comment-form');
	if(form !== null && form !== undefined){
		form.onsubmit = handleForm;
	}
}

