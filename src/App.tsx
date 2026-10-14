import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import DeletePostDialog from "./components/DeletePostDialog/DeletePostDialog";
import FeedPage from "./pages/FeedPage";
import ProfilePage from "./pages/ProfilePage";
import { currentUser, users } from "./data/users";
import data from "../data.json";
import styles from "./App.module.css";
import type { Post } from "./types/post";
import { loadPosts, savePosts } from "./lib/postStorage";

function App() {
    const [deletePostId, setDeletePostId] = useState<string | null>(null);
    const [posts, setPosts] = useState<Post[]>(() => {
        const initialPosts = data.posts.map((post) => ({
            ...post,
            authorId: users.find((user) => user.username === post.username)?.id ?? post.username,
            isLiked: false,
        })).sort((first, second) => Date.parse(second.createdAt) - Date.parse(first.createdAt));
        return loadPosts(initialPosts);
    });

    useEffect(() => {
        if (!savePosts(posts)) {
            console.warn("Не удалось сохранить посты в браузере. После перезагрузки изменения могут исчезнуть.");
        }
    }, [posts]);

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

    const postToDelete = posts.find((post) => post.id === deletePostId);

    const handleDelete = (id: string) => {
        const post = posts.find((item) => item.id === id);
        if (!post || post.authorId !== currentUser.id) return;
        setDeletePostId(id);
    };

    const confirmDelete = () => {
        setPosts((previousPosts) => previousPosts.filter((post) => {
            return post.id !== deletePostId || post.authorId !== currentUser.id;
        }));
        setDeletePostId(null);
    };

    const handleLike = (id: string) => {
        setPosts((previousPosts) => previousPosts.map((post) => {
            return post.id === id ? { ...post, isLiked: !post.isLiked } : post;
        }));
    };

    return (
        <>
            <Header />
            {postToDelete && (
                <DeletePostDialog
                    text={postToDelete.text}
                    onCancel={() => setDeletePostId(null)}
                    onConfirm={confirmDelete}
                />
            )}
            <main className="container">
                <Routes>
                    <Route path="/" element={<FeedPage posts={posts} onPublish={handlePublish} onLike={handleLike} />} />
                    <Route path="/users/:id" element={<ProfilePage posts={posts} onLike={handleLike} onDelete={handleDelete} />} />
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
