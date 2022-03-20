import logo from './images/neck.jpg';
import './App.css';
import Selection from "./components/selection.component";
import {ButtonToolbar, Dropdown, Table, ToggleButton, ToggleButtonGroup} from 'react-bootstrap';
import db from './database/database';
import {Helmet} from "react-helmet";
import Main from "./components/main.component";


const whTooltips = {colorLinks: true, iconizeLinks: true, iconSize: true, renameLinks: true}


function App() {
  return (

    <div className="App">
        <Helmet>
            <script src="https://wow.zamimg.com/widgets/power.js"></script>
        </Helmet>
      <div className="app-header">
          <p>Legendary Craft Helper</p>
      </div>
        <Main />
    </div>
  );
}

export default App;
