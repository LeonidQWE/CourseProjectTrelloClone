// Class
class Todo {
  constructor (title, description, user, color, id = crypto.randomUUID(), date = new Date().toISOString(), status = 'newTodo') {
    this.id = id
    this.title = title
    this.description = description
    this.bgcolor = color
    this.user = user
    this.date = date
    this.status = status
  }
}

export {Todo}
