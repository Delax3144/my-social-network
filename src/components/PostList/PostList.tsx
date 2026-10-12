import PostCard from "../PostCard/PostCard";
import { users } from "../../data/users";
import type { Post } from "../../types/post";
import styles from "./PostList.module.css";

type PostListProps = {
    title: string;
    posts: Post[];
    onLike: (id: string) => void;
};

const PostList = ({ title, posts, onLike }: PostListProps) => {
    const count = String(posts.length).padStart(2, "0");

    return (
        <section aria-label={title}>
            <div className={styles.heading}>
                <h2 className={styles.title}>{title}</h2>
                <span className={styles.count}>{count} / {count}</span>
            </div>
            {posts.length === 0 ? (
                <p className={styles.empty}>Здесь пока нет заметок. Первая появится после публикации.</p>
            ) : (
                posts.map((post, index) => (
                    <PostCard
                        key={post.id}
                        post={post}
                        author={users.find((user) => user.id === post.authorId)}
                        number={index + 1}
                        onLike={onLike}
                    />
                ))
            )}
        </section>
    );
};

export default PostList;
