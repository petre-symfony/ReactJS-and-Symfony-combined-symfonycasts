import React from 'react';
import ReactDom from 'react-dom';

class RepLogApp extends React.Component {
	render() {
		return <h2>Lift Stuff! <span>❤️</span></h2>;
	}
}


console.log(<RepLogApp/>);

ReactDom.render(<RepLogApp/>, document.getElementById('lift-stuff-app')); 