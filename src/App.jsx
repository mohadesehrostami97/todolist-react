import "./App.css"
import Header from "./components/Header/Header"
import Todo from "./components/Todo/Todo"
import AddTodoModal from "./components/AddTodoModal/AddTodoModal"
import { useState } from "react"
import Notodos from "./components/NoTodos/Notodos"
function App() {
  const [isddModalOpen , setIsAddModalOpen] = useState(false)
  const [todos , setTodos] = useState([])
  const [Filter , setFilter] = useState("All")

  const addTodo = (title , description , isImportant)=>{
    const newTodo = 
    {
      id : crypto.randomUUID(),
      title ,
      description,
      isImportant,
      isCompleted : false
    }

    setTodos([...todos , newTodo])
    setIsAddModalOpen(false)
  }

  const doTodo = (id) =>{
    const completedTodo = todos.map((todo)=>{
      if(todo.id === id){
        todo.isCompleted = true
      }
      return todo
    })
    setTodos(completedTodo)
  }

  const removeTodo = (id) =>{
    const updatedTodos = todos.filter((todo)=>{
      todo.id !== id
    })
    setTodos(updatedTodos)
  }

  const filterdTodos = ()=>{
    if(Filter === "All") return todos

    if(Filter === "completed") return todos.filter((todo)=> todo.isCompleted)

    return todos.filter((todo)=> todo.isCompleted)
  }

  return (
    <>
    <Header/>
       <main className="container pb-25">
        <div id="headline" className="space-y-3">
          <h1 className="title">
            <img src="./public/images/hourglass.png" className="size-8" />
            <span> مدیریت و برنامه ریزی </span>
          </h1>
          <p className="max-w-[750px] text-zinc-700 text-sm font-Vazir-Medium">
            تسک ابزاری قدرتمند برای سازماندهی وظایف روزمره، برنامه‌ریزی
            پروژه‌ها و افزایش بهره‌وری شماست. با رابط کاربری ساده و امکانات
            پیشرفته، از پیگیری وظایف تا همکاری تیمی را به آسانی مدیریت کنید.
          </p>
        </div>

        <div
          className="mt-14 border-b w-full border-zinc-200 flex items-center py-3 justify-between"
        >
          <div></div>
          <div className="flex items-center gap-2">
            <div className="dropdown">
              <input id="dd-toggle" type="checkbox" hidden />

              <label className="dd-btn" htmlFor="dd-toggle">
                <span>نمایش {" "}
                  {Filter ===  "All" ? "همه" : Filter === "completed" ? "تکمیل شده ها" : "تکمیل نشده ها"}
                </span>
                <i className="fa-solid fa-chevron-down"></i>
              </label>

              <div className="dropdown_menu" role="menu">
                
                <div className="py-1">
                  <label htmlFor="dd-toggle" onClick={()=>setFilter("All")} className="menu-item">همه</label>
                  <label htmlFor="dd-toggle" onClick={()=>setFilter("completed")} className="menu-item">تکمیل شده ها</label>
                  <label htmlFor="dd-toggle" onClick={()=>setFilter("not-Completed")} className="menu-item"
                    >در انتظار انجام</label
                  >
                </div>
              </div>
            </div>

            <button id="open-dialog" onClick = {()=>{setIsAddModalOpen(true)}}>
              <span> ایجاد جدید </span>
              <div className="btn-divider"></div>
              <span>
                <i className="fa-solid fa-plus"></i>
              </span>
            </button>
          </div>
        </div>

        {todos.length ? 
        <section id="tasks" className="space-y-30 mt-5">
          <div className="space-y-5">
            <p className="text-sm">تسک های موجود:</p>
            {filterdTodos().map((todo)=>(
              <Todo key={todo.id} {...todo} ondo = {doTodo}  onRemove ={removeTodo}/>
            ))}
          </div>
          <div className="space-y-5">
            <p className="text-sm">تسک‌های تکمیل‌شده</p>
            {todos.filter((todo)=> todo.isCompleted).length ? 
             (todos.filter((todo)=> todo.isCompleted).map((todo)=>
             <Todo key={todo.id} {...todo} ondo = {doTodo}  onRemove ={removeTodo}/>
            )):
            <Notodos/> 
            }          
          </div>
        </section> :
        <Notodos/>
        }
      </main>
      {isddModalOpen && <AddTodoModal onClose = {()=>{setIsAddModalOpen(false)}}  addHandler = {addTodo}/>}
     
    </>
   
  )
}

export default App
