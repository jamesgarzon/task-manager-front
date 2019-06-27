import React, { Component } from 'react';
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

const POST_MUTATION = gql`
    mutation createTask( $title: String!, $description: String) {
        createTask(title: $title, description: $description) {
            id
            title
            description
        }
    }
`;

class NewTask extends Component {
    state = {
        title: '',
        description: '',
    }

    render() {
        const { title, description } = this.state
        return (
            <div className="app__new-task">
                <div className="app__new-task--form-container">
                    <input
                        type="text"
                        placeholder="Título..."
                        value={title}
                        onChange={e => this.setState({ title: e.target.value })} />
                    <textarea placeholder="Contenido..."
                        value={description}
                        onChange={e => this.setState({ description: e.target.value })} />
                    <Mutation
                        mutation={POST_MUTATION}
                        variables={{ title, description }}
                        update={() =>
                            this.props.updateTaskList()
                        }
                    >
                        {postMutation => <button onClick={ () =>{
                            this.setState({
                                title: '',
                                description: '',
                            })
                            postMutation();
                        } }>Submit</button>}
                    </Mutation>
                </div>
            </div>
        )
    }

}
export default NewTask;
