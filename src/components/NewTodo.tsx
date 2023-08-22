import React, { useRef } from 'react';
import './NewTodo.css';

interface NewAddTodo {
    onAddTodo: (name: string, description: string) => void;
}

const NewTodo: React.FC<NewAddTodo> = (props) => {
    const nameInputRef = useRef<HTMLInputElement>(null);
    const descriptionInputRef = useRef<HTMLInputElement>(null);

    const todoSubmitHandler = (event: React.FormEvent) => {
        event.preventDefault();
        const enteredName = nameInputRef.current!.value;
        const enteredDescription = descriptionInputRef.current!.value;
        nameInputRef.current!.value = "";
        descriptionInputRef.current!.value = "";
        props.onAddTodo(enteredName, enteredDescription); // Passing both name and description
    }

    return (
        <form onSubmit={todoSubmitHandler}>
            <div>
                <label htmlFor='todo-name'>Todo name</label>
                <input type='text' id='todo-name' ref={nameInputRef} />
                <label htmlFor='todo-description'>Todo Description</label>
                <input type="text" id='todo-description' ref={descriptionInputRef} />
            </div>
            <button type='submit'>Add todo</button>
        </form>
    );
}

export default NewTodo;
