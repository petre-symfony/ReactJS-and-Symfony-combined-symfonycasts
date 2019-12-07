import React, {Component} from "react";

export default class RepLogApp extends Component {
	render() {
		let heart = '';
		const repLogs = [
			{ id: 1, reps: 25, itemLabel: 'My Laptop', totalWeightLifted: 112.5 },
			{ id: 2, reps: 10, itemLabel: 'Big Fat Cat', totalWeightLifted: 180 },
			{ id: 8, reps: 4, itemLabel: 'Big Fat Cat', totalWeightLifted: 72 }
		];
		const repLogElement = repLogs.map(repLog => {
			return (
				<tr>
					<td>{repLog.itemLabel}</td>
					<td>{repLog.reps}</td>
					<td>{repLog.totalWeightLifted}</td>
					<td>...</td>
				</tr>
			);
		});

		if (this.props.withHeart){
			heart = <span>❤️</span>;
		}

		return (
			<div className="col-md-7">
				<h2>Lift History! {heart}</h2>

				<table className="table table-striped">
					<thead>
					<tr>
						<th>What</th>
						<th>How many times?</th>
						<th>Weight</th>
						<th>&nbsp;</th>
					</tr>
					</thead>
					<tbody>
						{repLogElement}
					</tbody>
					<tfoot>
					<tr>
						<td>&nbsp;</td>
						<th>Total</th>
						<th>TODO</th>
						<td>&nbsp;</td>
					</tr>
					</tfoot>
				</table>

			</div>
		);
	}
}