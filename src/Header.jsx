import { NavLink } from "react-router-dom"
import { useState, useEffect } from "react"
import styles from "./App.module.css"
import SearchBar from "./SearchBar"
import { Container, Row, Col } from "react-bootstrap";
const Btn1Style = {
    color: '#eaeac5'
};

const containerStyle = {
    marginBottom: '1%'
}
const Header = ({ setSearchText }) => {
    const [categories, setCategories] = useState([]);

    useEffect(
        () => {
            fetch('https://paprika-bxu3y.ondigitalocean.app/categories')
                .then(res => res.json())
                .then(data => setCategories(data));
        },
        []

    )

    // 2.1 Sökrutan
    // 2.2 Kategoriknappar
    // 2.3 Antal recept 
    return <>
        <Container style={containerStyle}>
            <Row className={styles.tittle}>
                <Col>
                    <h1 ><NavLink to="/" className={styles.h1}>Peppers</NavLink></h1>
                    <h2>Pasteries</h2>
                </Col>
            </Row>
            <br />
            <SearchBar setSearchText={setSearchText} />
            <br />
            <Row >
                {categories.map(category => <Col key={category.name} className={styles.categoriButton}><button className={styles.btn}><NavLink to={encodeURI(`Kategorisida/${category.name}/recipes`)} className={({ isActive }) => isActive ? styles.activeLink : styles.inactiveLink} style={Btn1Style}>{category.name} ({category.count})</NavLink></button></Col>)}
            </Row>
        </Container>
    </>
}
export default Header