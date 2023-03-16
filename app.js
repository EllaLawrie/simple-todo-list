const newItemInput = document.getElementById('new-item')
const addBtn = document.getElementById('add-btn')
const todoList = document.getElementById('todo-list')

let todos = []

if (localStorage.getItem('todos')) {
  todos = JSON.parse(localStorage.getItem('todos'))
  renderTodoList()
}

addBtn.addEventListener('click', addItem)

function addItem() {
  const newItem = newItemInput.value.trim()
  if (newItem === '') {
    return
  }
  todos.unshift(newItem)
  renderTodoList()
  newItemInput.value = ''
  localStorage.setItem('todos', JSON.stringify(todos))
}

// Function to remove an item from the todo list
function removeItem(index) {
  todos.splice(index, 1)
  renderTodoList()
  localStorage.setItem('todos', JSON.stringify(todos))
}

// Function to edit an item in the todo list
function editItem(index, newValue) {
  todos[index] = newValue
  renderTodoList()
  localStorage.setItem('todos', JSON.stringify(todos))
}

// Function to render the todo list
function renderTodoList() {
  todoList.innerHTML = ''
  for (let i = 0; i < todos.length; i++) {
    const listItem = document.createElement('li')
    const itemText = document.createElement('span')
    const editBtn = document.createElement('button')
    const deleteBtn = document.createElement('button')

    itemText.textContent = todos[i]
    itemText.classList.add('item-text')
    editBtn.textContent = 'Edit'
    editBtn.classList.add('edit-btn')
    editBtn.setAttribute('data-index', i)
    deleteBtn.textContent = 'Delete'
    deleteBtn.classList.add('delete-btn')
    deleteBtn.setAttribute('data-index', i)
    listItem.classList.add('todo-item')

    editBtn.addEventListener('click', editItemModal)
    deleteBtn.addEventListener('click', deleteItem)

    const firstDiv = document.createElement('div')
    const secondDiv = document.createElement('div')
    firstDiv.appendChild(itemText)
    secondDiv.appendChild(editBtn)
    secondDiv.appendChild(deleteBtn)
    listItem.appendChild(firstDiv)
    listItem.appendChild(secondDiv)
    // listItem.appendChild(itemText)
    // listItem.appendChild(editBtn)
    // listItem.appendChild(deleteBtn)
    todoList.appendChild(listItem)
  }
}

// Function to display a modal for editing an item
function editItemModal() {
  const index = this.getAttribute('data-index')
  const modal = document.createElement('div')
  modal.classList.add('modal')
  const form = document.createElement('form')
  const input = document.createElement('input')
  const submitBtn = document.createElement('button')
  const editHeading = document.createElement('h2')

  input.type = 'text'
  input.value = todos[index]
  editHeading.textContent = 'Edit Item'
  submitBtn.type = 'submit'
  submitBtn.textContent = 'Save'

  form.addEventListener('submit', function (event) {
    event.preventDefault()
    const newValue = input.value.trim()
    if (newValue !== '') {
      editItem(index, newValue)
      document.body.removeChild(modal)
    }
  })

  form.appendChild(editHeading)
  form.appendChild(input)
  form.appendChild(submitBtn)
  modal.appendChild(form)

  document.body.appendChild(modal)
}

// Function to handle deleting an item
function deleteItem() {
  const index = this.getAttribute('data-index')
  removeItem(index)
}
