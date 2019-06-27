import React from 'react';
import TaskItem from './TaskItem'
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

// const tasks = [
//     {
//         id: '654B6A6576E5C7865',
//         title: 'Deploy production application',
//         description: 'Install production application through Jenkins',
//         createdAt: new Date().toJSON(),
//         checked: false,
//         category: {
//             id: '094B6A1176E5C7887' ,
//             name: 'Important'
//         }
//     },
//     {
//         id: '23234234234HH3H33',
//         title: 'Go to the doctor',
//         description: 'Call the office to confirm availability',
//         createdAt: new Date().toJSON(),
//         checked: false,
//         category: {
//             id: '094B6A1176E5C7887' ,
//             name: 'Important'
//         }
//     }
// ]

const FEED_QUERY = gql`
    {
        tasks {
            id
            title
            description
        }
    }
`

function Tasks() {
    return (
        <Query query={FEED_QUERY}>
        {({ loading, error, data }) => {
        if (loading) return <div>Fetching</div>
        if (error) return <div>Error</div>

        const tasks = data.tasks;

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
