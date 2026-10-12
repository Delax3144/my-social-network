import { Link, NavLink } from "react-router-dom";
import { currentUser } from "../../data/users";
import styles from "./Header.module.css";

const Header = () => {
    const profileUrl = `/users/${currentUser.id}`;
    const getLinkClass = ({ isActive }: { isActive: boolean }) => {
        return `${styles.link} ${isActive ? styles.active : ""}`;
    };

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <Link to="/" className={styles.logo} aria-label="Threloom — главная">
                    <span className={styles.logoSymbol} aria-hidden="true">#</span>
                    <span>threloom</span>
                </Link>
                <nav className={styles.navigation} aria-label="Основная навигация">
                    <NavLink to="/" end className={getLinkClass}>Лента</NavLink>
                    <NavLink to={profileUrl} className={getLinkClass}>Мой профиль</NavLink>
                </nav>
                <Link to={profileUrl} className={styles.avatar} aria-label={`Мой профиль: ${currentUser.name}`}>
                    {currentUser.initials}
                </Link>
            </div>
        </header>
    );
};

export default Header;
