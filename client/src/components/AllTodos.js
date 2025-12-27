import React, { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import Todo from './Todo';
import Input from "./Input";

function AllTodos() {
    const { todos } = useSelector((state) => state.todo);
    const counts = useMemo(()=> {
      const completed = todos.filter(todo => todo.isCompleted).length;
      const pending = todos.length - completed;
      return {
        all: todos.length,
        completed,
        pending
      }
    }, [todos]);
    const filters = [
      {key:"all", label: "All", count: counts.all},
      {key:"completed", label: "Completed", count: counts.completed},
      {key:"pending", label: "Pending", count: counts.pending},
    ]
    const [filter, setFilter] = useState(filters[0].key);
    const [search, setSearch] = useState("");

    const filteredTodos = useMemo(() => {
      return todos.filter((todo) => {
      if(filter === "completed" && !todo.isCompleted) return false;
      if(filter === "pending" && todo.isCompleted) return false;
      
      if(search && !todo.name.toLowerCase().includes(search.toLowerCase()))
        return false;
      return true;
    });
  }, [filter, todos, search]);
  return (
    <div>
        <h1 className='text-center text-2xl font-bold'>All Todos</h1>
        
        {/* Search */}
        <Input placeholder='Search todos...' value={search} onChange={(e) => setSearch(e.target.value)} />
        
        {/* Filter buttons */}
        <div className='flex justify-center gap-3 my-4'>
          {filters.map(({key, label, count}) => (
            <button 
            key={key} 
            onClick={() => setFilter(key)} 
            className={filter === key ? "bg-indigo-600 text-white px-3 py-1 rounded"
    : "bg-gray-200 px-3 py-1 rounded"}>{label} ({count})</button>))}
        </div>
        <div className='h-[250px] overflow-y-auto space-y-2'>
        {filteredTodos.length === 0 && (
          <p className='text-center text-gray-500'>No todos found</p>
        )}
            {filteredTodos.map((todoItem) => (<Todo key={todoItem._id} todo={todoItem} search={search} />))}
        </div>
    </div>
  )
}

export default AllTodos