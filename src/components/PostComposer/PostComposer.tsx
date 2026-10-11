import { useState } from "react";

import styles from "./PostComposer.module.css";

type PostComposerProps = {
    onPublish: (text: string) => void;
};

const PostComposer = ({ onPublish }: PostComposerProps) => {
    const [text, setText] = useState('');

    const isEmpty = text.trim() === "";

    return (
        <div className={styles.composer}>
            <label htmlFor="post-text">Текст поста</label>
            <textarea 
                placeholder="О чём хотите рассказать?" 
                value={text}
                onChange={(e) => setText(e.target.value)} 
                id="post-text"
                className={styles.input}   
            />
            <div className={styles.btnArea}>
                <p className={styles.text}>Только текст. Делитесь своим</p>
                <button 
                    type="button" 
                    onClick={() => {
                        if (isEmpty) return;
                        onPublish(text)
                        setText('')
                    }}
                    disabled={isEmpty}
                    className={styles.postButton}
                >
                Создать пост</button>
            </div>
        </div>
    )
}

export default PostComposer;