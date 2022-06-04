

function Plus(e){
    var textbox = e.parentNode.querySelector("#textbox-quatity");
    var num = textbox.value;
    textbox.ariaValueNow = textbox.value = parseInt(num) + 1;
}


function Minus(e){
    var textbox = e.parentNode.querySelector("#textbox-quatity");
    var num = textbox.value;
    if(num > 1){
        textbox.ariaValueNow = textbox.value = parseInt(num) - 1;
    }
}

function unCheckedAll(){
    var listCheck = document.querySelectorAll('input[type=checkbox]')
    listCheck.forEach(check => check.checked = false);
}

function CheckedAll(){
    var listCheck = document.querySelectorAll('input[type=checkbox]')
    listCheck.forEach(check => check.checked = true);   
}

var topCheckbox = document.getElementById('top-check-all');
var bottomCheckbox = document.getElementById('bottom-check-all');

topCheckbox.addEventListener('change', function(){
    if(topCheckbox.checked){
        CheckedAll();
    }
    else{
        unCheckedAll();
    }
});

bottomCheckbox.addEventListener('change', function(){
    if(bottomCheckbox.checked){
        CheckedAll();
    }
    else{        
        unCheckedAll();
    }
});

// .addEventListener('change', CheckedAll());
// var x = document.querySelector('#top-check-all');
// console.log(x)