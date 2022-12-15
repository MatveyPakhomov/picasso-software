import "./App.css";
import { useState } from "react";

function App() {
  const [values, setValues] = useState([]);
  console.log(values);

  const getCompanies = async (name) => {
    const url = `https://autocomplete.clearbit.com/v1/companies/suggest?query=:${name}`;
    let response = await fetch(url);

    if (response.ok) {
      let json = await response.json();
      setValues(json);
    } else {
      console.error(response.status, response.statusText);
    }
  };

  const handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    getCompanies(value).catch((err) => {
      console.error(err);
    });
  };

  const renderAutocomplete = () => {
    return values.map((item) => {
      return (
        <li className="autocomplete__item">
          <img src={item.logo} alt="" className="autocomplete__image" />
          <span className="autocomplete__span">
            <p className="autocomplete__company">{item.name}</p>
            <p className="autocomplete__domain">{item.domain}</p>
          </span>
        </li>
      );
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <form className="form" autoComplete="off">
          <p className="input__label">Компания</p>
          <input
            type="text"
            name="name"
            className="input"
            onChange={handleChange}
          />
          {values.length ? (
            <ul className="autocomplete">{renderAutocomplete()}</ul>
          ) : null}
        </form>
      </header>
    </div>
  );
}

export default App;
