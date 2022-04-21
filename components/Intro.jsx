import styles from "../styles/Intro.module.css";
import logointro from "../assets/img/logointro.png";
import LaptopIcon from "@mui/icons-material/Laptop";
import LockIcon from "@mui/icons-material/Lock";

export default function Intro() {
    return (
        <div className={styles.intro}>
            <img src={logointro.src} alt="" />
            <div>
                <h1>WhatsApp Web</h1>
            </div>
            <div className={styles.textTop}>
                Agora você pode enviar e receber mensagens sem precisar manter
                seu celular conectado à internet.
                <br></br>
                Use o WhatsApp em até quatro aparelhos conectados e um celular
                ao mesmo tempo.
            </div>
            <div className={styles.hr}></div>
            <div className={styles.textBottom}>
                <span>
                    <LaptopIcon fontSize="small" sx={{ mr: 1 }} />
                </span>
                Make calls from desktop with WhatsApp for Windows.
                <a
                    style={{ color: "#00a884", marginLeft: "5px" }}
                    href="https://www.whatsapp.com/download"
                    target="_blank"
                >
                    Baixe aqui
                </a>
            </div>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    position: "absolute",
                    bottom: 60,
                    fontSize: "14px",
                    color: "#667781",
                }}
            >
                <LockIcon fontSize="small" />
                Protegido com a criptografia de ponta a ponta
            </div>
        </div>
    );
}
