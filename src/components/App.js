import React, {Component} from 'react';
import '../styles/App.scss';
import Tasks from "./Tasks";
import NewTask from "./NewTask";


class App extends Component{
    state = {
        lastUpdate: new Date()
    }

    updateTaskList = () => {
        console.log('update!!');
        this.setState({lastUpdate: new Date()})
    };

    render() {
        return (
            <div className="app__container">
                <h1 className="app__title">Tasks</h1>
                <NewTask updateTaskList={this.updateTaskList}/>
                <Tasks  lastUpdate={this.state.lastUpdate}/>
            </div>
        );
    }

}

export default App;
