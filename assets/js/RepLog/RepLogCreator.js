import React from 'react';
import PropTypes from 'prop-types';

export default function RepLogCreator(props) {
	const { onNewItemSubmit } = props;

	function handleFormSubmit(event) {
		event.preventDefault();

		console.log('Submit');
		console.log(event.target.elements.namedItem('reps').value);

		onNewItemSubmit('Big Fat Cat', event.target.elements.namedItem('reps').value);
	}

	return (
		<form className="form-inline" onSubmit={ handleFormSubmit }>
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
	);
}

RepLogCreator.propTypes = {
	onNewItemSubmit: PropTypes.func.isRequired
}