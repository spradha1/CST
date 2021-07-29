import {
	Route,
  NavLink
} from 'react-router-dom';
import { Counter } from './features/counter/Counter';
import Stopwatch from './features/stopwatch/Stopwatch';
import Timer from './features/timer/Timer';
import './App.css';


function App() {
  return (
    <div className="App">
      <div id="Navbar">
        <div><NavLink className='navlink' activeClassName='selectedLink' exact to='/'>Counter</NavLink></div>
        <div><NavLink className='navlink' activeClassName='selectedLink' to='/Stopwatch'>Stopwatch</NavLink></div>
        <div><NavLink className='navlink' activeClassName='selectedLink' to='/Timer'>Timer</NavLink></div>
      </div>
      <div id='Container'>
        <Route exact path='/' component={ Counter } />
        <Route exact path='/Stopwatch' component={ Stopwatch } />
        <Route exact path='/Timer' component={ Timer } />
      </div>
    </div>
  );
}

export default App;
