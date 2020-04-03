import React, {useState, useRef, useEffect} from 'react';
import MaskedInput from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

import Mastercard from './assets/img/mastercard.svg';
import Money from './assets/img/money.svg';
import './assets/App.css';
import {create} from 'domain';

function App() {

    // Hooks, states, basicamente podemos e nao podemos chamar de criação de
    // variaveis
    const [multiplier,
        setMultiplier] = useState(0);
    const [iof,
        setIof] = useState(6.4);
    const [calc,
        setCalc] = useState({'dollar': 0, 'dolarFree': 0, 'real': 0, 'realFree': 0});
    const moneyValue = useRef(null);
    const calcForm = useRef(null);
    // Funçoes de mascara do MaskedInput
    const moneyMask = createNumberMask({prefix: '', allowDecimal: true, decimalLimit: 2});
    const taxMask = createNumberMask({prefix: '', allowDecimal: true, decimalLimit: 2, intergerLimit: 3});
    // Pegar o valor da mascara tirando caracteres especiais
    const unmask = () => {
        const maskedValue = moneyValue.current.inputElement.value;
        const unmaskedValue = maskedValue.replace(/[^0-9]/g, '');
        return unmaskedValue;
    }

    const fetchApi = async(formato = `json`, currency = `USD-BRL`) => {
        await fetch(`https://economia.awesomeapi.com.br/${formato}/all/${currency}`).then((response) => {
            return response.json();
        }).then(json => {
            setMultiplier(json.USD.ask);
        });
    }

    const convert = () => {
        fetchApi();

        const data = new FormData(calcForm.current);
        let dollars = parseFloat(unmask(data.get('dollars')));
        let state_tax = parseFloat(data.get('state_tax'));

        if (dollars !== '' && state_tax !== '') {
            let totalDollar = dollars;
            let totalDollarFee = dollars + (dollars * (state_tax / 100));
            let totalReal = dollars * parseFloat(multiplier);
            let totalRealFee = 0;
            let basicRealFee = (dollars + (dollars * (state_tax / 100))) * (parseFloat(multiplier));

            if (data.get === 'money') {
                totalRealFee = basicRealFee + (parseFloat(multiplier) * (parseFloat(iof) / 100));
            } else {
                totalRealFee = basicRealFee + (basicRealFee * (parseFloat(iof) / 100));
            }

            setCalc({
                'dollar': parseFloat(totalDollar).toFixed(2),
                'dollarFee': parseFloat(totalDollarFee).toFixed(2),
                'real': parseFloat(totalReal).toFixed(2),
                'realFee': parseFloat(totalRealFee).toFixed(2)
            });
        }

    }

    const getRadioValue = (event) => {
        if (event.target.checked === true) {
            event.target.value === "credit"
                ? setIof(6.4)
                : setIof(1.1)
        }

        convert();
    }
    
    useEffect(()=>{
      fetchApi();
    })



    return (
        <main className="App">
            <div className="app-section">
                <form className="form">
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

                </form>

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
