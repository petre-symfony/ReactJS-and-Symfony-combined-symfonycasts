import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default function Button(props){
	return (
		<button
			className={`btn ${props.className}`}
			{...props}
		>
			{props.children}
		</button>
	)
}

Button.propTypes = {
	className: PropTypes.string
}

Button.defaultProps = {
	className: ''
}