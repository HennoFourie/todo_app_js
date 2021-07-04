// Select the Elements
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");
const sort = document.querySelector(".sort");

// Classes names
const CHECK = "bi-check-circle-fill";
const UNCHECK = "bi-check-circle";
const LINETHROUGH = "lineThrough";

// Variables
let LIST, id;

// get item from localstorage
let data = localStorage.getItem("TODO");

// check if data is not empty
if (data) {
  LIST = JSON.parse(data);
  id = LIST.length; // set the id to the last one in the list
  loadList(LIST); // load the list fo the user interface
} else {
  // if data isnt empty
  LIST = [];
  id = 0;
}

// load items to the users interface
function loadList(array) {
  array.forEach(function (item) {
    addToDo(item.name, item.duedate, item.id, item.done, item.trash);
  });
}

// clear the localstorage
clear.addEventListener('click', function () {
  localStorage.clear();
  location.reload();
})

// Shows todays date
let options = { weekday: 'long', month: 'short', day: 'numeric' };
let today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);

// add to do function
function addToDo(toDo, duedate, id, done, trash) {
  if (trash) { return; }

  const DONE = done ? CHECK : UNCHECK;
  const LINE = done ? LINETHROUGH : "";

  const text = `<li class="item">
    <i class="${DONE} co" job="complete" id="${id}"></i>
    <input type="date" class="date" ${LINE} value="${duedate}" disabled="true">
    <input type="text" class="text" ${LINE} value="${toDo}" disabled="true">
    <i class="bi bi-pencil-square edit" job="edit" id="${id}"></i>
    <i class="bi bi-trash de" job="delete" id="${id}"></i>
  </li>`;
  const position = "beforeend";
  list.insertAdjacentHTML(position, text);
}

// function to add item to list
function additem() {
  const toDo = input.value;
  const date = duedate.value;
  // if the input isnt empty
  if (toDo && date) {
    addToDo(toDo, date, id, false, false);
    LIST.push({
      name: toDo,
      duedate: date,
      id: id,
      done: false,
      trash: false,
    });
    // add item to localstorage (code must be added where the LIST array is updated)
    localStorage.setItem("TODO", JSON.stringify(LIST));
    input.value = "";
    duedate.value = null;
    id++;
  }
}

// add an item to list user press the enter key
document.addEventListener("keyup", function (event) {
  if (event.keyCode == 13) {
    additem();
  }
});

// add an item to list user press plus key
document.getElementById('addinput').addEventListener('click', function () {
  additem();
});

// complete to do
function completeToDo(element) {
  element.classList.toggle(CHECK);
  element.classList.toggle(UNCHECK);
  element.parentNode.querySelector(".text", ".duedate").classList.toggle(LINETHROUGH);
  LIST[element.id].done = LIST[element.id].done ? false : true;
}

//Edit an existing task
function editToDo(element) {
  let listItem = element.parentNode;
  let inputStatus = listItem.querySelector("[class=text]").disabled;
  let dateStatus = listItem.querySelector("[class=date]").disabled;
  // toggle disable input status
  if (inputStatus == true && dateStatus == true) {
    listItem.querySelector("[class=text]").disabled = false;
    listItem.querySelector("[class=date]").disabled = false;
  } else {
    let editInput = listItem.querySelector("[class=text]").value;
    let editDate = listItem.querySelector("[class=date]").value;
    LIST[element.id].name = editInput;
    LIST[element.id].duedate = editDate;

    listItem.querySelector("[class=text]").disabled = true;
    listItem.querySelector("[class=date]").disabled = true;
  }
}

// remove to do
function removeToDo(element) {
  element.parentNode.parentNode.removeChild(element.parentNode);
  LIST[element.id].trash = true;
}

// sort to do
sort.addEventListener('click', function () {
  LIST.sort((a, b) => (a.name > b.name) ? 1 : (a.name === b.name) ? 
    ((a.duedate > b.duedate) ? 1 : -1) : -1);
  localStorage.clear();
  location.reload();
  // add item to localstorage (code must be added where the LIST array is updated)
  localStorage.setItem("TODO", JSON.stringify(LIST));
})

// target the items created dynamically
list.addEventListener("click", function (event) {
  let element = event.target; // return the clicked element inside list
  const elementJob = event.target.attributes.job.value; // complete or delete
  if (elementJob == "complete") {
    completeToDo(element);
  } else if (elementJob == "delete") {
    removeToDo(element);
  } else if (elementJob == "edit") {
    editToDo(element);
  }
  // add item to localstorage (code must be added where the LIST array is updated)
  localStorage.setItem("TODO", JSON.stringify(LIST));
});
