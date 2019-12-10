import React, {Component} from "react";
import RepLogList from "./RepLogList";
import RepLogCreator from "./RepLogCreator";
//import RepLogCreator from "./RepLogCreatorControlledComponents";
import PropTypes from 'prop-types';

function calculateTotalWeightLifted(repLogs){
	let total = 0;

	for(let repLog of repLogs) {
		total += repLog.totalWeightLifted;
	}

	return total;
}

const calculateTotalWeightFancier = repLogs => repLogs.reduce((total, log) => total + log.totalWeightLifted, 0);

export default function RepLogs(props) {
	const {
		withHeart,
		highlightedRowId,
		onRowClick,
		onAddRepLog,
		repLogs,
		numberOfHearts,
		onHeartChange,
		onDeleteRepLog,
		isLoaded,
		isSavingNewRepLog,
		successMessage,
		newRepLogValidationErrorMessage,
		itemOptions
	} = props;

	let heart = '';
	if (withHeart){
		heart = <span>{'❤️'.repeat(numberOfHearts)}</span>;
	}

	return (
		<div>
			<h2>Lift History! {heart}</h2>

			<input
				type="range"
				value={numberOfHearts}
				onChange={(e) => {
					onHeartChange(+e.target.value);
				}}
			/>

			{successMessage && (
				<div className="alert alert-success text-center">
					{successMessage}
				</div>
			)}

			<table className="table table-striped">
				<thead>
				<tr>
					<th>What</th>
					<th>How many times?</th>
					<th>Weight</th>
					<th>&nbsp;</th>
				</tr>
				</thead>
				<RepLogList
					highlightedRowId={ highlightedRowId }
					onRowClick={ onRowClick }
					onDeleteRepLog={onDeleteRepLog}
					repLogs={repLogs}
					isLoaded={isLoaded}
					isSavingNewRepLog={isSavingNewRepLog}
				/>
				<tfoot>
				<tr>
					<td>&nbsp;</td>
					<th>Total</th>
					<th>{calculateTotalWeightFancier(repLogs)}</th>
					<td>

					</td>
				</tr>
				</tfoot>
			</table>

			<div className="row">
				<div className="col-md-6">
					<RepLogCreator
						onAddRepLog={onAddRepLog}
						validationErrorMessage={newRepLogValidationErrorMessage}
						itemOptions={itemOptions}
					/>
				</div>
			</div>

		</div>
	);
}

RepLogs.propTypes = {
	highlightedRowId: PropTypes.any,
	onRowClick: PropTypes.func.isRequired,
	onAddRepLog: PropTypes.func.isRequired,
	withHeart: PropTypes.bool,
	repLogs: PropTypes.array.isRequired,
	itemOptions: PropTypes.array.isRequired,
	numberOfHearts: PropTypes.number.isRequired,
	onHeartChange: PropTypes.func.isRequired,
	onDeleteRepLog: PropTypes.func.isRequired,
	isLoaded: PropTypes.bool.isRequired,
	isSavingNewRepLog: PropTypes.bool.isRequired,
	successMessage: PropTypes.string.isRequired,
	newRepLogValidationErrorMessage: PropTypes.string.isRequired
}