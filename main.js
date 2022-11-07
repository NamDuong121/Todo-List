const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".footer button");

inputBox.onkeyup = () => {
  let userEnteredValue = inputBox.value;

  userEnteredValue.trim() != 0
    ? addBtn.classList.add("active")
    : addBtn.classList.remove("active");
};

showTasks();

addBtn.onclick = () => {
  let userEnteredValue = inputBox.value;

  let getLocalStorageData = localStorage.getItem("New todo");

  getLocalStorageData === null
    ? (listArray = [])
    : (listArray = JSON.parse(getLocalStorageData));

  listArray.push(userEnteredValue);
  localStorage.setItem("New todo", JSON.stringify(listArray));

  showTasks();
  addBtn.classList.remove("active");
};

function showTasks() {
  let getLocalStorageData = localStorage.getItem("New todo");

  getLocalStorageData === null
    ? (listArray = [])
    : (listArray = JSON.parse(getLocalStorageData));

  const pendingTasksNumber = document.querySelector(".pendingTasks");

  pendingTasksNumber.textContent = listArray.length;

  listArray.length > 0
    ? deleteAllBtn.classList.add("active")
    : deleteAllBtn.classList.remove("active");

  let newLiTag = "";

  listArray.forEach((element, index) => {
    newLiTag += ` <li>${element}<span class="icon" onclick="deleteTask(${index})"> <i class="fa-solid fa-trash"></i></span></li>`;
  });

  todoList.innerHTML = newLiTag;

  inputBox.value = "";
}

function deleteTask(index) {
  let getLocalStorageData = localStorage.getItem("New todo");
  listArray = JSON.parse(getLocalStorageData);

  listArray.splice(index, 1);
  localStorage.setItem("New todo", JSON.stringify(listArray));

  showTasks();
}

deleteAllBtn.onclick = () => {
  listArray = [];
  localStorage.setItem("New todo", JSON.stringify(listArray));
  showTasks();
};
