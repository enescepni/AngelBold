


const form = document.querySelector('form');
const input = document.querySelector('#txtName');
const btnDeleteAll = document.querySelector('#btnDeleteAll');
const taskList = document.querySelector('#task-list');
let items;




// yükle

loadItems();




// event cagırma
eventListeners();

function eventListeners() {
    // submit
    form.addEventListener('submit', addNewItem);

    // silme

    taskList.addEventListener('click', deleteItem);
    btnDeleteAll.addEventListener('click', deleteAllItems);
}

function loadItems() {

    items = getItemsFromLS();

    items.forEach(function (item) {
        createItem(item);
    })
}

// get items from local depo

function getItemsFromLS() {
    if (localStorage.getItem('items') === null) {
        items = [];
    } else {
        items = JSON.parse(localStorage.getItem('items'));
    }
    return items;
}
// set item local depo
function setItemToLS(text) {
    items = getItemsFromLS();
    items.push(text);
    localStorage.setItem('items', JSON.stringify(items));
}

//silme Ls
function deleteItemFromLS(text){
    items = getItemsFromLS();
    items.forEach(function(item,index){
        if(item === text){
            items.splice(index,1);
        }
    });
    localStorage.setItem('items',JSON.stringify(items));
}

//create listeleri

function createItem(text) {
    // li

    const li = document.createElement('li');
    li.className = 'list-group-item list-group-item-secondary';
    li.appendChild(document.createTextNode(text));

    // a

    const a = document.createElement('a');
    a.classList = 'delete-item float-right';
    a.setAttribute('href', '#');
    a.innerHTML = '<i class="fas fa-times"></i>';

    // li to a
    li.appendChild(a);

    // li to ul
    taskList.appendChild(li);

}

// add item
function addNewItem(e) {
    if (input.value === '') {
        alert('add new item')
    }

    //create
    createItem(input.value);

    // kaydet Ls
    input.value = '';

    // temizle
    input.value = '';


    e.preventDefault();


}
// temizle itemleri
function deleteItem(e) {

    if (e.target.className === 'fas fa-times') {
        if (confirm('kaldırmak isteğinizden eminmisiniz ?')) {
            e.target.parentElement.parentElement.remove();

            console.log
            deleteItemFromLS(e.target.parentElement.parentElement.textContent);
        }
    }

    e.preventDefault();
}

// hepsini sil button
function deleteAllItems(e) {

    if (confirm('Hepsini kaldırmak isteğinizden eminmisiniz ?')) {
        //taskList.innerHTML='';
        while(taskList.firstChild){
            taskList.removeChild(taskList.firstChild);
        }
        localStorage.clear();
        
    }
    e.preventDefault();
}