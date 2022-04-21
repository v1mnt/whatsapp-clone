import { Button } from "@mui/material";
import api from "../pages/api/api";
import styles from "../styles/Login.module.css";

export default function Login({ onReceiveGoogle }) {
    async function handleLoginGoogle() {
        let result = await api.googleLogar();

        if (result) {
            onReceiveGoogle(result.user);
        } else {
            alert("Error!");
        }
    }

    return (
        <div className={styles.login}>
            <Button
                sx={{ fontSize: "15px", padding: "15px" }}
                onClick={handleLoginGoogle}
                variant="contained"
            >
                Logar com o google
            </Button>
        </div>
    );
}
