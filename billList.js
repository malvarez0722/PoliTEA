

var query = require('url').parse(req.url,true).query;
var topic = query.id;
var option = query.option;

localStorage.clear();

///////////////// HTML elements////////////////////////////////////////////////////
const list = document.getElementById('list')

/////////////////////////////////////////////////////////////////////////////
var url_test = 'https://reflected-flux-270220.appspot.com/bills/' + topic;

var xhttp = new XMLHttpRequest();
xhttp.open('GET', url_test, false);
xhttp.send();

const bills = JSON.parse(xhttp.responseText);

const pagination_element = document.getElementById('pagination');

let current_page = 1;
let rows = 10;

SetupPagination(bills, pagination_element, rows);
DisplayList(bills, rows, current_page);

function DisplayList (bills, rows_per_page, page) {
   document.getElementById('list').innerHTML = "";
   page--;

   let start = rows_per_page * page;
   let end = start + rows_per_page;
   console.log("start: " + start + " end: " + end);

 for (let i = start; i < bills.length && i<end ; i++) {

   const row = document.createElement('div');
   const col = document.createElement('div');
   const card = document.createElement('div');
   const position = document.createElement('div');
   const head1 = document.createElement('h3');
   const head2 = document.createElement('h6');
   const paragraph1 = document.createElement('p');
   const bioPage = document.createElement('a');
/*    const blankSpace = document.createElement('p');
   const financesPage = document.createElement('a'); */

   row.setAttribute('class', 'row mb-2');
   col.setAttribute('class', 'col mb-2');
   card.setAttribute('class' , 'row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative');
   position.setAttribute('class', 'col p-4 d-flex flex-column position-static');
   head1.setAttribute('class', 'mb-0');
   head2.setAttribute('class', 'mb-0');
   paragraph1.setAttribute('class', 'card-text mb-auto');
   bioPage.setAttribute('class', 'btn btn-primary');
   bioPage.setAttribute('id', `${senators[i].id}`)
   bioPage.setAttribute('onclick', `f1("${senators[i].id}", "${senators[i].first_name}", "${senators[i].last_name}", "${senators[i].party}", "${senators[i].state}", "${senators[i].district}");`)
   bioPage.setAttribute('href', 'bill.html')
/* 
   financesPage.setAttribute('class', 'btn btn-primary');
   financesPage.setAttribute('id', `${senators[i].id}`)
   financesPage.setAttribute('onclick', `f1("${senators[i].id}", "${senators[i].first_name}", "${senators[i].last_name}", "${senators[i].party}", "${senators[i].state}", "${senators[i].district}");`)
   financesPage.setAttribute('href', 'financial_main.html') */

   if(bills[i].short_title != null)head1.textContent = bills[i].short_title;
   head1.textContent += " (" + bills[i].number + ")";
   head2.textContent = bills[i].title;

   paragraph1.textContent = bills[i].sponsor_title + " " + bills[i].sponsor_name + " (" + bills[i].sponsor_party + ") " + bills[i].sponsor_state + " -- (Link to Politicians Model coming soon)"


   bioPage.textContent = "Biography";
   blankSpace.textContent = " ";
   financesPage.textContent = "Donors and Finances"

   list.appendChild(row);
   row.appendChild(col);
   col.appendChild(card);
   card.appendChild(position);
   position.appendChild(head1);
   position.appendChild(blankSpace);
   position.appendChild(head2);
   position.appendChild(blankSpace);
   position.appendChild(paragraph1);
   position.appendChild(bioPage);


   }
}

function SetupPagination (senators, wrapper, rows_per_page) {
   wrapper.innerHTML = "";
   let length = senators.length;

   let page_count = Math.ceil(length / rows_per_page);
   for (let i = 1; i < page_count + 1; i++) {
       let btn = PaginationButton(i, senators);
       wrapper.appendChild(btn);
   }
}

function PaginationButton (page, senators) {
   let button = document.createElement('button');
   button.innerText = page;

   if (current_page == page) button.classList.add('active');

   button.addEventListener('click', function () {
       current_page = page;
       DisplayList(senators, rows, current_page);

       let current_btn = document.querySelector('.pagenumbers button.active');
       current_btn.classList.remove('active');

       button.classList.add('active');
   });

   return button;
}

function f1(id, firstName, lastName, party, state, district){
 localStorage.setItem('politician_id', id);
 localStorage.setItem('politician_firstName', firstName);
 localStorage.setItem('politician_lastName', lastName);
 localStorage.setItem('politician_party', party);
 localStorage.setItem('politician_state', state);
};
