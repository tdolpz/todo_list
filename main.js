const newTaskInput = document.getElementById("newTaskInput");
const newTaskAddBtn = document.getElementById("newTaskAddBtn");
const todoList = document.getElementById("todoList");

const checkboxes = document.getElementsByClassName("checkbox");
const editButtons = document.getElementsByClassName("edit-btn");
const saveButtons = document.getElementsByClassName("save-btn");
const removeButtons = document.getElementsByClassName("remove-btn");

function removeTask() {
  for (let i = 0; i < removeButtons.length; i++) {
    removeButtons[i].onclick = function () {
      let p = this.parentElement;
      p.remove();
    };
  }
}

function editTask() {
  for (let i = 0; i < editButtons.length; i++) {
    editButtons[i].onclick = function () {
      let p = this.parentElement;
      //p.classList.remove("done");
      //p.children[0].children[0].checked = false;
      p.children[1].setAttribute("contenteditable", true);
      p.children[1].focus();
      p.children[3].classList.remove("hide"); // show save btn
      this.classList.add("hide"); // hide edit btn
    };
  }
}

function saveTask() {
  for (let i = 0; i < saveButtons.length; i++) {
    saveButtons[i].onclick = function () {
      let p = this.parentElement;
      p.children[0].children[0].checked = false;
      p.classList.remove("done");
      p.children[1].removeAttribute("contenteditable");
      p.children[2].classList.remove("hide"); // show edit btn
      this.classList.add("hide"); // hide save btn
    };
  }
}

function resolveTask() {
  for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].onclick = function () {
      let p = this.parentElement.parentElement;
      // note: use 'this', not checkboxes[i] inside function body
      this.checked ? p.classList.add("done") : p.classList.remove("done");
      p.children[1].removeAttribute("contenteditable");
      p.children[2].classList.remove("hide"); // show edit btn
      p.children[3].classList.add("hide"); // hide save btn*/
    };
  }
}

function newTask() {
  if (newTaskInput.value !== "") {
    let li = document.createElement("li");
    li.classList.add("task-item");
    li.innerHTML = `
    <div class="chkbox-wrap"><input type="checkbox" class="checkbox" /></div>
    <div class="task-item-text">${newTaskInput.value}</div>
    <button class="edit-btn"><svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 24 24"><path fill="currentColor" d="M5.38 6.808H18.6l-1.33-1.596q-.097-.097-.222-.154Q16.923 5 16.788 5H7.192q-.134 0-.26.058t-.22.154zM10 12.962l2-1l2 1V7.808h-4zM5.615 20q-.67 0-1.143-.472Q4 19.056 4 18.385V7.487q0-.293.093-.55t.28-.475L5.931 4.59q.217-.292.543-.441t.7-.149h9.614q.374 0 .71.149t.552.441l1.577 1.91q.186.217.28.485t.093.56v2.32q-.275.02-.518.066q-.244.046-.482.136v-2.26h-4v5.856l-.617.618L12 13.096l-3 1.5V7.808H5v10.577q0 .269.173.442t.442.173h6.231v1zM15 7.808h4zm-10 0h9.383zM14.23 20v-2.21l5.333-5.307q.149-.148.308-.2q.16-.052.32-.052q.165 0 .334.064t.298.193l.925.945q.123.148.188.307t.064.32t-.062.322t-.19.31L16.44 20zm6.885-5.94l-.925-.945zm-6 5.055h.95l3.468-3.473l-.47-.475l-.455-.488l-3.493 3.486zm3.948-3.948l-.455-.488l.925.963z"/></svg></button>
    <button class="save-btn hide"><svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 24 24"><path fill="currentColor" d="m10.925 13.8l4.963-4.938l-.713-.714l-4.25 4.25L8.8 10.273l-.708.708zm-9.156 5.662v-1h20.462v1zm1.231-2v-13h18v13zm1-1h16v-11H4zm0 0v-11z"/></svg></button>
    <button class="remove-btn"><svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 24 24"><path fill="currentColor" d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zM9 17h2V8H9zm4 0h2V8h-2zM7 6v13z"/></svg></button>`;
    todoList.prepend(li);
    newTaskInput.value = "";
  }
}

newTaskAddBtn.addEventListener("click", () => {
  newTask();
  removeTask();
  resolveTask();
  editTask();
  saveTask();
});
