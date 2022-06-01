function ImagesFileAsURL(uploadID, itemID) {
    var fileSelected = document.querySelector("#" + uploadID).files;
    if (fileSelected.length > 0) {
        var fileToLoad = fileSelected[0];
        var fileReader = new FileReader();
        fileReader.onload = function (fileLoaderEvent) {
            var srcData = fileLoaderEvent.target.result;
            var newImage = document.createElement('img');
            newImage.src = srcData;
            document.querySelector('#' + itemID).innerHTML = newImage.outerHTML;
            document.querySelector('#' + itemID).classList.add('none-boder');
        }
        fileReader.readAsDataURL(fileToLoad);
    }
}


var containerColor = document.querySelector('.wrap-color-option');
var insertFieldColor = document.querySelector('.wrap-insert-color');
var inputColor = document.querySelector('.input-color')
var tagColors = []

var containerSize = document.querySelector('.wrap-size-option');
var insertFieldSize = document.querySelector('.wrap-insert-size');
var inputSize = document.querySelector('.input-size')
var tagSizes = []


function renderColors() {
    containerColor.innerHTML = ''
    for (let i = 0; i < tagColors.length; i++) {
        const color = tagColors[i];
        containerColor.innerHTML += '<li> ' + color + '<i class="bx bx-x" onclick="removeColor(' + i + ')"></i> </li>'
    }
    containerColor.appendChild(insertFieldColor);
    inputColor.focus();
}
renderColors()


function renderSizes() {
    containerSize.innerHTML = ''
    for (let i = 0; i < tagSizes.length; i++) {
        const size = tagSizes[i];
        containerSize.innerHTML += '<li> ' + size + '<i class="bx bx-x" onclick="removeSize(' + i + ')"></i> </li>'
    }
    containerSize.appendChild(insertFieldSize);
    inputSize.focus();
}
renderSizes()


function addColor() {
    if (inputColor.value.trim()) {
        tagColors.push(inputColor.value.trim());
        inputColor.value = ''
        renderColors();
    }
}


function addSize() {
    if (inputSize.value.trim()) {
        tagSizes.push(inputSize.value.trim());
        inputSize.value = ''
        renderSizes();
    }
}


function removeColor(index) {
    tagColors.splice(index, 1);
    renderColors();
}


function removeSize(index) {
    tagSizes.splice(index, 1);
    renderSizes();
}


// Submit form:
var form = document.getElementById('form')

form.addEventListener('submit', function(e){
    e.preventDefault();
    
    var productName = document.getElementById('productName').value
    var price = document.getElementById('price').value
    var total = document.getElementById('total').value
    var discount = document.getElementById('discount').value 
    var sold = document.getElementById('sold').value
   
    var e_category = document.getElementById('category')
    var category = e_category.options[e_category.selectedIndex].text

    var e_brand = document.getElementById('brand')
    var brand = e_brand.options[e_brand.selectedIndex].text

    var listSize = []
    var listColor = []
    var listImage =[]


    // Insert list Color
    var childColor = containerColor.childNodes;
    childColor.forEach(function(li){
        if(li.innerText){
            listColor.push(li.innerText)
        }
    })


    //Insert list Size
    var childSize = containerSize.childNodes;
    childSize.forEach(function(li){
        if(li.innerText){
            listSize.push(li.innerText)
        }
    })



    //Insert list Image
    var containerImage = document.querySelector('.list-imgs')
    var childImage = containerImage.getElementsByTagName('img');
    for(let img of childImage){
        listImage.push(img.src)
    }
    
    if(productName && category && brand && price && listSize.length && listColor.length && listImage.length){        
        fetch("/admin/store-product",{
            method: 'POST',
            body: JSON.stringify({
                name: productName,
                category: category,
                brand: brand,
                price: price,
                total: total,
                discount: discount,
                sold: sold,
                img: listImage,
                size: listSize,
                color: listColor
            }),
            headers: {
                "Content-type":"application/json; charset=UTF-8"
            }
        })
        .then(function(response){
            alert('Thêm mới sản phẩm thành công!');
            location.reload();
        })   
    }
    else{
        alert('Vui lòng nhập đầy đủ thông tin sản phẩm!')
    }
})