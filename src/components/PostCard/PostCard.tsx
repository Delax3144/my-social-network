import { useState } from "react";

import type { Post } from "../../types/post"

import styles from "./PostCard.module.css";

type PostCardProps = {
    post: Post;
};

const PostCard = ({post}: PostCardProps) => {
    const [like, setLike] = useState(false);
    
    return (
        <div className={styles.card}>
            <div>{post.username}</div>
            <div>{post.text}</div>
            <div>{post.createdAt}</div>
            <button onClick={() => setLike(!like)}>{like ? "Убрать лайк" : "Лайк"}</button>
        </div>
    )
}   

export default PostCard;