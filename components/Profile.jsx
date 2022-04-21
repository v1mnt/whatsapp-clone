import { useState, useEffect } from "react";
import styles from "../styles/Profile.module.css";

export default function Chat({ onClick, active, data }) {
    const [time, setTime] = useState("");
    console.log(data.image);

    useEffect(() => {
        if (data.lastMessageDate > 0) {
            let d = new Date(data.lastMessageDate.seconds * 1000);
            let hours = d.getHours();
            let minutes = d.getMinutes();
            hours = hours < 10 ? "0" + hours : hours;
            minutes = minutes < 10 ? "0" + minutes : minutes;
            setTime(`${hours}:${minutes}`);
        }
    }, [data]);

    return (
        <div
            onClick={onClick}
            className={active ? styles.active : styles.container}
        >
            <div className={styles.image}>
                <img src={data.image} alt="" />
            </div>
            <div className={styles.profile}>
                <div className={styles.line}>
                    <div className={styles.name}>{data.title}</div>
                    <div className={styles.date}>{time}</div>
                </div>
                <div className={styles.message}>
                    <p>{data.lastMessage}</p>
                </div>
            </div>
        </div>
    );
}
