import { Link, useParams } from "react-router-dom";
import PostList from "../components/PostList/PostList";
import { users } from "../data/users";
import type { Post } from "../types/post";
import styles from "./ProfilePage.module.css";

type ProfilePageProps = {
    posts: Post[];
    onLike: (id: string) => void;
};

const ProfilePage = ({ posts, onLike }: ProfilePageProps) => {
    const { id } = useParams();
    const user = users.find((item) => item.id === id);

    if (!user) {
        return (
            <section className={styles.notFound}>
                <h1>Профиль не найден</h1>
                <Link to="/">Вернуться в ленту</Link>
            </section>
        );
    }

    const userPosts = posts.filter((post) => post.authorId === user.id);

    return (
        <>
            <section className={styles.profile} aria-labelledby="profile-title">
                <div className={styles.details}>
                    <span className={styles.avatar} aria-hidden="true">{user.initials}</span>
                    <span className={styles.username}>@{user.username}</span>
                    <span className={styles.count}>ЗАМЕТОК: {userPosts.length}</span>
                </div>
                <div className={styles.description}>
                    <p className={styles.label}>ЛИЧНАЯ СТРАНИЦА</p>
                    <h1 id="profile-title" className={styles.name}>{user.name}</h1>
                    <p className={styles.bio}>{user.bio}</p>
                </div>
            </section>
            <PostList title="Из записанного" posts={userPosts} onLike={onLike} />
        </>
    );
};

export default ProfilePage;
