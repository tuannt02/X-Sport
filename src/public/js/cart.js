// Function increase, decrease quatity
function Plus(e){
    var textbox = e.parentNode.querySelector("#textbox-quantity");
    var num = textbox.value;
    var quantity = textbox.ariaValueNow = textbox.value = parseInt(num) + 1;

    var parentNode = e.parentNode.parentNode.parentNode;
    if(parentNode){
        var newprice = parseInt(parentNode.querySelector('.item__new-price').textContent.split('.').join(''));
        var itemprice = parentNode.querySelector('.item-price');
        itemprice.textContent = print_price(newprice * quantity);
        TotalPayment();
    }
}

function Minus(e){
    var textbox = e.parentNode.querySelector("#textbox-quantity");
    var num = textbox.value;
    if(num > 1){
        var quantity = textbox.ariaValueNow = textbox.value = parseInt(num) - 1;  

        var parentNode = e.parentNode.parentNode.parentNode;
        if(parentNode){
            var newprice = parseInt(parentNode.querySelector('.item__new-price').textContent.split('.').join(''));
            var itemprice = parentNode.querySelector('.item-price');
            itemprice.textContent = print_price(newprice * quantity);
            TotalPayment();
        }
    }
}


// // Update product quatity
var formUpdateQuantity = document.querySelectorAll('#update-quantity-form');

formUpdateQuantity.forEach(form =>{
    form.addEventListener('submit', function(e){
        e.preventDefault();

        var quantity = e.submitter.parentNode.querySelector('.quantity-input').value;
        var cartID = e.submitter.parentNode.querySelector('#cartID').value;

        fetch("/user/edit-quantity",{
            method: 'PUT',
            body: JSON.stringify({
                id: cartID,
                quantity: quantity
            }),
            headers: {
                "Content-type":"application/json; charset=UTF-8"
            }
        })
    })
})



// Function handle check box
function unCheckedAll(){
    var listCheck = document.querySelectorAll('input[type=checkbox]')
    listCheck.forEach(check => check.checked = false);
    TotalPayment();
}

function CheckedAll(){
    var listCheck = document.querySelectorAll('input[type=checkbox]')
    listCheck.forEach(check => check.checked = true);  
    TotalPayment(); 
}

var topCheckbox = document.getElementById('top-check-all');
var bottomCheckbox = document.getElementById('bottom-check-all');

if(topCheckbox){
    topCheckbox.addEventListener('change', function(){
        if(topCheckbox.checked){
            CheckedAll();
        }
        else{
            unCheckedAll();
        }
    });
}

if(bottomCheckbox){
    bottomCheckbox.addEventListener('change', function(){
        if(bottomCheckbox.checked){
            CheckedAll();
        }
        else{        
            unCheckedAll();
        }
    });
}


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
var listProduct = document.querySelectorAll(".cart-item");

function TotalPayment(){
    sum = 0;  
    listProduct.forEach(item =>{
        if(item.querySelector('#check-item').checked){
            sum += parseInt(item.querySelector('.item-price').firstChild.textContent.split('.').join(''));
        }            
        if(TotalPrice)
            TotalPrice.textContent = print_price(sum) + ' đ';  
    })
}
TotalPayment();


// Add event Checked
var checkboxItem = document.querySelectorAll('#check-item');
if(checkboxItem)
{
    checkboxItem.forEach(item=>{
        item.addEventListener('change', function(){
            TotalPayment();
        })
    })
}

// Delete Product
var formDelete = document.getElementById('form-delete-product');

function deleteProduct(productID){
    var result = confirm("Do you want to remove this product?");
    if(result){
        formDelete.action = '/user/cart/' + productID + '?_method=DELETE';
        formDelete.submit();
    }
}

// Payment

var formCheckout = document.getElementById('form-payment');
var listPaymentID = [];
var inputHidden = document.getElementById('inputHidden');

formCheckout.addEventListener('submit', function(e){
    listProduct.forEach(item =>{
        if(item.querySelector('#check-item').checked){
            listPaymentID.push(item.querySelector('#cartID').value);
        }
    })
    if(listPaymentID.length == 0){
        e.preventDefault();
        alert('Chưa có sản phẩm nào được chọn để thanh toán');
    }
    else
        inputHidden.value = listPaymentID;
})