const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

let toDoList = [];
let id = 0;

const check = "fa-check-circle";
const uncheck = "fa-circle-thin";
const lineThrough = "lineThough";

function addToDo(toDo, id, done, trash) {
  if (trash){return;}

  const DONE = done ? check : uncheck;
  const LINE = done ? lineThrough : "";

  const text = `<li class="item">
    <i class="fa ${DONE} complete" job="complete" id="${id}"></i>
    <p class="text" ${LINE}> ${toDo} </p>
    <i class="de fa fa-trash-o" job="delete" id="${id}"></i>
  </li>`;
  const position = "beforeend";
  list.insertAdjacentHTML(position, text);
}

document.addEventListener("keyup", function (event) {
  if (event.keyCode == 13) {
    const toDo = input.value;
    if (toDo) {
      addToDo(toDo, id, false, false);
      toDoList.push(
        {
          name: toDo,
          id: id,
          done: false,
          trash: false,
        }
      );
      input.value = "";
      id++;
    }
  }
});

function completeToDo(element){
  element.classList.toggle(check);
  element.classList.toggle(uncheck);
  element.parentNode.querySelector(".text").classList.toggle(lineThrough);
  list[element.id].done = list[element.id].done ? false : true;
}

 function removeToDo(element){
   element.parentNode.parentNode.removeChild(element.parentNode);
   list[element.id].trash = true;
 }

list.addEventListener("click",function(event){
  let element = event.target;
  const elementJob = event.target.attributes.job.value;
  if(elementJob == "complete"){
    completeToDo(element);
  } else if(elementJob == "delete"){
    removeToDo(element);
  }
});

// localStorage.setItem('key','value');
// let variable = localStorage.getItem('key');

// localStorage.setItem("TODO", JSON.stringify(list));

// let list, id;
// let data = localStorage.getItem("TODO");
// if (data){
//   list = JSON.parse(data);
//   loadToDo(list);
//   id = list.length;
// } else {
//   list = [];
//   id = 0;
// }

// clear.addEventListener('click', function(){
//   localStorage.clear();
//   location.reload();
// })

let options = {weekday: 'long', month: 'short', day: 'numeric'};
let today = new Date();
dateElement.innerHTML = today.toLocaleDateString("en-US", options)