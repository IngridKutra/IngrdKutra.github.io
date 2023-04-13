import { useState } from "react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import ReactStars from "react-rating-stars-component";


// 2 Startsida
const imgStyle = {
    width: "100%",
    height: "200px",
    objectFit: "cover",
  }
const receptLink = {
    textDecoration: "none",
    color: "#8B6E4E",
    
}

const titleStyle = {
    fontSize: "1.2rem", // adjust the font size as needed
    margin: "0",
    lineHeight: "1.2",
    fontWeight: "bold"
  }

const textStyle = {
    backgroundColor: "#E3D7C8",
    padding: "8px 16px",
    height: "200px",
    fontSize: "16px",
}

const kategoriCardStyle = {
    marginBottom: "2%"
}

const Recept = ({ searchText }) => {
    const [receptList, setRecept] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        setIsLoading(true)
        fetch(`https://api.spoonacular.com/recipes/search?apiKey=9ac733f6a6314d859f64d2c2012285e2&query=${searchText}`)
            .then(res => res.json())
            .then(data => {
                setIsLoading(false)
                setRecept(data.results)
                console.log("receptList: ", receptList)
            })

    }, [searchText])

   

// 2.7 Receptkort

    return (
        <Container>
            <Row>
                {isLoading ?
                    <p>Laddar...</p> : receptList.length === 0 ?
                        <p>Inga bakverk hittades!</p> : receptList.map((recept) =>
                        <Col sm={12} md={6} lg={4} key={recept.id} style={kategoriCardStyle}>
                        <NavLink to={`/recipes/${recept.id}`} recipeId={recept.id} style={receptLink}>
  <img alt={recept.title} src={`https://spoonacular.com/recipeImages/${recept.image}`} style={imgStyle} />
  <div style={textStyle}>
    <h2 style={titleStyle}><b>{recept.title}</b>
      <ReactStars
        count={5}
        edit={false}
        size={35}
        isHalf={true}
        color={'#EAEEC5'}
        activeColor={"#8B6E4E"}
        value={recept.rating}
      />   
    </h2>
    <b>{recept.readyInMinutes} Minuter</b>
  </div>
</NavLink>
                    </Col>)}
            </Row>
        </Container>
    )
}

export default Recept
