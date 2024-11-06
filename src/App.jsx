import { useState } from 'react';

const App = () => {
  const [display, setDisplay] = useState('0');
  const [formula, setFormula] = useState('');
  const [evaluated, setEvaluated] = useState(false);

  const isOperator = (char) => {
    return ['-', '+', '*', '/'].includes(char);
  };

  const handleClear = () => {
    setFormula('');
    setDisplay('0');
    setEvaluated(false);
  };

  const handleNumberClick = (number) => {
    if (evaluated) {
      setFormula(number);
      setDisplay(number);
      setEvaluated(false);
    } else {
      if (display === '0') {
        setFormula(number);
        setDisplay(number);
      } else {
        setFormula(formula + number);
        setDisplay(display + number);
      }
    }
  };

  const handleOperator = (operator) => {
    if (evaluated) {
      setFormula(display + operator);
      setDisplay(operator);
      setEvaluated(false);
    } else {
      if (
        operator === '-' &&
        (formula === '' || isOperator(formula.slice(-1)))
      ) {
        setFormula(formula + operator);
        setDisplay(operator);
      } else if (isOperator(formula.slice(-1))) {
        if (isOperator(formula.slice(-2, -1))) {
          setFormula(formula.slice(0, -2) + operator);
        } else {
          setFormula(formula.slice(0, -1) + operator);
        }
        setDisplay(operator);
      } else {
        setFormula(formula + operator);
        setDisplay(operator);
      }
    }
  };

  const handleDecimal = () => {
    if (evaluated) {
      setFormula('0.');
      setDisplay('0.');
      setEvaluated(false);
    } else {
      if (!display.includes('.')) {
        setFormula(formula + '.');
        setDisplay(display + '.');
      }
    }
  };

  const handleEquals = () => {
    if (display === '0') {
      setFormula('');
      setDisplay('0');
    } else if (!evaluated) {
      try {
        let result = eval(formula);
        result = Math.round(result * 10000) / 10000;
        setFormula(result.toString());
        setDisplay(result.toString());
        setEvaluated(true);
      } catch {
        setFormula('');
        setDisplay('Error');
        setEvaluated(true);
      }
    }
  };

  return (
    <main>
      <table>
        <tr>
          <td colSpan={4}>
            <div id="formula">{formula}</div>
          </td>
        </tr>
        <tr>
          <td colSpan={4}>
            <div id="display">{display}</div>
          </td>
        </tr>
        <tr>
          <td colSpan={2}>
            <button id="clear" onClick={handleClear}>
              AC
            </button>
          </td>
          <td>
            <button id="divide" onClick={() => handleOperator('/')}>
              /
            </button>
          </td>
          <td>
            <button id="multiply" onClick={() => handleOperator('*')}>
              X
            </button>
          </td>
        </tr>
        <tr>
          <td>
            <button id="seven" onClick={() => handleNumberClick('7')}>
              7
            </button>
          </td>
          <td>
            <button id="eight" onClick={() => handleNumberClick('8')}>
              8
            </button>
          </td>
          <td>
            <button id="nine" onClick={() => handleNumberClick('9')}>
              9
            </button>
          </td>
          <td>
            <button id="subtract" onClick={() => handleOperator('-')}>
              -
            </button>
          </td>
        </tr>
        <tr>
          <td>
            <button id="four" onClick={() => handleNumberClick('4')}>
              4
            </button>
          </td>
          <td>
            <button id="five" onClick={() => handleNumberClick('5')}>
              5
            </button>
          </td>
          <td>
            <button id="six" onClick={() => handleNumberClick('6')}>
              6
            </button>
          </td>
          <td>
            <button id="add" onClick={() => handleOperator('+')}>
              +
            </button>
          </td>
        </tr>
        <tr>
          <td>
            <button id="one" onClick={() => handleNumberClick('1')}>
              1
            </button>
          </td>
          <td>
            <button id="two" onClick={() => handleNumberClick('2')}>
              2
            </button>
          </td>
          <td>
            <button id="three" onClick={() => handleNumberClick('3')}>
              3
            </button>
          </td>
          <td rowSpan={2}>
            <button id="equals" onClick={handleEquals}>
              =
            </button>
          </td>
        </tr>
        <tr>
          <td colSpan={2}>
            <button id="zero" onClick={() => handleNumberClick('0')}>
              0
            </button>
          </td>
          <td>
            <button id="decimal" onClick={handleDecimal}>
              .
            </button>
          </td>
        </tr>
      </table>
    </main>
  );
};

export default App;
