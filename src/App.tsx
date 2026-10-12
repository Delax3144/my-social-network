import { useState } from "react";

import PostCard from "./components/PostCard/PostCard"
import PostComposer from "./components/PostComposer/PostComposer";
import data from "../data.json";
import styles from "./App.module.css";
import type { Post } from "./types/post";

function App() {
  const initialState = data.posts;

  const [posts, setPosts] = useState(initialState);

  const handlePublish = (text: string) => {
    const newPost: Post = {
      id: crypto.randomUUID(),
      username: "Delax314",
      text: text,
      createdAt: new Date().toISOString(),
    };
    setPosts([newPost, ...posts])
  }

  return (
    <main className="container">
      <section className={styles.intro} aria-labelledby="feed-title">
        <div>
          <p className={styles.label}>ЛЕНТА / 01</p>
          <h1 id="feed-title" className={styles.title}>Мысли между<br />строк.</h1>
          <p className={styles.description}>
            Небольшие заметки о том, что замечаем,<br />узнаём и чувствуем.
          </p>
        </div>
        <PostComposer onPublish={handlePublish} />
      </section>
      <section aria-labelledby="posts-title">
        <div className={styles.feedHeading}>
          <h2 id="posts-title" className={styles.feedTitle}>Свежие строки</h2>
          <span className={styles.count}>{String(posts.length).padStart(2, "0")} / {String(posts.length).padStart(2, "0")}</span>
        </div>
        {posts.map((post, index) => (
          <PostCard key={post.id} post={post} number={index + 1} />
        ))}
      </section>
      <footer className={styles.footer}>
        <p>Пока это всё. Оставим немного места для нового.</p>
        <p>threloom · пространство для мыслей</p>
      </footer>
    </main>
  )
}

export default App



