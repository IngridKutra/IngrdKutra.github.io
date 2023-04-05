import { Row, Col } from "react-bootstrap";
import { useEffect } from "react"
import styles from "./App.module.css";

/* 4.1 Kommentarsfält */
const CommentList = ({ recipesId, data, setData }) => {

    useEffect(() => {
        fetch(`https://paprika-bxu3y.ondigitalocean.app/recipes/${recipesId}/comments`)
            .then((response) => response.json())
            .then((data) => setData(data));
    }, [recipesId, setData])

    return (

        data.map(({ name, comment }) => ( 
            <Row className={styles.commentList}>
                <Col >
                    <div key={data._id} >
                        <h4>{name} </h4>
                        <p>{comment}</p>
                    </div>
                </Col>
            </Row>
        ))
    )

}
export default CommentList