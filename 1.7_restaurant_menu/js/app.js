//let ajax = require('./server');
let ajax = require('./ajax');
let refineData = require('./refine');
let generateList = require('./generate');
let filter = require('./filter');
let newView = require('./view');


window.addEventListener('load', function() {
	//ajax.get('localhost:8000/menu', showMenu);
	ajax.get('http://api.queencityiron.com/chats', showMenu);
	
	// watch for changing views
	let menuBtn = document.querySelectorAll('nav button');
	menuBtn.forEach(function(button) {
		button.addEventListener('click', function() {
			newView(button.value);
		});
	});
	
	// watch for filtering items
	let search = document.querySelector('#filter');
	search.addEventListener('input', filter);
	
	// watch for adding items
	let addBtn = document.querySelector('#add-item');
	addBtn.addEventListener('click', addItem);
	
});


function showMenu(response) {
	// let menu = refineData(response.chats);
	let menu = response.chats;
	generateList(menu);
}

function addItem() {
	let body = {
		//change from and message to 'name' and 'description'
		from:  document.querySelector('#new-item').value,
		message: document.querySelector('#new-description').value,
		//price: document.querySelector('#new-price').value,
	};
	ajax.post('http://api.queencityiron.com/chats', body, success);
}

function success() {
	alert('Item added to menu.');
	document.querySelector('#menu').textContent = '';
	ajax.get('http://api.queencityiron.com/chats', showMenu);
}