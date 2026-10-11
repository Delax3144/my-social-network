import { useState } from "react";

import PostCard from "./components/PostCard/PostCard"
import PostComposer from "./components/PostComposer/PostComposer";
import data from "../data.json";
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
      <h1>Лента</h1>
      <p>Мысли, которыми хочется поделиться</p>
      <PostComposer onPublish={handlePublish}/>
      <h2>Последние посты</h2>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </main>
  )
}

export default App
