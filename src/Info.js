import React, {useState, useEffect} from 'react';
import  './css/app.css';
import  './css/body.css';
import  './css/header.css';

function Info(props) {
	let recent = "recent" + (props.recent ? " selected" : '')
	let archived = "archived" + (props.recent ? "" : " selected")
	let slider = "nav-slider" + (props.recent ? " left" : " right")
	return (
		<nav>
			<button onClick={() => props.onPageChange(true)}
			className="btn" >Recent
			</button>
			<button onClick={() => props.onPageChange(false)}
			className="btn" style={{marginLeft: 30}}>Archived
			</button>
			<div>
				<span className={slider}></span>
			</div>
		</nav>
	)
}

export default Info
