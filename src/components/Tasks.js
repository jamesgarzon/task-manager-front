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
`

function Tasks({lastUpdate}) {
    return (
        <Query query={FEED_QUERY} variables={{lastUpdate}} fetchPolicy="cache-and-network">
        {({ loading, error, data }) => {
        if (loading) return <div>Fetching</div>
        if (error) return <div>Error</div>

        const tasks = data.allTasks;

        return (
            <div className="app__task-list">
                {tasks.map(task => <TaskItem key={task.id} task={task} />)}
            </div>
        )
        }}
    </Query>
    )
}

export default  Tasks;
