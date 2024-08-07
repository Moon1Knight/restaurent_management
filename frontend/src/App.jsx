// import React from 'react';
// import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
// import Menu from './components/Menu'; 
// import OrderPlacing from './components/OrderPlacing';
// import './App.css';
// import OrderView from './components/OrderView';

// function App() {
//   return (
//     <Router>
//       <div>
//         <main>
//           <Routes>
//             <Route path="/menu" element={<Menu />} />
//             <Route path="/order" element={<OrderPlacing />} />
//             <Route path="/" element={<Home />} />
//             <Route path="/orderview" element={<OrderView/>}/>
//           </Routes>
//         </main>
//       </div>
//     </Router>
//   );
// }

// function Home() {
//   return (
//     <div>
//       <h1>Welcome to the Restaurant Management App</h1>
//     </div>
//   );
// }

// export default App;


import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Menu from './components/Menu'; 
import OrderPlacing from './components/OrderPlacing';
import './App.css';
import OrderView from './components/OrderView';


function App() {
  return (
    <Router>
      <div>
        <main>
          <Routes>
            <Route path="/menu" element={<Menu />} />
            <Route path="/order" element={<OrderPlacing />} />
            <Route path="/" element={<Home />} />
            <Route path="/orderview" element={<OrderView />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1>Khish Kitchen</h1>
        <p>Welcome to Khish Kitchen! We serve the best food in town. Come and enjoy our delicious meals.</p>
        <p>Experience the best dining with us!</p>
        <div className="home-buttons">
          <Link to="/menu" className="home-button">Menu</Link>
          <Link to="/order" className="home-button">Order Placing</Link>
          <Link to="/orderview" className="home-button">Order View</Link>
        </div>
      </div>
    </div>
  );
}

export default App;
