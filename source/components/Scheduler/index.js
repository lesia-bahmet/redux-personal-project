// Core
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Instruments
import Styles from './styles.m.css';
import Checkbox from 'theme/assets/Checkbox';
import { taskActions } from '../../bus/task/actions';
import { sagaTaskActions } from './../../bus/task/saga/actions';

// Components
import Task from 'components/Task';
import Spinner from '../Spinner';

const mapStateToProps = (state) => ({
    tasks:        state.tasks,
    isRequesting: state.ui.get('isRequesting'),
});

function mapDispatchToProps (dispatch) {
    return {
        taskActions:     bindActionCreators(taskActions, dispatch),
        sagaTaskActions: bindActionCreators(sagaTaskActions, dispatch),
    };
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Scheduler extends Component {
    state = {
        message: '',
        search:  '',
    };

    componentDidMount () {
        this.props.sagaTaskActions.fetchTasksRequest();
    }

    _changeTextHandler = (event) => {
        const message = event.target.value;

        if (message.length >= 50) {
            return;
        }

        this.setState({ message });
    };

    _addTaskHandler = (event) => {
        event.preventDefault();

        if (!this.state.message || this.state.message.length > 50) {
            return;
        }

        this.props.sagaTaskActions.addTaskRequest(this.state.message);

        this.setState({ message: '' });
    };

    _setAllTasksCompleted = () => {
        const tasks = this.props.tasks.map((task) => task.set('completed', true));

        this.props.sagaTaskActions.editTasksRequest(tasks.toJS());
    };

    _handleSearch = (event) => {
        const searchText = event.target.value;

        this.setState({ search: searchText });
        this.props.taskActions.filterTasks(searchText);
    };

    render () {
        const todoList = this.props.tasks.map((task) => {
            if (task.get('hidden')) {
                return '';
            }

            return (<Task
                key = { task.get('id') }
                { ...task.toJS() }
                { ...this.props.taskActions }
                { ...this.props.sagaTaskActions }
            />);

        });

        const completedCount = this.props.tasks.filter((task) => task.get('completed'));

        return (
            <section className = { Styles.scheduler }>
                <Spinner spin = { this.props.isRequesting } />
                <main>
                    <header>
                        <h1>Планировщик задач</h1>
                        <input
                            placeholder = 'Поиск'
                            type = 'search'
                            value = { this.state.search }
                            onChange = { this._handleSearch }
                        />
                    </header>
                    <section>
                        <form>
                            <input
                                className = { Styles.createTask }
                                maxLength = { 50 }
                                placeholder = 'Описание моей новой задачи'
                                type = 'text'
                                value = { this.state.message }
                                onChange = { this._changeTextHandler }
                            />
                            <button onClick = { this._addTaskHandler }>Добавить задачу</button>
                        </form>
                        <div className = { Styles.overlay }>
                            <ul>{todoList}</ul>
                        </div>
                    </section>
                    <footer>
                        <Checkbox
                            checked = { completedCount.size === this.props.tasks.size }
                            color1 = '#363636'
                            color2 = '#fff'
                            onClick = { this._setAllTasksCompleted }
                        />
                        <span className = { Styles.completeAllTasks }>
                            Все задачи выполнены
                        </span>
                    </footer>
                </main>
            </section>
        );
    }
}
