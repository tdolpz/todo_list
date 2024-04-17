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
      p.classList.remove("done");
      p.children[0].checked = false;
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
      p.children[1].removeAttribute("contenteditable");
      p.children[2].classList.remove("hide"); // show edit btn
      this.classList.add("hide"); // hide save btn
    };
  }
}

function resolveTask() {
  for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].onclick = function () {
      let p = this.parentElement;
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
    <input type="checkbox" class="checkbox" />
    <div class="task-item-text">${newTaskInput.value}</div>
    <button class="edit-btn">Edit</button>
    <button class="save-btn hide">Save</button>
    <button class="remove-btn">Remove</button>`;
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
