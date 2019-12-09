import React, {Component} from "react";
import RepLogList from "./RepLogList";
import RepLogCreator from "./RepLogCreator";
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
		numberOfHearts
	} = props;

	let heart = '';
	if (withHeart){
		heart = <span>{'❤️'.repeat(numberOfHearts)}</span>;
	}

	return (
		<div className="col-md-7">
			<h2>Lift History! {heart}</h2>

			<input
				type="number"
				value={numberOfHearts}
			/>

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
					repLogs={repLogs}
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
	numberOfHearts: PropTypes.number.isRequired
}