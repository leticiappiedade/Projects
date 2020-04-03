import React, {useState, useRef, useEffect} from 'react';

import './assets/App.css';

function App() {







  return (
    <main className="App">
      <div className="app-space">
        <div className="form-space">
          <form>
            <div className="input-form">
              <label>Dolares</label>
              <input type="text"></input>
            </div>

            <div className="input-form">
              <label>Imposto de Estado</label>
              <input type="text"></input>
            </div>

            <div className="radio-form">
                <div className="radio-label">
                  Opção de pagamento
                </div>
                <div className="radio-option">
                    <input type="radio" id="credit" name="buyingMethod" value="credit"></input>
                </div>
                <div className="radio-option">
                    <input type="radio" id="money" name="buyingMethod" value="money "></input>
                </div>
            </div>
            </form>
        </div>
      </div>
    </main>

  
  );
}

export default App;
