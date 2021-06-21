// Select the Elements
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

// Classes names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINETHROUGH = "lineThough";

// Variables
let LIST, id;

// get item from localstorage
let data = localStorage.getItem("TODO");

// check if data is not empty
if (data){
  LIST = JSON.parse(data);
  id = LIST.length; // set the id to the last one in the list
  loadList(LIST); // load the list fo the user interface
} else {
  // if data isnt empty
  LIST = [];
  id = 0;
}

// add item to localstorage (code must be added where the LIST array is updated)
// localStorage.setItem("TODO", JSON.stringify(LIST)));

// load items to the users interface
function loadList(array){
  array.forEach(function(item){
    addToDo(item.name, item.id, item.done, item.trash);
  });
}

// clear the localstorage
clear.addEventListener('click', function(){
  localStorage.clear();
  location.reload();
})

// Shows todays date
let options = { weekday: 'long', month: 'short', day: 'numeric' };
let today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);

// add to do function
function addToDo(toDo, id, done, trash) {
  if (trash) { return; }

  const DONE = done ? CHECK : UNCHECK;
  const LINE = done ? LINETHROUGH : "";

  const text = `<li class="item">
    <i class="fa ${DONE} complete" job="complete" id="${id}"></i>
    <p class="text" ${LINE}> ${toDo} </p>
    <i class="de fa fa-trash-o" job="delete" id="${id}"></i>
  </li>`;
  const position = "beforeend";
  list.insertAdjacentHTML(position, text);
}

// add an item to list user the enter key
document.addEventListener("keyup", function (event) {
  if (event.keyCode == 13) {
    const toDo = input.value;
    // if the input isnt empty
    if (toDo) {
      addToDo(toDo, id, false, false);
      LIST.push({
          name: toDo,
          id: id,
          done: false,
          trash: false,
      });
      // add item to localstorage (code must be added where the LIST array is updated)
      localStorage.setItem("TODO", JSON.stringify(LIST));
      input.value = "";
      id++;
    }
  }
});

// complete to do
function completeToDo(element) {
  element.classList.toggle(CHECK);
  element.classList.toggle(UNCHECK);
  element.parentNode.querySelector(".text").classList.toggle(LINETHROUGH);
  LIST[element.id].done = LIST[element.id].done ? false : true;
}

// remove to do
function removeToDo(element) {
  element.parentNode.parentNode.removeChild(element.parentNode);
  LIST[element.id].trash = true;
}

// target the items created dynamically
list.addEventListener("click", function (event) {
  let element = event.target; // return the clicked element inside list
  const elementJob = event.target.attributes.job.value; // complete or delete
  if (elementJob == "complete") {
    completeToDo(element);
  } else if (elementJob == "delete") {
    removeToDo(element);
  }
  // add item to localstorage (code must be added where the LIST array is updated)
localStorage.setItem("TODO", JSON.stringify(LIST));
});
