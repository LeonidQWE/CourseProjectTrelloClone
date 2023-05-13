import { buildTemplateTodo, buildCountersTemplateTodo, buildCountersTemplateInProgress, buildCountersTemplateDone } from './templates.js';
import { selectUserElement, createUserElement } from './app.js';

const url = 'https://jsonplaceholder.typicode.com/users'

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

// Print Users from JSON Aplication
function printUsers (infoAboutUsers) {
  infoAboutUsers.forEach((item) => {
    selectUserElement.innerHTML += `<option value="${item.name}">${item.name}</option>`
    createUserElement.innerHTML += `<option value="${item.name}">${item.name}</option>`
  })
}

export { render, renderCounters, getData, setData, getUsers, printUsers }
