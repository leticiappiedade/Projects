import React, {useState, useRef, useEffect} from 'react';

import Mastercard from './assets/img/mastercard.svg';
import Money from './assets/img/money.svg';
import './assets/App.css';

function App() {







    return (
      <main className="App">
        <div className="app-section">
          <div className="form">
            <div className="form-items">
              <label>Dólares</label>
              <input class="input-form" type="text"></input>
            </div>

            <div className="form-items">
              <label>Imposto de Estado</label>
              <input class="input-form" type="text"></input>
            </div>

            <div className="form-items">
              <label>Modo de Pagamento</label>
              <div className="radios">
                <div className="radio-option">
                  <input type="radio" name="buying" value="money"></input>
                  <img src={Money} alt="Money Option"/>
                </div>
                <div className="radio-option">
                  <input type="radio" name="buying" value="credit"></input>
                  <img src={Mastercard} alt="Card Option"/>
                </div>
              </div>
            </div>

            <button type="submit" className="btn-convert">Converter</button>

          </div>

          <div className="mid-sect"></div>

          <div className="result-section">

            <div className="result-control">
              <div class="result-control-label">
                <span>Total Real</span>
              </div>
              <div className="result-control-info">
                <span>--</span>
              </div>
            </div>

            <div className="result-control">
              <div class="result-control-label">
                <span>Total Real (com imposto)</span>
              </div>
              <div className="result-control-info">
                <span>--</span>
              </div>
            </div>

            <div className="result-control">
              <div class="result-control-label">
                <span>Total Dólar</span>
              </div>
              <div className="result-control-info">
                <span>--</span>
              </div>
            </div>

            <div className="result-control">
              <div class="result-control-label">
                <span>Total Dólar (com imposto)</span>
              </div>
              <div className="result-control-info">
                <span>--</span>
              </div>
            </div>

            <div className="result-control">
              <div class="result-control-label">
                <span>IOF</span>
              </div>
              <div className="result-control-info">
                <span>--</span>
              </div>
            </div>

            <div className="result-control">
              <div class="result-control-label">
                <span>Cotação do Dia</span>
              </div>
              <div className="result-control-info">
                <span>--</span>
              </div>
            </div>

          </div>





        </div>


    
      </main>

  
  );
}

export default App;
