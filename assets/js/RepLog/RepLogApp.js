import React, {Component} from "react";
import RepLogs from './RepLogs';
import { getRepLogs } from '../api/rep_log_api';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';


export default class RepLogApp extends Component {
	constructor(props) {
		super(props);

		this.state = {
			highlightedRowId: null,
			repLogs: [],
			numberOfHearts: 1
		}

		this.handleRowClick = this.handleRowClick.bind(this);
		this.handleAddRepLog = this.handleAddRepLog.bind(this);
		this.handleHeartChange = this.handleHeartChange.bind(this);
		this.handleDeleteRepLog = this.handleDeleteRepLog.bind(this);
	}

	componentDidMount() {
		getRepLogs()
			.then((data) => {
				this.setState({
					repLogs: data
				})
			});
	}
	
	handleRowClick(repLogId) {
		this.setState({highlightedRowId: repLogId});
	}

	handleAddRepLog(itemLabel, reps){
		const newRep = {
			id: uuid(),
			reps: reps,
			itemLabel: itemLabel,
			totalWeightLifted: Math.floor(Math.random()*5)
		}

		this.setState((prevState) => {
			const newRepLogs = [...prevState.repLogs, newRep];

			return { repLogs: newRepLogs }
		});
	}

	handleHeartChange(heartCount) {
		this.setState({
			numberOfHearts: heartCount
		});
	}

	handleDeleteRepLog(id) {
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