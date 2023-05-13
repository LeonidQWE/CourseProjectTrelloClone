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

export {buildTemplateTodo, buildCountersTemplateTodo, buildCountersTemplateInProgress, buildCountersTemplateDone}
