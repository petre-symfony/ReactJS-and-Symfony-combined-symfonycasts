import React, {Component} from "react";
import RepLogs from './RepLogs';
import { getRepLogs, deleteRepLog, createRepLog } from '../api/rep_log_api';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';


export default class RepLogApp extends Component {
	constructor(props) {
		super(props);

		this.state = {
			highlightedRowId: null,
			repLogs: [],
			numberOfHearts: 1,
			isLoaded: false,
			isSavingNewRepLog: false,
			successMessage: ''
		}

		this.successMessageTimeoutHandle = 0;

		this.handleRowClick = this.handleRowClick.bind(this);
		this.handleAddRepLog = this.handleAddRepLog.bind(this);
		this.handleHeartChange = this.handleHeartChange.bind(this);
		this.handleDeleteRepLog = this.handleDeleteRepLog.bind(this);
	}

	componentDidMount() {
		getRepLogs()
			.then((data) => {
				this.setState({
					repLogs: data,
					isLoaded: true
				})
			});
	}

	handleRowClick(repLogId) {
		this.setState({highlightedRowId: repLogId});
	}

	handleAddRepLog(item, reps){
		const newRep = {
			reps: reps,
			item: item

		}

		this.setState({
			isSavingNewRepLog: true
		});

		createRepLog(newRep)
			.then(repLog => {
				this.setState(prevState => {
					const newRepLogs = [...prevState.repLogs, repLog];
					return {
						repLogs: newRepLogs,
						isSavingNewRepLog: false
					};
				});
				this.setSuccessMessage('Rep Log Saved!');
			})
		;
	}

	setSuccessMessage(message) {
		this.setState({
			successMessage: message
		});

		clearTimeout(this.successMessageTimeoutHandle);
		this.successMessageTimeoutHandle = setTimeout(() => {
			this.setState({
				successMessage: ''
			});

			this.successMessageTimeoutHandle = 0;
		}, 3000)
	}

	handleHeartChange(heartCount) {
		this.setState({
			numberOfHearts: heartCount
		});
	}

	handleDeleteRepLog(id) {
		deleteRepLog(id);
		// remove the rep log without mutating state
		// filter returns a new array
		this.setState((prevState) => {
			return {
				repLogs: prevState.repLogs.filter(repLog => repLog.id !== id)
			}}
		)
	}

	render() {
		return (
			<RepLogs
				{ ...this.state }
				{ ...this.props }
				onRowClick={this.handleRowClick}
				onAddRepLog = { this.handleAddRepLog }
				onHeartChange={this.handleHeartChange}
				onDeleteRepLog={this.handleDeleteRepLog}
			/>
		);
	}
}

RepLogApp.propTypes = {
	withHeart: PropTypes.bool,
}