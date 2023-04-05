import Form from './Form';
import CommentList from './CommentList';
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from 'react-router-dom';
import styles from "./App.module.css";
import ReactStars from "react-rating-stars-component";
import { Container, Row, Col, Card } from "react-bootstrap";
import RatingsPost from './Ratings';

// 4. Receptsida
const Receptsida = () => {
    const { recipesId } = useParams();
    const [Recept, setRecept] = useState();
    const [data, setData] = useState([])
    useEffect(() => {
        fetch(`https://paprika-bxu3y.ondigitalocean.app/recipes/${recipesId}`)
            .then(res => res.json())
            .then(data => setRecept(data))

    }, [recipesId])

// 2.4 Tid det tar att göra receptet

    return (
        <Container>
            <Row>{Recept ?
                <Col key={Recept._id} >
                    <Card className={styles.receptFlexContainer}>
                        <Card.Body className={styles.receptCardText} style={{ padding: 0 }} >
                            <div style={{
                                backgroundImage: `url(${Recept.imageUrl}) `, backgroundRepeat: 'no-repeat',
                                backgroundSize: 'cover', backgroundPosition: 'center'
                            }} className={styles.cardBody}>
                                <div style={{ backgroundColor: '#FFF8F0', opacity: '0.7', width: "80%", margin: '3% auto', padding: 16 }}>
                                    <div className={styles.StarsInRight}>
                                        <ReactStars
                                            count={5}
                                            edit={false}
                                            size={35}
                                            isHalf={true}
                                            color={'#EAEEC5'}
                                            activeColor={"#8B6E4E"}
                                            value={Recept.avgRating} /></div>
                                    <h2>{Recept.title}</h2>
                                    <p>{Recept.description}</p>
                                    <ul>
                                        {Recept.ingredients.map((ingredient, index) =>
                                            <li key={index}>  {ingredient.amount} {ingredient.unit} {ingredient.name}</li>)}
                                    </ul>
                                    <Card.Text>

                                        <p>GÖR SÅ HÄR...</p>
                                        <ol>
                                            {Recept.instructions.map((instruction, index) =>
                                                <li key={index}> {instruction}</li>)}
                                        </ol>
                                        <strong>{Recept.categories} || {Recept.timeInMins} Minuter </strong>

                                    </Card.Text>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                : <>Loading...</>}
            </Row>
            <br />

            <RatingsPost recipesId={recipesId} onChange={false} />


            <br />
            <Row className={styles.form}>
                <Col >
                    <h3>Kommentarer</h3>
                    <Form recipesId={recipesId} data={data} setData={setData} />
                </Col>
            </Row>
            <br />
            <CommentList recipesId={recipesId} data={data} setData={setData} />

        </Container>

    )

}



export default Receptsida