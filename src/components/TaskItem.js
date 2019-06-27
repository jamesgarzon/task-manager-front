import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const DELETE_TASK = gql`
    mutation deleteTask( $id: ID! ) {
        deleteTask(id: $id)
    }
`
function TaskItem({ task }) {
    return (
        <article style={{ textDecoration: task.checked && 'line-through' }}>
            <h4>{task.title}</h4>
            <p>{task.description}</p>
            <Mutation mutation={DELETE_TASK} variables={{ id: task.id }}>
                {postMutation => <button onClick={postMutation}>x</button>}
            </Mutation>
        </article>
    )
}

export default TaskItem;
