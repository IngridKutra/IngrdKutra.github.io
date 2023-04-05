import { useState } from "react";
import ReactStars from "react-rating-stars-component";
import { Row, Col } from "react-bootstrap";
import styles from "./App.module.css";

// 2.6 Rating
const rattDivStyle = {
    width: "100%",
    height: "200px",
    margin: "auto",
    textAlign: "center",
    color: "#8B6E4E",
    backgroundColor: 'rgb(227, 215, 200)',
    padding: "16px 32px",
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)"
}
const RatingText = () => (
    <>
        <h3>Vad tycker du om receptet?</h3>
        <p>Klicka på en eller flera stjärnor för att ge ditt betyg, tack!</p>

    </>
)
const RatingsPost = ({ recipesId }) => {

    const [Rating, setRating] = useState()
    const [message, setMessage] = useState()

    if (Rating) {
        fetch(
            `https://paprika-bxu3y.ondigitalocean.app/recipes/${recipesId}/ratings`,
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    rating: `${Rating}`
                }),
            })


            .then((res) => {
                if (res.status === 200) {
                    setMessage("Tack för din röst!")

                } else {
                    setMessage("Något gick fel")

                }
            })


    }

    return (

        <Row style={rattDivStyle}>
            <Col >
                {message ? <h3>{message}</h3> :
                    <>
                        <RatingText />
                <div className={styles.StarsInCenter}>
                        <ReactStars
                            count={5}
                            onChange={setRating}
                            size={35}
                            isHalf={true}
                            color={'#EAEEC5'}
                            activeColor={"#8B6E4E"}

                        />
                        </div>
                    </>
                }
            </Col>
        </Row>

    )
}

export default RatingsPost