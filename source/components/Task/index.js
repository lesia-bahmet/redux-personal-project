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

    constructor (props) {
        super(props);

        this.state = {
            isEdited: false,
            message:  this.props.message,
        };

        this.messageInput = React.createRef();
        this._focusMessageInput = this._focusMessageInput.bind(this);
    }

    componentDidMount () {
        //TODO: refactor
        document.addEventListener("keydown", this._handleKeyPress, false);
    }

    componentDidUpdate () {
        if (this.state.isEdited) {
            this._focusMessageInput();
        }
        this.props.sortTasks();
    }

    _focusMessageInput () {
        this.messageInput.current.focus();
    }

    _removeTask = () => {
        this.props.removeTaskRequest(this.props.id);
    };

    _confirmEdit = () => {
        if (!this.state.isEdited) {
            return;
        }

        const data = this._collectData();

        this.props.editTasksRequest([data]);
        this.setState({ isEdited: false });
    };

    _collectData = () => ({
        id:        this.props.id,
        message:   this.state.message,
        completed: this.props.completed,
        favorite:  this.props.favorite,
    });

    _skipEdit = () => {
        this.setState({
            isEdited: false,
            message:  this.props.message,
        });
    };

    _setEditState = () => {
        this.setState({ isEdited: true });
    };

    _setFavorite = () => {
        // if (this.props.favorite) {
        //     this.props.unsetFavorite(this.props.id);
        // } else {
        //     this.props.setFavorite(this.props.id);
        // }

        const data = this._collectData();

        data.favorite = !this.props.favorite;

        this.props.editTasksRequest([data]);
    };

    _setCompleted = () => {
        // if (this.props.completed) {
        //     this.props.setUncompleted(this.props.id);
        // } else {
        //     this.props.setCompleted(this.props.id);
        // }
        const data = this._collectData();

        data.completed = !this.props.completed;

        this.props.editTasksRequest([data]);
    };

    _handleChange = (event) => {
        this.setState({ message: event.target.value });
    };

    _handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            this._confirmEdit();
        }
        if (event.keyCode === 27) {
            this._skipEdit();
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
                        onBlur = { this._skipEdit }
                        onChange = { this._handleChange }
                        onKeyPress = { this._handleKeyPress }
                        ref = { this.messageInput }
                        type = 'text'
                        value = { this.state.message }
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
