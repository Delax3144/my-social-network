import styles from "./Header.module.css";

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <a href="/" className={styles.logo} aria-label="Threloom — главная">
                    <span className={styles.logoSymbol} aria-hidden="true">#</span>
                    <span>threloom</span>
                </a>

                <nav className={styles.navigation} aria-label="Основная навигация">
                    <a href="/" className={`${styles.link} ${styles.active}`} aria-current="page">
                        Лента
                    </a>
                    <a href="/users/vasiliy" className={styles.link}>Мой профиль</a>
                </nav>

                <span className={styles.avatar} aria-label="Василий Триндюк">ВТ</span>
            </div>
        </header>
    );
};

export default Header;
