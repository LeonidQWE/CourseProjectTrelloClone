// Constructor
function Todo (title, description, user, color, id = new Date().getTime(), date = new Date().toISOString(), status = 'newTodo') {
  this.id = id
  this.title = title
  this.description = description
  this.bgcolor = color
  this.user = user
  this.date = date
  this.status = status
}

export {Todo}
