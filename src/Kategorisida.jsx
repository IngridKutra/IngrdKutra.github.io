import { useState } from "react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from "react-bootstrap";
import ReactStars from "react-rating-stars-component";

const imgStyle = {
    width: "100%",
    height: "450px",
}
const receptLink ={
    textDecoration: "none",
    color: "#8B6E4E"
}
const textStyle = {
    backgroundColor: "#E3D7C8",
    padding: "8px 16px",
      height: "400px",
}

const kategoriCardStyle= {
    marginBottom:"2%"
}

const Kategorisida = ({searchText}) => {
    const {categories}  = useParams();
    const [receptCategory, setRecept] = useState();
useEffect(() => {   
     fetch(`https://paprika-bxu3y.ondigitalocean.app/categories/${categories}/recipes?query=${searchText}`)
         .then(res => res.json())
         .then(data => setRecept(data))
    
}, [categories, searchText])

   // 2.7 Receptkort
   // 3 Kategorisida

     return (   
         <Container>   
          <Row>
              {receptCategory?.map((recept) =>
                <Col sm={12}  md={6} lg={4} key={recept._id}style={kategoriCardStyle}>
                   
                        <NavLink to={`/recipes/${recept._id}`} style={receptLink}>
                            <img alt={recept.title} src={recept.imageUrl} style={imgStyle} />
                            <div style={textStyle}>
                                <h2><b>{recept.title}</b>
                                  <ReactStars
                                      count={5}
                                      edit= {false}
                                      size={35}  
                                      isHalf= {true}
                                      color= {'#EAEEC5'}
                                      activeColor= {"#8B6E4E"}
                                      value={recept.avgRating}                                
                                /></h2>
                                <p> {recept.description}</p>
                              <b>{recept.categories} || {recept.timeInMins} Minuter</b>
                              
                            </div>
                        </NavLink>
                   
                    </Col> )}
                  
            </Row>
            

        </Container>  
       
  ) 
}
export default Kategorisida