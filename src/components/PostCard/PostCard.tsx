import { useState } from "react";
import type { Post } from "../../types/post";
import styles from "./PostCard.module.css";

type PostCardProps = {
    post: Post;
    number: number;
};

const PostCard = ({ post, number }: PostCardProps) => {
    const [like, setLike] = useState(false);
    const initials = post.username.trim().split(/\s+/).map((word) => word[0]).slice(0, 2).join("").toUpperCase();
    const date = new Date(post.createdAt);
    const dateLabel = date.toLocaleDateString("ru-RU", { day: "numeric", month: "short" });
    const timeLabel = date.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" });

    return (
        <article className={styles.post}>
            <div className={styles.author}>
                <span className={styles.avatar} aria-hidden="true">{initials}</span>
                <div className={styles.authorInfo}>
                    <span className={styles.name}>{post.username}</span>
                    <time className={styles.date} dateTime={post.createdAt}>{dateLabel} · {timeLabel}</time>
                </div>
            </div>

            <div className={styles.content}>
                <p className={styles.label}>ЗАМЕТКА / {String(number).padStart(2, "0")}</p>
                <p className={styles.text}>{post.text}</p>
                <button
                    type="button"
                    className={`${styles.reaction} ${like ? styles.liked : ""}`}
                    aria-pressed={like}
                    aria-label={like ? "Убрать отклик" : "Откликнуться"}
                    onClick={() => setLike(!like)}
                >
                    <span className={styles.star} aria-hidden="true">{like ? "★" : "☆"}</span>
                    <span>Отклик</span>
                    <span>{like ? 1 : 0}</span>
                </button>
            </div>
        </article>
    );
};

export default PostCard;
