import React, {useState, useRef, useEffect} from 'react';
import MaskedInput from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

import Mastercard from './assets/img/mastercard.svg';
import Money from './assets/img/money.svg';
import './assets/css/App.css';
import './assets/css/responsive.css'
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

    //Pegando o dado da API
    const fetchApi = async(formato = `json`, currency = `USD-BRL`) => {
        await fetch(`https://economia.awesomeapi.com.br/${formato}/all/${currency}`).then((response) => {
            return response.json();
        }).then(json => {
            setMultiplier(json.USD.ask);
        });
    }

    // Aqui faz o calculo da conversao com os dados pegos da API e os dados de entrada
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

    // Aqui pegamos o valor do radio button de acordo com a opcao
    const getRadioValue = (event) => {
        if (event.target.checked === true) {
            event.target.value === "credit"
                ? setIof(6.4)
                : setIof(1.1)
        }

        convert();
    }

    useEffect(() => {
        fetchApi();
    })

    return (
        <main className="App">
            <div className="app-section">
                <form
                    className="form"
                    ref={calcForm}
                    method="POST"
                    action=""
                    onSubmit={convert}>
                    <div className="form-items">
                        <label htmlFor="dollars">Dólares</label>
                        <div className="input-form">
                            <div className="input-extra">$</div>
                            <MaskedInput
                                ref={moneyValue}
                                mask={moneyMask}
                                id="dollars"
                                name="dollars"
                                type="text"
                                onChange={unmask}
                                className="false-input"/>
                        </div>
                    </div>

                    <div className="form-items">
                        <label htmlFor="stateTax">Imposto de Estado</label>
                        <div className="input-form">
                          <div className="input-extra" id="tax-extra">%</div>
                          <MaskedInput mask={taxMask} id="state_tax" name="state_tax" type="text" className="false-input"/>
                        </div>
                    </div>

                    <div className="form-items">
                        <label>Modo de Pagamento</label>
                        <div className="radios">
                            <div className="radio-option">
                                <input
                                    type="radio"
                                    name="buying"
                                    value="money"
                                    defaultChecked
                                    onChange={getRadioValue}></input>
                                <img src={Money} alt="Money Option"/>
                            </div>
                            <div className="radio-option">
                                <input type="radio" name="buying" value="credit" onChange={getRadioValue}></input>
                                <img src={Mastercard} alt="Card Option"/>
                            </div>
                        </div>
                    </div>

                    <button type="button" className="btn-convert" onClick={convert}>Converter</button>

                </form>

                <div className="mid-sect"></div>

                <div className="result-section">

                    <div className="result-control">
                        <div class="result-control-label">
                            <span>Total Real</span>
                        </div>
                        <div className="result-control-info">
                            <span>{calc.real !== 0
                                    ? calc.real
                                    : '...'}</span>
                        </div>
                    </div>

                    <div className="result-control">
                        <div class="result-control-label">
                            <span>Total Real (com imposto)</span>
                        </div>
                        <div className="result-control-info">
                            <span>{calc.realFee !== 0
                                    ? calc.realFee
                                    : '...'}</span>
                        </div>
                    </div>

                    <div className="result-control">
                        <div class="result-control-label">
                            <span>Total Dólar</span>
                        </div>
                        <div className="result-control-info">
                            <span>{calc.dollar !== 0
                                    ? calc.dollar
                                    : '...'}</span>
                        </div>
                    </div>

                    <div className="result-control">
                        <div class="result-control-label">
                            <span>Total Dólar (com imposto)</span>
                        </div>
                        <div className="result-control-info">
                            <span>{calc.dollarFee !== 0
                                    ? calc.dollarFee
                                    : '...'}</span>
                        </div>
                    </div>

                    <div className="result-control">
                        <div class="result-control-label">
                            <span>IOF</span>
                        </div>
                        <div className="result-control-info">
                            <span>{iof !== 0
                                    ? iof
                                    : '...'}</span>
                        </div>
                    </div>

                    <div className="result-control">
                        <div class="result-control-label">
                            <span>Cotação do Dia</span>
                        </div>
                        <div className="result-control-info">
                            <span>{multiplier !== 0
                                    ? multiplier
                                    : '...'}</span>
                        </div>
                    </div>

                </div>

            </div>

        </main>

    );
}

export default App;
