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
            <div>
                <h2>Bem vindo!</h2>
            </div>
            <button onClick={handleLoginGoogle}>
                Fazer login com o google
            </button>
        </div>
    );
}
