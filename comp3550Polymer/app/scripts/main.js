////////////////////// posting form ///////////////////////


function clearFields(formid){
    $("#"+formid).find("input, textarea").val("");

}

//accepts a user object and a div id and posts posts the contents of that
//user object to a new card withing the specified div
function postToPage(user,div){
	var commentDiv = document.getElementById(div);
	var paperEl = document.createElement('paper-material');

	paperEl.elevation = 1;
	paperEl.class = "newComment";
	paperEl.innerHTML = "<h3> " + user.uname + " of " + user.country + " </h3> <p>" + user.comment + "</p>";
	commentDiv.insertBefore(paperEl,commentDiv.childNodes[0]);
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


//validates the form for posting to page and executes the post function 
function handleForm(){
	console.log("Submit clicked");
	var form = document.forms[0];

	var name = form["ti_name"].value;
	var country = form["ti_country"].value;
	var comment = form["ti_comment"].value;

	if(name === ""){
		alert("Let YOUR voice be hear. Please enter your name.");
	}
	else if(country === ""){
		alert("Be the voice of YOUR country. Please state your country.");
	}
	else if(comment === ""){
		alert("Oops looks like you forgot to put a comment.");
	}
	else{
		var user = {};
		user.uname=toUpperFW(name);
		user.country=toUpperFW(country);
		user.comment=toUpperFW(comment);
		postToPage(user,'commentDiv');
		clearFields('comment-form');
	}
	return false;
}



///////////////////////////// sign up form //////////////////////////

function showToast(id){
	toast = document.getElementById(id);
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
		showToast('signuptoast');
		clearFields('signup-form');
		return true;
	}
}


////////////////// AJAX to load older posts ////////////////////////////

var loaded = false;
function loadOldComments(){

	if(!loaded){
		console.log("btn clickeddd");
		var xmlhttp;
		if (window.XMLHttpRequest)
		  {// code for IE7+, Firefox, Chrome, Opera, Safari
		  xmlhttp=new XMLHttpRequest();
		  }
		else{// code for IE6, IE5
		  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
		}
		xmlhttp.onreadystatechange=function(){
		  if (xmlhttp.readyState==4 && xmlhttp.status==200){
		    	processFile(xmlhttp.responseText);
		    	loaded = true;
		   }
		}
		xmlhttp.open("GET","older_posts.txt",true);
		xmlhttp.send();
	}
	else{
		showToast('no-post');
	}
}



function processFile(fileTxt){
	if(fileTxt!=""){
		var arr="";
		arr = fileTxt.split(">>>");	
		processArray(arr);
	}
}

function processArray(arr){
	var i;
	for(i = 0; i <= arr.length-3; i+=3){
		var user ={uname:arr[i], country:arr[i+1], comment:arr[i+2]};
		postToPage(user,'oldCommentDiv');
	}
}


