import styles from "../styles/ChatWindow.module.css";
import React from "react";

import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MicIcon from "@mui/icons-material/Mic";
import SendIcon from "@mui/icons-material/Send";
import { useState, useEffect } from "react";
import MessageItem from "./MessageItem";
import api from "../pages/api/api";

export default function ChatWindow({ user, data }) {
    const [text, setText] = useState("");
    const [listening, setListening] = useState(false);
    const [list, setList] = useState([]);
    const [users, setUsers] = useState([]);

    const body = React.createRef();

    useEffect(() => {
        setList([]);
        let unsub = api.onChatContent(data.chatId, setList, setUsers);
        return unsub;
    }, [data.chatId]);

    useEffect(() => {
        if (body.current.scrollHeight > body.current.offsetHeight) {
            body.current.scrollTop =
                body.current.scrollHeight - body.current.offsetHeight;
        }
    }, [list]);

    let recognition = null;
    let SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition !== undefined) {
        recognition = new SpeechRecognition();
    }

    function handleMicClick() {
        if (recognition !== null) {
            recognition.onstart = () => {
                setListening(true);
            };
            recognition.onend = () => {
                setListening(false);
            };
            recognition.onresult = (e) => {
                setText(e.results[0][0].transcript);
            };

            recognition.start();
        }
    }

    function handleInputKeyUp(e) {
        if (e.keyCode == 13) {
            handleSendClick();
        }
    }

    function handleSendClick() {
        if (text !== "") {
            api.sendMessage(data, user.id, "text", text, users);
            setText("");
        }
    }

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.profile}>
                    <img src={data.image} alt="" />
                    <div className={styles.data}>
                        <p className={styles.name}>{data.title}</p>
                        <p className={styles.status}>online</p>
                    </div>
                </div>
                <div className={styles.icons}>
                    <SearchIcon sx={{ color: "#aebac1", cursor: "pointer" }} />
                    <MoreVertIcon
                        sx={{
                            ml: 2,
                            mr: 1,
                            color: "#aebac1",
                            cursor: "pointer",
                        }}
                    />
                </div>
            </header>
            <div ref={body} className={styles.body}>
                {list.map((item, key) => (
                    <MessageItem key={key} user={user} data={item} />
                ))}
            </div>
            <div className={styles.footer}>
                <div className={styles.footerIcons}>
                    <SentimentVerySatisfiedIcon
                        sx={{
                            color: "#8696a0",
                            fontSize: "29px",
                            mr: 1.5,
                            cursor: "pointer",
                        }}
                    />
                    <AttachFileIcon
                        sx={{
                            color: "#8696a0",
                            fontSize: "25px",
                            mr: 2.5,
                            cursor: "pointer",
                        }}
                    />
                </div>
                <div className={styles.input}>
                    <input
                        type="text"
                        placeholder="Mensagem"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        onKeyUp={handleInputKeyUp}
                    />
                </div>
                {text === "" ? (
                    <div onClick={handleMicClick} className={styles.micButton}>
                        <MicIcon
                            sx={{
                                color: listening ? "#126ECE" : "#8696a0",
                                fontSize: "28px",
                                ml: 2,
                                mr: 0.5,
                                cursor: "pointer",
                            }}
                        />
                    </div>
                ) : (
                    <div
                        onClick={handleSendClick}
                        className={styles.sendButton}
                    >
                        <SendIcon
                            sx={{
                                color: "#8696a0",
                                fontSize: "28px",
                                ml: 2,
                                mr: 0.5,
                                cursor: "pointer",
                            }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
