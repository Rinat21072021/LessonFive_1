import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";
type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
type TasksType = { [key: string]: Array<TaskType> }

function App() {
    let todolist_1 = v1()
    let todolist_2 = v1()
    let [todoLists, setTodoLists] = useState<Array<TodolistType>>([
        {id: todolist_1, title: "What to learn", filter: "all"},
        {id: todolist_2, title: "What to buy", filter: "all"}
    ])
    let [tasks, setTasks] = useState<TasksType>({
        [todolist_1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolist_2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "book", isDone: true},
            {id: v1(), title: "book-ReactJS", isDone: false},
            {id: v1(), title: "book-Rest API", isDone: false}
        ]
    })

    function removeTask(todolistID:string,id: string) {
      let remove=tasks[todolistID]
        tasks[todolistID]=remove.filter(f=>f.id!==id)
        setTasks({...tasks})
    }
    function addTask(todolistID:string,title: string) {
        setTasks({...tasks,[todolistID]:[...tasks[todolistID],{id: v1(), title: title, isDone: false}]})
        // let task = {id: v1(), title: title, isDone: false};
        // let newTasks = [task, ...tasks];
        // setTasks(newTasks);
    }

    function changeStatus(todolistID:string,taskId: string, isDone: boolean) {
        setTasks({...tasks,[todolistID]:tasks[todolistID].map(m=>m.id===taskId?{...m, isDone:isDone}: m)})

    }


    function changeFilter(todolistID:string, value: FilterValuesType) {
      setTodoLists(todoLists.map(m=>m.id===todolistID ? {...m,filter:value}: m))
        }



    return (
        <div className="App">
            {todoLists.map(mt => {
                let tasksForTodolist = tasks[mt.id];

                if (mt.filter === "active") {
                    tasksForTodolist = tasks[mt.id].filter(t => t.isDone === false);
                }
                if (mt.filter === "completed") {
                    tasksForTodolist = tasks[mt.id].filter(t => t.isDone === true);
                }
                return (<Todolist
                    key={mt.id}
                    todolistID={mt.id}
                    title={mt.title}
                    tasks={tasksForTodolist}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeStatus}
                    filter={mt.filter}
                />)

            })}

        </div>
    );
}

export default App;
