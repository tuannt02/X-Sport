
var deleteForm = document.getElementById('delete-hidden-form');
// var editForm = document.getElementById('edit-hidden-form');

function deleteProduct(productID){
    var result = confirm("Do you want to delete this product?");
    if(result){
        deleteForm.action = '/admin/' + productID + '?_method=DELETE';
        deleteForm.submit();
    }
}

var searchInput = document.getElementById('search-input');
var searchForm = document.getElementById('search-form');

if(searchInput){
    searchInput.addEventListener('keydown', function(e){
        if(e.key == 'Enter'){
            searchForm.submit;
        }
    })
}