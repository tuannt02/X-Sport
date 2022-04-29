const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const listItem = $$('.tag');

listItem.forEach(element => {
    element.onclick = function()    {
        removeAllStateActive();
        element.classList.add('active');
        const parentCate = findParentTagA(element);
        if(parentCate!=null) parentCate.classList.add('active');
    }
});

function removeAllStateActive()  {
    listItem.forEach(e => {
        e.classList.remove('active');
    }); 
}

function findParentTagA(child)   {
    var childE = child.parentElement;
    while(childE)  {
        if(childE.matches('.tablist_i'))
            break;
            childE = childE.parentElement;
    }
    childE = childE.querySelector('a');
    return childE;
}

