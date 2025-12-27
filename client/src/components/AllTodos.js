import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Todo from './Todo';
import Input from "./Input";

function AllTodos() {
    const { todos } = useSelector((state) => state.todo);
    const filters = {
      ALL:'All',
      COMPLETED: 'Completed',
      PENDING: 'Pending' 
    }
    const [filter, setFilter] = useState(filters[0]);
    const [search, setSearch] = useState("");

    const filteredTodos = todos.filter((todo) => {
      if(filter === filters.COMPLETED && !todo.isCompleted) return false;
      if(filter === filters.PENDING && todo.isCompleted) return false;
      
      if(search && !todo.name.toLowerCase().includes(search.toLowerCase()))
        return false;
      return true;
    });
  return (
    <div>
        <h1 className='text-center text-2xl font-bold'>All Todos</h1>
        
        {/* Search */}
        <Input placeholder='Search todos...' value={search} onChange={(e) => setSearch(e.target.value)} />
        
        {/* Filter buttons */}
        <div className='flex justify-center gap-3 my-4'>
          {Object.values(filters).map((filterItem) => (<button key={filterItem} onClick={() => setFilter(filterItem)} className={filter === filterItem ? "bg-indigo-600 text-white px-3 py-1 rounded"
    : "bg-gray-200 px-3 py-1 rounded"}>{filterItem}</button>))}
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