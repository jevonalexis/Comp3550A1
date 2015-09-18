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
    }
    
    else{
        
        password_confirm.style.backgroundColor = badColor;
        message.style.color = badColor;
        message.innerHTML = "Passwords Do Not Match!"
    }
}  