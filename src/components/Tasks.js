import React from 'react';
import TaskItem from './TaskItem'
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const FEED_QUERY = gql`
    {
        allTasks {
            id
            title
            description
        }
    }
`;

const NEW_TASK_SUBSCRIPTION = gql`
    subscription {
        newTask {
            id
            title
            description
        }
    }
`;

const DELETE_TASK_SUBSCRIPTION = gql`
    subscription {
        removeTask
    }
`


function Tasks({onDeleteTask}) {

    const _subscribeToNewTasks = subscribeToMore => {
        subscribeToMore({
            document: NEW_TASK_SUBSCRIPTION,
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev;
                const newTask = subscriptionData.data.newTask
                const exists = prev.allTasks.find(({ id }) => id === newTask.id);
                if (exists) return prev;
                return Object.assign({}, prev, {
                    allTasks: [
                        newTask, ...prev.allTasks
                    ]
                })
            }
        })
    };

    const _subscribeToDeletedTask = subscribeToDeletedTask => {
        subscribeToDeletedTask({
            document: DELETE_TASK_SUBSCRIPTION,
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev
                const deletedTask = subscriptionData.data;
                console.log('deleteTask', deletedTask.removeTask);
                return Object.assign({}, prev, {
                    allTasks: prev.allTasks.filter( task => task.id !== deletedTask.removeTask)
                })
            }
        })
    };

    return (
        <Query query={FEED_QUERY} fetchPolicy="cache-and-network">
        {({ loading, error, data, subscribeToMore }) => {
        if (loading) return <div>Fetching</div>;
        if (error) return <div>Error</div>;

        _subscribeToNewTasks(subscribeToMore);
        _subscribeToDeletedTask(subscribeToMore);
        const tasks = data.allTasks;

        return (
            <div className="app__task-list">
                {tasks.map(task =>
                    <TaskItem
                        key={task.id}
                        task={task}
                        // onDeletedTask={onDeleteTask}
                    />
                    )}
            </div>
        )
        }}
    </Query>
    )
}

function onDeletedTask() {

}

export default  Tasks;
