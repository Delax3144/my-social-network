import styles from "./Header.module.css"
import logo from "../../images/logo.png";

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={`container ${styles.inner}`}>
                <a 
                    href="/"
                    className={styles.logo}
                >
                <img className={styles.logoImg} src={logo} alt="Круг - главная" />
                <p className={styles.logoName}>круг</p>
                </a>
                <div className={styles.profile}>
                    <span className={styles.name}>Василий Триндюк</span>
                    <span className={styles.avatar}>ВТ</span>
                </div>
            </div>
        </header>
    )
}

export default Header;