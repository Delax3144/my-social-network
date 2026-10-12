import { useState } from "react";
import styles from "./PostComposer.module.css";

type PostComposerProps = {
    onPublish: (text: string) => void;
};

const PostComposer = ({ onPublish }: PostComposerProps) => {
    const [text, setText] = useState("");
    const isEmpty = text.trim() === "";

    return (
        <form className={styles.composer} onSubmit={(event) => {
            event.preventDefault();
            if (isEmpty) return;
            onPublish(text);
            setText("");
        }}>
            <label htmlFor="post-text" className={styles.label}>МЕСТО ДЛЯ ВАШИХ МЫСЛЕЙ</label>
            <textarea
                placeholder="Что хочется записать сегодня?"
                value={text}
                onChange={(event) => setText(event.target.value)}
                id="post-text"
                className={styles.input}
            />
            <p className={styles.hint}>От вашего имени · Василий</p>
            <button type="submit" disabled={isEmpty} className={styles.button}>
                Опубликовать
            </button>
        </form>
    );
};

export default PostComposer;
