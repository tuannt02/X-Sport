    const showMenu = (toggleID, sidebarID, separateID) =>{
        const toggle = document.getElementById(toggleID);
        const sidebar = document.getElementById(sidebarID);       
        const list_separate = document.querySelectorAll('#' + separateID);

        if(toggle && sidebar && list_separate)
        {
            toggle.addEventListener('click', ()=>{
                sidebar.classList.toggle('show');
                for(i = 0; i<list_separate.length; i++){
                    list_separate[i].classList.toggle('show_sepa');
                }
            })
        }
    }
    showMenu('nav-toggle', 'sidebar', 'separate')
    
    
    const listItem = document.querySelectorAll('.nav-link');
    const listBefore = document.querySelectorAll('.before-item');       
    function selectItem(){
        if(listItem){
            for(i = 0; i<listItem.length; i++){
                listItem[i].classList.remove('select');
            }
        this.classList.add('select');
        }
    }
    listItem.forEach(l=>l.addEventListener('click', selectItem))

