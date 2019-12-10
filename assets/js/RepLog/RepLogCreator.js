import React, {Component} from 'react';
import Button from '../Components/Button';
import PropTypes from 'prop-types';

export default class RepLogCreator extends Component {
	constructor(props) {
		super(props);

		this.quantityInput = React.createRef();
		this.itemSelect = React.createRef();

		this.state = {
			quantityInputError: ''
		};

		this.handleFormSubmit = this.handleFormSubmit.bind(this);
	}

	handleFormSubmit(event){
		event.preventDefault();

		const { onAddRepLog } = this.props;
		const quantityInput = this.quantityInput.current;
		const itemSelect = this.itemSelect.current;

		if(quantityInput.value <= 0){
			this.setState({
				quantityInputError: 'Please enter a value greater than 0'
			});

			// don't submit, or clear the form
			return;
		}

		onAddRepLog(
			itemSelect.options[itemSelect.selectedIndex].value,
			quantityInput.value
		);

		quantityInput.value = '';
		itemSelect.selectedIndex = 0;
		this.setState({
			quantityInputError: ''
		});
	}

	render() {
		const { quantityInputError } = this.state;
		const {validationErrorMessage, itemOptions} = this.props;

		return (
			<form onSubmit={this.handleFormSubmit}>
				{validationErrorMessage && (
					<div className="alert alert-danger">
						{validationErrorMessage}
					</div>
				)}

				<div className="form-group">
					<label className="sr-only required" htmlFor="item">What did you lift?</label>
					<select id="rep_log_item" /* defaultValue="cat"*/ ref={this.itemSelect} required="required">
						<option value="">What did you lift?</option>
						{ itemOptions.map(option => {
							return <option value={option.id} key={option.id}>{option.text}</option>
						})}
					</select>
				</div>
				{' '}
				<div className={`form-group ${quantityInputError ? 'has-error' : ''}`}>
					<label className="sr-only required" htmlFor="reps">How many times?</label>
					<input type="number" id="rep_log_reps" ref={this.quantityInput} required="required" placeholder="How many times?"/>
					{quantityInputError && <span className="help-block">{quantityInputError}</span>}
				</div>
				{' '}

				<Button type="submit" text="I Lifted it!"/>
			</form>
		);
	}
}

RepLogCreator.propTypes = {
	onAddRepLog: PropTypes.func.isRequired,
	validationErrorMessage: PropTypes.string.isRequired,
	itemOptions: PropTypes.array.isRequired
}