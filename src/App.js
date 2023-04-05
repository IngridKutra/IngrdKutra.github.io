import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Header from './Header';
import styles from "./App.module.css";
import Startsida from './Startsida';
import Receptsida from './Receptsida';
import Kategorisida from './Kategorisida';

import 'bootstrap/dist/css/bootstrap.css'; 

// 5 REST-API
// 6 Skapa react-app

const App = () => {
  const [searchText, setSearchText] = useState ("")
 return <div className={styles.font}>
      <Header setSearchText={setSearchText} />
      <Routes>
        <Route path="/" element={<Startsida searchText={searchText} />} />
        <Route path="Kategorisida/:categories/recipes" element={<Kategorisida searchText={searchText} />} />
        <Route path="/recipes/:recipesId" element={<Receptsida />} />
      </Routes>
      
      
  </div>

}

export default App
