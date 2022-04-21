import styles from "../styles/MessageItem.module.css";
import { useState, useEffect } from "react";

export default function MessageItem({ data, user }) {
    const [time, setTime] = useState("");

    useEffect(() => {
        if (data.date > 0) {
            let d = new Date(data.date.seconds * 1000);
            let hours = d.getHours();
            let minutes = d.getMinutes();
            hours = hours < 10 ? "0" + hours : hours;
            minutes = minutes < 10 ? "0" + minutes : minutes;
            setTime(`${hours}:${minutes}`);
        }
    }, [data]);

    return (
        <div
            style={{
                justifyContent:
                    user.id === data.author ? "flex-end" : "flex-start",
            }}
            className={styles.messageLine}
        >
            <div
                className={styles.messageItem}
                style={{
                    backgroundColor:
                        user.id === data.author ? "#005c4b" : "#202c33",
                }}
            >
                <div className={styles.messageText}>{data.body}</div>
                <div className={styles.messageDate}>{time}</div>
            </div>
        </div>
    );
}
