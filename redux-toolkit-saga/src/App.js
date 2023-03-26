
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { getCatsFetch } from './catState';

function App() {
  const cats = useSelector(state => state.cats.cats);
  const dispath = useDispatch();

  useEffect(() => {
    dispath(getCatsFetch());
  }, [dispath]);

  return (
    <div className="App">
      <h1>CAT SPECIES GALLERY</h1>
      <p>Images of different species of cats. Lots of cats for your viewing pleasure.</p>
      <hr />
      <div className="Gallery">
        {cats.map(cat =>
          <div key={cat.id} className="row">
            <div className="column column-left">
              <img
                alt={cat.name}
                src={`https://cdn2.thecatapi.com/images/${cat.reference_image_id}.jpg`}
                width="200"
                height="200"
              />
            </div>
            <div className="column column-right">
              <h2>{cat.name}</h2>
              <h3>Temperament: {cat.temperament}</h3>
              <p>{cat.description}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
