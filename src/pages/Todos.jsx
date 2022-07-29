import React, { Component } from 'react'
import Todo from '../components/Todo'
import './Todos.css'

export default class Todos extends Component{
    state = {
      todos: [],
      completed: [],
      updating: "",
      task: "",
      searchTodos: "",
      update: ""
    }

    async componentDidMount() {
      try {
        let jwt = localStorage.getItem('token')
        let displayTodos = []
        let fetchTodosResponse = await fetch("/api/todos/get", {
          method: "GET",
          headers: { "Content-Type": "application/json", "Authorization": 'Bearer: ' + jwt}
      })
      let allTodos = await fetchTodosResponse.json()
      allTodos.map((todo) =>{
        displayTodos.push(todo)
      })
      this.setState({todos: displayTodos})
      } catch (err) {
        console.error("ERROR:", err)
      }
    }

    handleLogOut = async () => {
      localStorage.removeItem('token')
      this.props.setUserInState(null)
    }

    handleChange = (e) => {
      this.setState({[e.target.name]: e.target.value});
    }

    edit = (id) => {
      this.setState({updating: id})
    }

    cancel = () => {
      this.setState({updating: ""})
    }

    update = async (e) => {
      e.preventDefault()
      let jwt = localStorage.getItem('token')
      let fetchResponse = await fetch("/api/todos/update/" + this.state.updating, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": 'Bearer: ' + jwt },
        body: JSON.stringify({ task: this.state.update })
      })
      let serverResponse = await fetchResponse.json()
      this.componentDidMount()
      this.setState({updating: "", update: ""})
    }

    create = async (e) => {
      e.preventDefault()
      let jwt = localStorage.getItem('token')
      let fetchResponse = await fetch("/api/todos/add", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": 'Bearer: ' + jwt },
        body: JSON.stringify({ task: this.state.task })
      });
      let serverResponse = await fetchResponse.json()
      this.componentDidMount()
      // let displayTodos = this.state.todos
      // displayTodos.push(serverResponse)
      // this.setState({todos: displayTodos})
    }

    search = async (e) => {
      e.preventDefault()
      try {
        let jwt = localStorage.getItem('token')
        let displayTodos = []
        let fetchTodosResponse = await fetch("/api/todos/search", {
          method: "POST",
          headers: { "Content-Type": "application/json", "Authorization": 'Bearer: ' + jwt },
          body: JSON.stringify({search: this.state.searchTodos})
      })
      let allTodos = await fetchTodosResponse.json()
      allTodos.map((todo) =>{
        displayTodos.push(todo)
      })
      this.setState({todos: displayTodos})
      } catch (err) {
        console.error("ERROR:", err)
      }
    }

    deleteOne = async (ident) => {
      try {
        let jwt = localStorage.getItem('token')
        let fetchTodosResponse = await fetch("/api/todos/delete", {
          method: "POST",
          headers: { "Content-Type": "application/json", "Authorization": 'Bearer: ' + jwt},
          body: JSON.stringify({deleteTodos: ident})
      })
      let result = await fetchTodosResponse.json()
      let displayTodos = this.state.todos
      let completedTodos = this.state.completed
      displayTodos = displayTodos.filter(todo => todo._id != ident)
      completedTodos = completedTodos.filter(todo => todo != ident)
      this.setState({todos: displayTodos, completed: completedTodos})
      } catch (err) {
        console.error("ERROR:", err)
      }
    }

    deleteMultiple = async (e) => {
      e.preventDefault()
      try {
        let jwt = localStorage.getItem('token')
        let fetchTodosResponse = await fetch("/api/todos/delete", {
          method: "POST",
          headers: { "Content-Type": "application/json", "Authorization": 'Bearer: ' + jwt },
          body: JSON.stringify({deleteTodos: this.state.completed})
      })
      let result = await fetchTodosResponse.json()
      let displayTodos = this.state.todos
      let completedTodos = this.state.completed
      displayTodos = displayTodos.filter(todo => !completedTodos.includes(todo._id))
      this.setState({todos: displayTodos, completed: []})
      } catch (err) {
        console.error("ERROR:", err)
      }
    }

    deleteAll = async (e) => {
      e.preventDefault()
      try {
        let jwt = localStorage.getItem('token')
        let fetchTodosResponse = await fetch("/api/todos/delete", {
          method: "POST",
          headers: { "Content-Type": "application/json", "Authorization": 'Bearer: ' + jwt },
          body: JSON.stringify({deleteTodos: this.state.todos})
      })
      let result = await fetchTodosResponse.json()
      this.setState({todos: [], completed: []})
      } catch (err) {
        console.error("ERROR:", err)
      }
    }

    complete = (id) => {
      let completedTodos = this.state.completed
      if (completedTodos.includes(id)){
        let idx = completedTodos.indexOf(id)
        completedTodos.splice(idx, 1)
      }
      else
        completedTodos.push(id)
      this.setState({completed: completedTodos})
      console.log(this.state.completed)
    }

    render(){
      return (
        <div className="App h-screen">
          <div className="flex justify-between h-28 border-b-2 border-black">
            <h1 className='text-5xl font-semibold m-auto'>TO-DOS</h1>
        </div>
          <div className="w-1/3 h-2/3 m-auto p-10">
            <form autoComplete='off' onSubmit={this.create}>
              <div className="flex">
                <label>TASK:</label>
                <input name="task" type="text" className="border-b border-black ml-2 w-full bg-inherit focus:outline-none" onChange={this.handleChange}></input>
              </div>
              <button type="submit" className="text-sm bg-indigo-300 border border-0 rounded border-black flex my-5 px-5 py-1 transition ease-linear duration-150 hover:bg-lime-300" >ADD</button>
            </form>
            <form autoComplete='off' onSubmit={this.search}>
              <div className="flex">
                <label>SEARCH:</label>
                <input name="searchTodos" type="text" className="border-b border-black ml-2 bg-inherit w-full focus:outline-none" onChange={this.handleChange}></input>
              </div>
              <button className="text-sm bg-indigo-300 border border-0 rounded border-black px-5 py-1 flex my-5 transition ease-linear duration-150 hover:bg-orange-400" >FIND</button>
            </form>
            <div className="bg-indigo-300 border border-0 rounded-2xl border-black w-7/8 h-3/5 mx-auto my-10 overflow-auto">
              {this.state.todos.map((todo) => (
                <Todo 
                  object={todo} 
                  complete={this.complete} 
                  updating={this.state.updating.includes(todo._id)} 
                  done={this.state.completed.includes(todo._id)} 
                  del={this.deleteOne} edit={this.edit} 
                  cancel={this.cancel}
                  update={this.update}
                  handleChange={this.handleChange} 
                />
              ))}
            </div>
            <div className="flex justify-between">
              <button className="text-sm bg-indigo-300 border border-0 rounded border-black px-5 py-1 transition ease-linear duration-150 hover:bg-red-600" onClick={this.deleteMultiple}>DELETE</button>
              <button className="text-sm bg-indigo-300 border border-0 rounded border-black px-5 py-1 float-right transition ease-linear duration-150 hover:bg-red-600" onClick={this.deleteAll}>DELETE ALL</button>
            </div>
          </div>
          <button className="mx-auto my-36 p-2 bg-indigo-300 border border-0 rounded border-black transition ease-linear duration-150 hover:bg-slate-200" onClick={this.handleLogOut}>SIGN OUT</button>
        </div>
      );
    }
}