import React, { useRef } from 'react'

interface NewAddTodo {
    onAddTodo: (todoText:string )=> void;
}

const NewTodo:React.FC<NewAddTodo> = props => {
    const textInputRef=useRef<HTMLInputElement>(null);

    const todoSubmitHandler = (event:React.FormEvent)=>{
        event.preventDefault();
        const enteredText = textInputRef.current!.value;
        textInputRef.current!.value = ""; 
        props.onAddTodo( enteredText)
    }


  return (
    <form onSubmit={todoSubmitHandler}>
        <div>
            <label htmlFor='todo-text'>Todo Text</label>
            <input type='text' id='todo-text' ref={textInputRef}/>
        </div>
        <button type='submit'>Add todo</button>
    </form>
  )
}

export default NewTodo