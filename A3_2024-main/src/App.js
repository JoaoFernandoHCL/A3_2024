
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Aside from './componentes/aside';
import Footer from './componentes/footer';
import Header from './componentes/header';
import HomePage from './paginas/home';

function App() {
  return (
    <div>
      <Header />
      <div>
        <Aside />
        <main className='displayFlex'>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/sobre' element={<HomePage />} />
            <Route path='/serviços' element={<HomePage />} />
            <Route path='/contatos' element={<HomePage />} />
          </Routes>

        </main>
      </div>
      <Footer />

    </div>
  );
}

export default App;
