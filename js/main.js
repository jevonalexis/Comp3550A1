function checkPass(){
    
    var password = document.getElementById('password');
    var password_confirm = document.getElementById('password_confirm');
    
    var message = document.getElementById('confirmMessage');
    
    var goodColor = "#66cc66";
    var badColor = "#ff6666";
    
    if(password.value == password_confirm.value){
        
        password_confirm.style.backgroundColor = goodColor;
        message.style.color = goodColor;
        message.innerHTML = "Passwords Match!"
		return true;
    }
    
    else{
        
        password_confirm.style.backgroundColor = badColor;
        message.style.color = badColor;
        message.innerHTML = "Passwords Do Not Match!"
		return false;
    }
}  

    

function phoneNumber(inputtxt){  
  
	var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;;  
	var message = document.getElementById('confirm_Message');
	
    var goodColor = "#66cc66";
	var badColor = "#ff6666";
  
	if(inputtxt.value.match(phoneno)){ 
		text_telephone.style.backgroundColor = goodColor;
		message.style.color = goodColor;
		message.innerHTML = "Valid phone number"
		return true;  
	}  
  
	else{ 
		text_telephone.style.backgroundColor = badColor;
		message.style.color = badColor
		message.innerHTML = "Not a valid phone number";  
		return false;  
	}  
}  

