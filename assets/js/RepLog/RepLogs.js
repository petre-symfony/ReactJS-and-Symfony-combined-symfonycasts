import React, {Component} from "react";
import RepLogList from "./RepLogList";

export default function RepLogs(props) {
	const { withHeart, highlightedRowId, onRowClick } = props;

	let heart = '';
	if (withHeart){
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
				<RepLogList
					highlightedRowId={ highlightedRowId }
					onRowClick={ onRowClick }
				/>
				<tfoot>
				<tr>
					<td>&nbsp;</td>
					<th>Total</th>
					<th>To do</th>
					<td>

					</td>
				</tr>
				</tfoot>
			</table>

			<form className="form-inline">
				<div className="form-group">
					<label className="sr-only required" htmlFor="item">What did you lift?</label>
					<select id="rep_log_item" /* defaultValue="cat"*/ name="item" required="required">
						<option value="">What did you lift?</option>
						<option value="cat">Cat</option>
						<option value="fat_cat">Big Fat Cat</option>
						<option value="laptop">My Laptop</option>
						<option value="coffee_cup">Coffee Cup</option>
					</select>
				</div>
				{' '}
				<div className="form-group">
					<label className="sr-only required" htmlFor="reps">How many times?</label>
					<input type="number" id="rep_log_reps" name="reps" required="required" placeholder="How many times?"/>
				</div>
				{' '}
				<button type="submit" className="btn btn-primary">I Lifted it!</button>
			</form>
		</div>
	);
}