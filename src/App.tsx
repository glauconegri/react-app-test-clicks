import React, {useState} from 'react';
import './App.css';

type Data = {
  value: string;
  state: 'SELECTED' | 'UNSELECTED' | 'WRONG';
}

function Test({data}: {data: Record<string, string>}) {
  const [countries, setCountries] = useState<Data[]>(
    [...Object.keys(data), ...Object.values(data)]
      .sort(() => Math.random() - 0.5)
      .map((item) => {
      return {
        value: item, state: 'UNSELECTED'
      }
    })
  );

  const [selected, setSelected] = useState<Data>();

  if(countries.length === 0) {
    return <div className="App">Congratulations</div>
  }

  const clickHandler = (selecionado: Data) => {
    if(!selected){
      setSelected(selecionado);
      const newCountries = countries.map((country) => {
        if (country.value === selecionado.value) {
          return {
            ...country,
            state: 'SELECTED'
          }
        }

        return {...country, state: 'UNSELECTED'};
      }) as Data[];

      setCountries(newCountries);
    } else {

      if(selected.value === data[selecionado.value] || data[selected.value] === selecionado.value){
        const filtered = countries.filter((country) => {
          return !(country.value === selected.value || country.value === selecionado.value);
        });

        setCountries(filtered);
      } else {
        const newCountries = countries.map((country) => {
          if (country.value === selecionado.value) {
            return {
              ...country,
              state: 'WRONG'
            }
          }
  
          return country;
        }) as Data[];
  
        setCountries(newCountries);
      }

      setSelected(undefined);
    }
  }
  

  return (
    <div className="App">
       {countries.map((item, index) => {
          return (
            <button 
              key={index}
              className={item.state === 'SELECTED' ? 'selected' : item.state === 'WRONG' ? 'wrong' : '' }
              onClick={() => {
                clickHandler(item)}
              }>
              {item.value}
            </button>
          )
            })}
    </div>
  );
}

function App() {
  return (
    <Test data={{frança: "paris", brasil: "brasilia"}} />
  );
}

export default App;
