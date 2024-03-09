import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'

function App() {
  const [beers, setBeers] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.punkapi.com/v2/beers');
        setBeers(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const filteredBeers = beers.filter(beer =>
    beer.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="App">
      <h1> Beers</h1>
      <input
        type="text"
        placeholder="Search beer name"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <div className="beer-list">
        {filteredBeers.map(beer => (
          <div key={beer.id} className="beer-card">
            <img src={beer.image_url} alt={beer.name} className="beer-image" />
            <div className="beer-details">
              <h2>{beer.name}</h2>
              <p>{beer.tagline}</p>
              <p>ABV: {beer.abv}%</p>
              <p>First Brewed: {beer.first_brewed}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
