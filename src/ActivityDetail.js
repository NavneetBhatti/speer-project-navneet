import React, {useState, useEffect} from 'react';
import  './css/app.css';
import  './css/body.css';

import  './css/header.css';




// Icons could be moved to their own file in the future--
function ContactIcon() {
	return (
<svg width="1em" height="1em" viewBox="0 0 16 16" className="bi
			bi-telephone-inbound-fill in-phone" fill="currentColor"
			xmlns="http://www.w3.org/2000/svg"> <path fillRule="evenodd"
			d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29
			2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0
			.178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745
			0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034
			1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42
			18.634 18.634 0 0
			1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511zM15.854.146a.5.5
			0 0 1 0 .708L11.707 5H14.5a.5.5 0 0 1 0 1h-4a.5.5 0 0
			1-.5-.5v-4a.5.5 0 0 1 1 0v2.793L15.146.146a.5.5 0 0 1 .708 0z"/>
			</svg>
	)
}

function BackIcon(props) {
	return (
		<div>
		 <button className="btn" onClick={() => props.onClick()}>Back</button>
		 </div>

	) 
}

// Function should be moved to parent component idealy
function moveCall(call, update) {
	fetch('https://aircall-job.herokuapp.com/activities/'
		+ String(call.id),
		{
			method: 'POST',
			headers: {'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			body: JSON.stringify({'is_archived': !call.is_archived})
		}
	).then(response => {
		if (response.ok) {
			update(call)
		}
	})
}

// Displays details of a specific call
function ActivityDetail(props) {
	return (
		<div className="fade-in call">
		<div className="call-nav">

		<BackIcon onClick={() => props.onBack()}/>
		{/* <Archive call={props.info} update={props.update}/> */}
		<button className="btn" onClick={() => moveCall(props.info, props.onUpdate)}>
		{props.info.is_archived
		? "Unarchive" : "Archive"}
		</button>
		</div>



		{/* <ContactIcon/> */}

		<div class="detailContainer">
		<h1 class="detail"><b>Details</b></h1><br/><br/>

		<h1><b>{props.info.direction == 'inbound'
			? props.info.from
			: props.info.to}
		</b></h1><br/><br/>

		<div>
		<h3>
		{parseInt(props.info.duration / 60)
		} mins {props.info.duration % 60
		} seconds </h3>
		</div><br/><br/>

		<h3>
		{new Date(props.info.created_at).toLocaleTimeString([],
			{hour: '2-digit', minute: '2-digit'})
		} - {props.info.call_type}
		</h3><br/><br/>
		<h3>
		{new Date(props.info.created_at).toLocaleDateString()}
		</h3>
		</div>

		

		</div>
	)
}

export default ActivityDetail;
