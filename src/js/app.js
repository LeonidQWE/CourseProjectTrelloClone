import { Modal } from 'bootstrap'
import { Todo } from './constructor.js'

// Variables
let todos = getData()
const url = 'https://jsonplaceholder.typicode.com/users'
const modalFormElement = document.querySelector('#modalForm')
const inputTitleElement = document.querySelector('#inputTitle')
const inputDescriptionElement = document.querySelector('#inputDescription')
const selectUserElement = document.querySelector('#selectUser')
const colorElement = document.querySelector('#color')
const todoListElement = document.querySelector('#todoList')
const inProgressListElement = document.querySelector('#inProgressList')
const doneListElement = document.querySelector('#doneList')
const todoWrapperElement = document.querySelector('#todoWrapper')
const inProgressWrapperElement = document.querySelector('#inProgressWrapper')
const doneWrapperElement = document.querySelector('#doneWrapper')
const todosContainerElement = document.querySelector('#todosContainer')
const timeElemetn = document.querySelector('#time')
const deleteAllElement = document.querySelector('#deleteAll')
// --------------Variables Create Modal Window
const createInputTitleElement = document.querySelector('#createInputTitle')
const createDescriptionelement = document.querySelector('#createDescription')
const createColorElement = document.querySelector('#createColor')
const createUserElement = document.querySelector('#createUser')
const createIdElement = document.querySelector('#createId')
const createStatusElement = document.querySelector('#createStatus')
const createDateElement = document.querySelector('#createDate')
const createModalFormElement = document.querySelector('#createModalForm')

// Listeners
modalFormElement.addEventListener('submit', handleSubmitForm)
todosContainerElement.addEventListener('click', handleClickDelete)
window.addEventListener('beforeunload', handleBeforeUnload)
todosContainerElement.addEventListener('change', handleChangeStatus)
deleteAllElement.addEventListener('click', handleClickDeleteAll)
todosContainerElement.addEventListener('click', handleClickEdit)
createModalFormElement.addEventListener('submit', handleSubmitCreateForm)

// Init
render(todos, todoListElement, inProgressListElement, doneListElement)
renderCounters (todos, todoWrapperElement, inProgressWrapperElement, doneWrapperElement)

// Handlers
// Add Todo
function handleSubmitForm (event) {
  event.preventDefault()

  const title = inputTitleElement.value
  const description = inputDescriptionElement.value
  const user = selectUserElement.value
  const color = colorElement.value

  const todo = new Todo (title, description, user, color)
  todos.push(todo)
  render(todos, todoListElement, inProgressListElement, doneListElement)
  renderCounters (todos, todoWrapperElement, inProgressWrapperElement, doneWrapperElement)
  modalFormElement.reset()
}

// Delete Todo
function handleClickDelete (event) {
  const {target} = event
  const {role, id} = target.dataset      // data-role и data-id - присваиваемые атрибуты

  if (role == 'delete') {
    todos = todos.filter((item) => item.id != id)
    render(todos, todoListElement, inProgressListElement, doneListElement)
    renderCounters (todos, todoWrapperElement, inProgressWrapperElement, doneWrapperElement)
  }
}

// Set Todo in Local Storage
function handleBeforeUnload () {
  setData(todos)
}

// Todo Status
function handleChangeStatus (event) {
  const { target } = event
  const { role, id } = target.dataset
  let countInProgressTodo = 0

  todos.forEach((item) => {
    if (item.status == 'inProgress') {
      countInProgressTodo++
    }
  })

  if (role == 'select' && countInProgressTodo == 6 && target.value == 'inProgress') {
    alert('There are too many cases in progress (more than 6). Make them first.')

    // Делаем так, чтобы селект не менялся на in progress, когда в процессе 6 дел
    todos.forEach((item) => {
      if (item.status == 'newTodo') {
        target.value = 'newTodo'
      }
      if (item.status == 'done') {
        target.value = 'done'
      }
    })
    return
  } else {
    if (role == 'select') {
      todos.forEach((item) => {
        if (item.id == id) {
          item.status = target.value
        }
      })

      render(todos, todoListElement, inProgressListElement, doneListElement)
      renderCounters (todos, todoWrapperElement, inProgressWrapperElement, doneWrapperElement)
    }
  }
}

// Delete all Done Todo
function handleClickDeleteAll () {
  const question = confirm('Are you sure you want to delete all done todos?')

  if (question) {
    todos = todos.filter((item) => item.status != 'done')

    render(todos, todoListElement, inProgressListElement, doneListElement)
    renderCounters (todos, todoWrapperElement, inProgressWrapperElement, doneWrapperElement)
  }
}

// Edit Todo
function handleClickEdit (event) {
  const {target} = event
  const {role, id} = target.dataset

  if (role == 'edit') {
    todos.forEach((item) => {
      if (item.id == id) {
        console.log(item)
        createInputTitleElement.value = item.title
        createDescriptionelement.value = item.description
        createColorElement.value = item.bgcolor
        createUserElement.value = item.user
        createIdElement.value = item.id
        createStatusElement.value = item.status
        createDateElement.value = item.date
      }
    })
  }
}

// Add Create Todo
function handleSubmitCreateForm (event) {
  event.preventDefault()

  const title = createInputTitleElement.value
  const description = createDescriptionelement.value
  const user = createUserElement.value
  const color = createColorElement.value
  const id = createIdElement.value
  const status = createStatusElement.value
  const date = createDateElement.value

  todos = todos.filter((item) => item.id != id)
  const todo = new Todo (title, description, user, color, id, date, status)
  todos.push(todo)
  render(todos, todoListElement, inProgressListElement, doneListElement)
  renderCounters (todos, todoWrapperElement, inProgressWrapperElement, doneWrapperElement)
  modalFormElement.reset()
}

// Time
setInterval (() => {
  let timer = new Date().toLocaleTimeString()
  timeElemetn.innerHTML = timer
}, 100)

// render
function render (data, containerTodo, containerInProgress, containerDone) {
  let newTemplates = ''
  let inProgressTemplates = ''
  let doneTemplates = ''

  data.forEach((item) => {
    const template = buildTemplateTodo (item)
    if (item.status == 'newTodo') {
      newTemplates += template
    }

    if (item.status == 'inProgress') {
      inProgressTemplates += template
    }

    if (item.status == 'done') {
      doneTemplates += template
    }
  })

  containerTodo.innerHTML = newTemplates
  containerInProgress.innerHTML = inProgressTemplates
  containerDone.innerHTML = doneTemplates
}

// Render Counters
function renderCounters (collection, wrapperTodo, wrapperInProgress, wrapperDone) {
  let create = 0
  let progress = 0
  let made = 0

  collection.forEach((item) => {
    if (item.status == 'newTodo') {
      create++
    }

    if (item.status == 'inProgress') {
      progress++
    }

    if (item.status == 'done') {
      made++
    }
  })

  const templateTodo = buildCountersTemplateTodo(create)
  const templateInProgress = buildCountersTemplateInProgress(progress)
  const templateDone = buildCountersTemplateDone(made)

  wrapperTodo.innerHTML = templateTodo
  wrapperInProgress.innerHTML = templateInProgress
  wrapperDone.innerHTML = templateDone
}

// Draw card
function buildTemplateTodo (todo) {
  const date = new Date(todo.date).toLocaleString()
  const statusNewTodo = todo.status == 'newTodo' ? 'selected' : ''
  const statusInProgress = todo.status == 'inProgress' ? 'selected' : ''
  const statusDone = todo.status == 'done' ? 'selected' : ''
  return `
    <div class="todo" id="${todo.id}" style="background-color: ${todo.bgcolor};">
      <div class="todo__control">
        <button class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#createModal" data-role="edit" data-id="${todo.id}">Edit</button>
        <button class="btn btn-danger" data-role="delete" data-id="${todo.id}">Delete</button>
        <select class="form-select form-select-lg" data-role="select" data-id="${todo.id}">
          <option value="newTodo" ${statusNewTodo}>Todo</option>
          <option value="inProgress" ${statusInProgress}>In progress</option>
          <option value="done" ${statusDone}>Done</option>
        </select>
      </div>
      <div class="todo__title"><b>Title :</b> <br>${todo.title}</div>
      <div class="todo__description"><b>Description :</b> <br>${todo.description}</div>
      <div class="todo__info">
          <div class="todo__user">User: ${todo.user}</div>
          <div class="todo__time">${date}</div>
        </div>
      </div>
  `
}

function buildCountersTemplateTodo (allNewTodos) {
  return `
  <span class="todo-list__name">todo :</span>
  <span class="todo-list__quantity">${allNewTodos}</span>
  `
}

function buildCountersTemplateInProgress (allInProgressTodos) {
  return `
  <span class="todo-list__name">in progress:</span>
  <span class="todo-list__quantity">${allInProgressTodos}</span>
  `
}

function buildCountersTemplateDone (allDoneTodos) {
  return `
  <span class="todo-list__name">done :</span>
  <span class="todo-list__quantity">${allDoneTodos}</span>
  `
}

// Get Data from Local Storage
function getData () {
  return JSON.parse(localStorage.getItem('todos')) || []
}

// Set Data in Local Storage
function setData (source) {
  localStorage.setItem('todos', JSON.stringify(source))
}

// Get users from JSON Aplication
async function getUsers () {
  const response = await fetch(url)
  const infoAboutUsers = await response.json()
  return infoAboutUsers
}

function printUsers (infoAboutUsers) {
  infoAboutUsers.forEach((item) => {
    selectUserElement.innerHTML += `<option value="${item.name}">${item.name}</option>`
    createUserElement.innerHTML += `<option value="${item.name}">${item.name}</option>`
    console.log(item.name)
  })
}

;(async () => {
  const infoAboutUsers = await getUsers()
  printUsers(infoAboutUsers)
})()
