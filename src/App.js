import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';

import Header from './Header.js';
import ActivityFeed from './ActivityFeed.js';
import  Info from './Info.js';
import ActivityDetail from './ActivityDetail.js';
import  './css/app.css';
import  './css/body.css';
import  './css/header.css';



const App = () => {
	const [recent, setRecent] = useState(true)
	const [entry, setEntry] = useState()
	const [ stack, setStack ] = useState(null)

  function fetchActivities() {
    return fetch('https://aircall-job.herokuapp.com/activities')
      .then(response => {
      return response.json()
    })
  }
  
  function fetchEntry(id) {
    return fetch('https://aircall-job.herokuapp.com/activities/' + id)
      .then(response => {
      return response.json()
    })
  }

	useEffect(() => {
		fetchActivities().then(data => {setStack(data)})
	}, [])

	let focus = <ActivityFeed stack={stack} recent={recent} onSelect={ (c) => setEntry(c) }/>
	if (entry) {
		focus = <ActivityDetail info={entry} onBack={() => setEntry(null)}
		onUpdate={(e) => {
			fetchEntry(e.id).then(data => setEntry(data))
			fetchActivities().then(data => setStack(data))
		}}/>
	}

  return (
    <div className='container'>

      <Header/>
	  <Info onPageChange={ (r) => {setEntry(null); setRecent(r)} }
	  recent={recent}/>

      <div className="container-view">
	  {focus}
	  </div>

    </div>
  );
};

//ReactDOM.render(<App/>, document.getElementById('app'));

export default App;
