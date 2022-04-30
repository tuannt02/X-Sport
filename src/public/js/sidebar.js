const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const listItem = $$('.tag');

listItem.forEach(element => {
    element.onclick = function()    {
        changeState(element);
    }
});

function changeState(element)  {
    removeAllStateActive();
    element.classList.add('active');
    const parentCate = findParentTagA(element);
    if(parentCate!=null) parentCate.classList.add('active');
    localStorage.setItem('stateSidebar', element.id);
}

window.onload = (event) =>  {
    var stateSidebar = localStorage.getItem('stateSidebar');
    const element = $('#' + stateSidebar);
    changeState(element);
}

function removeAllStateActive()  {
    listItem.forEach(e => {
        if(e.querySelector('#tag')) return;
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

