import styles from "../styles/NewChat.module.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState, useEffect } from "react";
import api from "../pages/api/api";

export default function NewChat({ user, chatlist, show, setShow }) {
    const [list, setList] = useState([]);

    useEffect(() => {
        const getList = async () => {
            if (user !== null) {
                let results = await api.getContactList(user.id);
                setList(results);
            }
        };
        getList();
    }, [user]);

    async function addNewChat(user2) {
        await api.addNewChat(user, user2);

        handleClose();
    }

    function handleClose() {
        setShow(false);
    }

    return (
        <div className={styles.container} style={{ left: show ? 0 : -415 }}>
            <div className={styles.header}>
                <div className={styles.title}>
                    <div onClick={handleClose} className={styles.icon}>
                        <ArrowBackIcon
                            sx={{ color: "#d9dee0", cursor: "pointer" }}
                        />
                    </div>
                    <div className={styles.text}>Nova conversa</div>
                </div>
            </div>
            <div className={styles.list}>
                {list.map((item, key) => (
                    <div
                        onClick={() => addNewChat(item)}
                        className={styles.newChatItem}
                        key={key}
                    >
                        <div className={styles.profile}>
                            <div className={styles.image}>
                                <img src={item.avatar} alt="" />
                            </div>
                            <div className={styles.profileInfo}>
                                <div className={styles.name}>{item.name}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
