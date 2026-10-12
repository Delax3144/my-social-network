import { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import FeedPage from "./pages/FeedPage";
import ProfilePage from "./pages/ProfilePage";
import { currentUser, users } from "./data/users";
import data from "../data.json";
import styles from "./App.module.css";
import type { Post } from "./types/post";

function App() {
    const [posts, setPosts] = useState<Post[]>(() => {
        return data.posts.map((post) => ({
            ...post,
            authorId: users.find((user) => user.username === post.username)?.id ?? post.username,
            isLiked: false,
        })).sort((first, second) => Date.parse(second.createdAt) - Date.parse(first.createdAt));
    });

    const handlePublish = (text: string) => {
        if (text.trim() === "") return;

        const newPost: Post = {
            id: crypto.randomUUID(),
            authorId: currentUser.id,
            username: currentUser.username,
            text,
            createdAt: new Date().toISOString(),
            isLiked: false,
        };
        setPosts((previousPosts) => [newPost, ...previousPosts]);
    };

    const handleLike = (id: string) => {
        setPosts((previousPosts) => previousPosts.map((post) => {
            return post.id === id ? { ...post, isLiked: !post.isLiked } : post;
        }));
    };

    return (
        <>
            <Header />
            <main className="container">
                <Routes>
                    <Route path="/" element={<FeedPage posts={posts} onPublish={handlePublish} onLike={handleLike} />} />
                    <Route path="/users/:id" element={<ProfilePage posts={posts} onLike={handleLike} />} />
                    <Route path="*" element={
                        <section className={styles.notFound}>
                            <h1>Страница не найдена</h1>
                            <Link to="/">Вернуться в ленту</Link>
                        </section>
                    } />
                </Routes>
                <footer className={styles.footer}>
                    <p>Пока это всё. Оставим немного места для нового.</p>
                    <p>threloom · пространство для мыслей</p>
                </footer>
            </main>
        </>
    );
}

export default App;
