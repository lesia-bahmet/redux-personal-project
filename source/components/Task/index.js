// Core
import React, { PureComponent } from 'react';
import cx from 'classnames';

// Instruments
import Styles from './styles.m.css';

// Components
import Checkbox from 'theme/assets/Checkbox';
import Remove from 'theme/assets/Remove';
import Edit from 'theme/assets/Edit';
import Star from 'theme/assets/Star';

export default class Task extends PureComponent {

    state = {
        isEdited: false,
        message:  this.props.message,
    };

    componentDidMount () {
        //TODO: refactor
        //TODO: focus when editing
        // document.addEventListener("keydown", this._handleKeyPress, false);
    }

    _removeTask = () => {
        this.props.removeTask(this.props.id);
    };

    _editTask = () => {
        this.props.editTask({
            taskId:  this.props.id,
            message: this.state.message,
        });
        this.setState({ isEdited: false });
    };

    _escapeEditState = () => {
        this.setState({
            isEdited: false,
            message:  this.props.message,
        });
    };

    _setEditState = () => {
        this.setState({ isEdited: true });
    };

    _setFavorite = () => {
        if (this.props.favorite) {
            this.props.unsetFavorite(this.props.id);
        } else {
            this.props.setFavorite(this.props.id);
        }

        this.props.sortTasks();
    };

    _setCompleted = () => {
        if (this.props.completed) {
            this.props.setUncompleted(this.props.id);
        } else {
            this.props.setCompleted(this.props.id);
        }

        this.props.sortTasks();
    };

    _handleChange = (event) => {
        this.setState({ message: event.target.value });
    };

    _handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            this._editTask();
        }
        if (event.keyCode === 27) {
            console.log('esc');
            this._escapeEditState();
        }
    };

    render () {
        const { message, completed } = this.props;

        const styles = cx(Styles.task, {
            [Styles.completed]: completed,
        });

        return (
            <li className = { styles }>
                <div className = { Styles.content }>
                    <Checkbox
                        checked = { this.props.completed }
                        inlineBlock
                        className = { Styles.complete }
                        color1 = '#3B8EF3'
                        color2 = '#FFF'
                        onClick = { this._setCompleted }
                    />
                    <input
                        autoFocus
                        disabled = { !this.state.isEdited }
                        type = 'text'
                        value = { this.state.message }
                        onChange = { this._handleChange }
                        onKeyPress = { this._handleKeyPress }
                        // value = { message }
                    />
                </div>
                <div className = { Styles.actions }>
                    <Star
                        checked = { this.props.favorite }
                        className = { Styles.setPriority }
                        color1 = '#3B8EF3'
                        color2 = '#000'
                        inlineBlock
                        onClick = { this._setFavorite }
                    />
                    <Edit
                        onClick = { this._setEditState }
                        inlineBlock
                        checked = { false }
                        className = { Styles.edit }
                        color1 = '#3B8EF3'
                        color2 = '#000'
                    />
                    <Remove
                        onClick = { this._removeTask }
                        inlineBlock
                        className = { Styles.remove }
                        color1 = '#3B8EF3'
                        color2 = '#000'
                    />
                </div>
            </li>
        );
    }
}
