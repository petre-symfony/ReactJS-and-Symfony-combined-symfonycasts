import React from 'react';
import { render }  from 'react-dom';
import RepLogApp from './RepLog/RepLogApp';

const shouldShowHeart = false;

render(
	<RepLogApp withHeart={shouldShowHeart}/>,
	document.getElementById('lift-stuff-app')
);