import { 
	BrowserRouter as Router,
	Route,
  Link
} from 'react-router-dom';
import { Counter } from './features/counter/Counter';
import Stopwatch from './features/stopwatch/Stopwatch';
import Timer from './features/timer/Timer';
import './App.css';


function App() {
  return (
    <Router>
      <div className="App">
        <div id="Navbar">
          <div><Link className='navlink' to='/'>Counter</Link></div>
          <div><Link className='navlink' to='/Stopwatch'>Stopwatch</Link></div>
          <div><Link className='navlink' to='/Timer'>Timer</Link></div>
        </div>
        <div id='Container'>
          <Route exact path='/' component={ Counter } />
          <Route exact path='/Stopwatch' component={ Stopwatch } />
          <Route exact path='/Timer' component={ Timer } />
        </div>
      </div>
    </Router>
  );
}

export default App;
