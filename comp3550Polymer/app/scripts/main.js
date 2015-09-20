////////////////////// posting form ///////////////////////

function clearFields(id){
	document.getElementById(id).reset();
}


function postToPage(name, country, comment){
	var commentDiv = document.getElementById("commentDiv");
	var paperEl = document.createElement('paper-material');

	paperEl.elevation = 1;
	paperEl.class = "newComment";
	paperEl.innerHTML = "<h3> " + name + " of " + country + " </h3> <p>" + comment + "</p>";
	commentDiv.appendChild(paperEl);
	toast = document.getElementById('toast');
	toast.show();

}

//uppercases the first word of a string
function toUpperFW( str ){
    var pieces = str.split(" ");
    for ( var i = 0; i < pieces.length; i++ ){
        var j = pieces[i].charAt(0).toUpperCase();
        pieces[i] = j + pieces[i].substr(1);
    }
    return pieces.join(" ");
}

function handleForm(){
	console.log("Submit clicked");
	var form = document.forms[0];

	var name = form["ti_name"].value;
	var country = form["ti_country"].value;
	var comment = form["ti_comment"].value;

	if(name === ""){
		alert("Let YOUR voice be heard. Please enter your name.");
	}
	else if(country === ""){
		alert("Be the voice of YOUR country. Please state your country.");
	}
	else if(comment === ""){
		alert("Oops looks like you forgot to put a comment.");
	}

	else{
		postToPage(toUpperFW(name), toUpperFW(country), toUpperFW(comment));
		clearFields('comment-form');
	}
	return false;
}

///////////////////////////// sign up form //////////////////////////

function showSignupToast(){
	toast = document.getElementById('signuptoast');
	toast.show();
	return false;
}

function isValidNum(num){
	var re = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
	return num.match(re);
}

function isValidPW(pw){
    // at least one number, one lowercase and one uppercase letter
    // at least six characters
    var re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    return re.test(pw);
}

function isValidEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
}

function handleForm2(){
	var form = document.forms[1];
	var name = form["ti_name2"].value;
	var phone = form["ti_phone"].value;
	var email = form["ti_email"].value;
	var pw = form["ti_password"].value;

	if(name ==="" || email ==="" || pw===""){
		alert("Name, Email and Password are required fields");
		return false;
	}
	if(phone!=null && phone!=undefined && phone!="") {
		if(!isValidNum(phone)){
		alert("Invalid phone number");
		return false;
		}
	}
	else if(!isValidPW(pw)){
		alert("Invalid phone password");
		return false;
	}
	else if(!isValidEmail(email)){
		alert("Invalid phone email address");
		return false;
	}
	else{
		showSignupToast();
		clearFields('signup-form');
		return true;
	}
}
