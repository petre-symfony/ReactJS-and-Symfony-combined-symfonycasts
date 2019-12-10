import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default function Button(props){
	return (
		<button
			className="btn"
			{...props}
		>
			{props.text}
		</button>
	)
}

Button.propTypes = {
	text: PropTypes.string.isRequired
}