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
      <h2>Последние посты</h2>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </main>
  )
}

export default App


