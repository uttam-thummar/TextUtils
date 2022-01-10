import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import './App.css';
import Alert from './components/Alert';
import About from './components/About';
import Navbar from './components/Navbar';
import TextForm from './components/TextForm';

function App() {
  const [Mode, setMode] = useState('light');// whether dark mode is enable or not
  const [AlertConf, setAlertConf] = useState(null);


  const configAlert = (message, variant) => {
    setAlertConf({
      message: message,
      variant: variant
    });
    setTimeout(() => {
      setAlertConf(null);
    }, 1500);
  };

  const toggleMode = () =>{
    if(Mode === 'light'){
      setMode('dark');
      document.body.style.backgroundColor = '#042743';
      configAlert("Dark Mode has been enabled.", "success");
    }else{
      setMode('light');
      document.body.style.backgroundColor = '#fff';
      configAlert("Light Mode has been enabled.", "success");
    }
  }

  return (
    <>
      <Router>
        <Navbar title="TextUtils" mode={Mode} toggleMode={toggleMode}/>
        <Alert alert={AlertConf}/>
        <div className="container my-3">
          <Switch>
            <Route exact path="/">
              <TextForm heading="Try TextUtils - word counter, character counter, remove extra spaces" mode={Mode} configAlert={configAlert}/>
            </Route>
            <Route exact path="/about">
              <About mode={Mode}/>
            </Route>
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
