// Function increase, decrease quatity
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


// Function handle check box
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



// Function Print price
function print_price(price) {
    var temp;
    temp = price.toString();
    var dot = ".";
    var k=0;
    for(var i = temp.length - 1; i >= 0; i--)   {
        ++k;
        if(k%3==0 && i!=0)  {
            temp = [temp.slice(0,i), dot, temp.slice(i)].join('');
        }
    }
    return temp;
  }


// Function set Total payment
var TotalPrice = document.querySelector(".total-price");
var listOldPrice = document.querySelectorAll(".item-price");

function TotalPayment(){
    sum = 0;
    listOldPrice.forEach(Oldprice =>
            sum +=  parseInt(Oldprice.firstChild.textContent.split('.').join(''))
        )
    
    TotalPrice.textContent = print_price(sum) + ' đ';
}
TotalPayment();