import { Link } from "react-router-dom";
import type { Post } from "../../types/post";
import type { User } from "../../types/user";
import styles from "./PostCard.module.css";

type PostCardProps = {
    post: Post;
    author?: User;
    number: number;
    onLike: (id: string) => void;
};

const PostCard = ({ post, author, number, onLike }: PostCardProps) => {
    const name = author?.name ?? post.username;
    const initials = author?.initials ?? name.slice(0, 1).toUpperCase();
    const date = new Date(post.createdAt);
    const dateLabel = date.toLocaleDateString("ru-RU", { day: "numeric", month: "short" });
    const timeLabel = date.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" });
    const profileUrl = `/users/${encodeURIComponent(post.authorId)}`;

    return (
        <article className={styles.post}>
            <div className={styles.author}>
                <Link to={profileUrl} className={styles.avatar} aria-label={`Профиль: ${name}`}>
                    {initials}
                </Link>
                <div className={styles.authorInfo}>
                    <Link to={profileUrl} className={styles.name}>{name}</Link>
                    <time className={styles.date} dateTime={post.createdAt}>{dateLabel} · {timeLabel}</time>
                </div>
            </div>
            <div className={styles.content}>
                <p className={styles.label}>ЗАМЕТКА / {String(number).padStart(2, "0")}</p>
                <p className={styles.text}>{post.text}</p>
                <button
                    type="button"
                    className={`${styles.reaction} ${post.isLiked ? styles.liked : ""}`}
                    aria-pressed={post.isLiked}
                    aria-label={post.isLiked ? "Убрать отклик" : "Откликнуться"}
                    onClick={() => onLike(post.id)}
                >
                    <span className={styles.star} aria-hidden="true">{post.isLiked ? "★" : "☆"}</span>
                    <span>Отклик</span>
                    <span>{post.isLiked ? 1 : 0}</span>
                </button>
            </div>
        </article>
    );
};

export default PostCard;
