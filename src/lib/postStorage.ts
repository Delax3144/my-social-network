import type { Post } from "../types/post";

const STORAGE_KEY = "threloom-posts-v1";

const isPost = (value: unknown): value is Post => {
    if (typeof value !== "object" || value === null) return false;

    return (
        "id" in value && typeof value.id === "string" &&
        "authorId" in value && typeof value.authorId === "string" &&
        "username" in value && typeof value.username === "string" &&
        "text" in value && typeof value.text === "string" &&
        "createdAt" in value && typeof value.createdAt === "string" &&
        !Number.isNaN(Date.parse(value.createdAt)) &&
        "isLiked" in value && typeof value.isLiked === "boolean"
    );
};

export const loadPosts = (initialPosts: Post[]): Post[] => {
    try {
        const savedPosts = localStorage.getItem(STORAGE_KEY);
        if (savedPosts === null) return initialPosts;

        const parsedPosts: unknown = JSON.parse(savedPosts);
        if (!Array.isArray(parsedPosts) || !parsedPosts.every(isPost)) {
            return initialPosts;
        }

        const ids = parsedPosts.map((post) => post.id);
        if (new Set(ids).size !== ids.length) return initialPosts;

        return parsedPosts;
    } catch {
        return initialPosts;
    }
};

export const savePosts = (posts: Post[]): boolean => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
        return true;
    } catch {
        return false;
    }
};
