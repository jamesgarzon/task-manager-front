import React from 'react';

function TaskItem ({task}) {
    return (
        <article style={{textDecoration: task.checked && 'line-through'}}>
            <h4>{task.title}</h4>
            <p>{task.description}</p>
            <button>x</button>
        </article>
    )
}

export default TaskItem;
