import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class RepLogCreator extends Component {
	constructor(props) {
		super(props);

		this.quantityInput = React.createRef();
		this.itemSelect = React.createRef();

		this.itemOptions = [
			{ id: 'cat', text: 'Cat' },
			{ id: 'fat_cat', text: 'Big Fat Cat' },
			{ id: 'laptop', text: 'My Laptop' },
			{ id: 'coffee_cup', text: 'Coffee Cup' },
		];

		this.state = {
			selectedItemId: '',
			quantityValue: 0,
			quantityInputError: ''
		};

		this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.handleSelectedItemChange = this.handleSelectedItemChange.bind(this);
		this.handleQuantityInputChange = this.handleQuantityInputChange.bind(this);
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
			itemSelect.options[itemSelect.selectedIndex].text,
			quantityInput.value
		);

		quantityInput.value = '';
		itemSelect.selectedIndex = 0;
		this.setState({
			quantityInputError: ''
		});
	}

	handleSelectedItemChange(event) {
		this.setState({
			selectedItemId: event.target.value
		});
	}

	handleQuantityInputChange(event) {
		this.setState({
			quantityValue: event.target.value
		});
	}

	render() {
		const {
			quantityInputError,
			selectedItemId,
			quantityValue
		} = this.state;

		return (
			<form onSubmit={this.handleFormSubmit}>
				<div className="form-group">
					<label className="sr-only required" htmlFor="item">What did you lift?</label>
					<select id="rep_log_item" /* defaultValue="cat"*/
							value={selectedItemId} onChange={this.handleSelectedItemChange}
							required="required"
					>
						<option value="">What did you lift?</option>
						{ this.itemOptions.map(option => {
							return <option value={option.id} key={option.id}>{option.text}</option>
						})}
					</select>
				</div>
				{' '}
				<div className={`form-group ${quantityInputError ? 'has-error' : ''}`}>
					<label className="sr-only required" htmlFor="reps">How many times?</label>
					<input type="number" id="rep_log_reps"
						 value={quantityValue} onChange={this.handleQuantityInputChange}
						 required="required" placeholder="How many times?"
					/>
					{quantityInputError && <span className="help-block">{quantityInputError}</span>}
				</div>
				{' '}
				<button type="submit" className="btn btn-primary">I Lifted it!</button>
			</form>
		);
	}
}

RepLogCreator.propTypes = {
	onAddRepLog: PropTypes.func.isRequired
}