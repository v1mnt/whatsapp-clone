import styles from "../styles/Home.module.css";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import Profile from "../components/Profile";
import { useState, useEffect } from "react";
import Intro from "../components/Intro";
import ChatWindow from "../components/ChatWindow";
import NewChat from "../components/NewChat";
import Login from "../components/Login";
import api from "./api/api";

export default function Home() {
    const [chatlist, setChatList] = useState([]);
    const [activeChat, setActiveChat] = useState({});
    const [user, setUser] = useState({
        userId: 123,
        avatar: "",
        name: "Marcelo",
    });
    const [showNewChat, setShowNewChat] = useState(false);

    useEffect(() => {
        if (user !== null) {
            let unsub = api.onChatList(user.id, setChatList);
            return unsub;
        }
    }, [user]);

    function handleNewChat() {
        setShowNewChat(true);
    }

    const actionLoginData = async (u) => {
        let newUser = {
            id: u.uid,
            name: u.displayName,
            avatar: u.photoURL,
        };
        await api.addUser(newUser);
        setUser(newUser);
    };

    if (user === null) {
        return <Login onReceiveGoogle={actionLoginData} />;
    }

    return (
        <div className={styles.container}>
            <div className={styles.leftSide}>
                <NewChat
                    chatlist={chatlist}
                    user={user}
                    show={showNewChat}
                    setShow={setShowNewChat}
                />

                <header className={styles.headerLeft}>
                    <div className={styles.profile}>
                        <img src={user.avatar} alt="" />
                        <div className={styles.icons}>
                            <DonutLargeIcon
                                sx={{ color: "#aebac1", cursor: "pointer" }}
                            />
                            <ChatBubbleIcon
                                onClick={handleNewChat}
                                sx={{
                                    color: "#aebac1",
                                    ml: 3.5,
                                    cursor: "pointer",
                                }}
                            />
                            <MoreVertIcon
                                sx={{
                                    color: "#aebac1",
                                    ml: 3.5,
                                    mr: 1,
                                    cursor: "pointer",
                                }}
                            />
                        </div>
                    </div>
                </header>
                <div className={styles.search}>
                    <div className={styles.searchInput}>
                        <SearchIcon
                            fontSize="small"
                            sx={{ color: "#8696a0", mr: 4 }}
                        />
                        <input
                            type="search"
                            placeholder="Pesquisar ou começar uma nova conversa"
                        />
                    </div>
                </div>
                <div className={styles.chatlist}>
                    {chatlist.map((item, key) => (
                        <Profile
                            key={key}
                            data={item}
                            active={activeChat.chatId === chatlist[key].chatId}
                            onClick={() => setActiveChat(chatlist[key])}
                        />
                    ))}
                </div>
            </div>
            <div className={styles.rightSide}>
                {activeChat.chatId === undefined ? (
                    <Intro />
                ) : (
                    <ChatWindow user={user} data={activeChat} />
                )}
            </div>
        </div>
    );
}
