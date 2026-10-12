import PostComposer from "../components/PostComposer/PostComposer";
import PostList from "../components/PostList/PostList";
import type { Post } from "../types/post";
import styles from "../App.module.css";

type FeedPageProps = {
    posts: Post[];
    onPublish: (text: string) => void;
    onLike: (id: string) => void;
};

const FeedPage = ({ posts, onPublish, onLike }: FeedPageProps) => {
    return (
        <>
            <section className={styles.intro} aria-labelledby="feed-title">
                <div>
                    <p className={styles.label}>ЛЕНТА / 01</p>
                    <h1 id="feed-title" className={styles.title}>Мысли между<br />строк.</h1>
                    <p className={styles.description}>
                        Небольшие заметки о том, что замечаем,<br />узнаём и чувствуем.
                    </p>
                </div>
                <PostComposer onPublish={onPublish} />
            </section>
            <PostList title="Свежие строки" posts={posts} onLike={onLike} />
        </>
    );
};

export default FeedPage;
