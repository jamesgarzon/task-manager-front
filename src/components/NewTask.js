import React from 'react';

function NewTask() {
    return (
        <div className="app__new-task">
            <div className="app__new-task--form-container">
                <input type="text" placeholder="Título..."/>
                <textarea placeholder="Contenido..."/>
                <button>Crear</button>
            </div>
        </div>
    )
}
export default NewTask;
