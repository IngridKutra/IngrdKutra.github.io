import { useState } from "react";
import styles from "./App.module.css";
const Form = ({ recipesId, data, setData }) => {
    const [name, setName] = useState("");
    const [comment, setComment] = useState("");
    const [message, setMessage] = useState("");

    const onSubmit = (e) => {
        e.preventDefault()
        if (name.length > 0 && comment.length > 0) {
            fetch(
                `https://paprika-bxu3y.ondigitalocean.app/recipes/${recipesId}/comments`,
                {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: name,
                        comment: comment,
                    }),
                }
            ).then((res) => {
                if (res.status === 200) {
                    setName("");
                    setComment("");            
                    setMessage("Tack för din kommentar!");
                    return res.json()
                } else {
                    setMessage("Något gick fel");
                }
            }).then((newComment) => {
                setData([...data, newComment])
            })
        } else {
            setMessage("Fyll i alla fält");

        }
    };


    // 4.1 Kommentarsfunktion
    return (
        <form onSubmit={onSubmit}>
            <input
                type="text"
                placeholder="Namn"
                value={name}
                onChange={(e) => {
                    setName(e.target.value);
                }}
            />{" "}
            <br />
            <textarea
                type="text"
                placeholder="Skriv en kommentar här..."
                value={comment}
                onChange={(e) => {
                    setComment(e.target.value);
                }}
            ></textarea>
            <button className={styles.submit}>
                Skicka
            </button>
            {<div>{message ? <p>{message}</p> : null}</div>}
        </form>
    );
};

export default Form
