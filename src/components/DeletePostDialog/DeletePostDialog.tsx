import { useEffect, useRef } from "react";
import styles from "./DeletePostDialog.module.css";

type DeletePostDialogProps = {
    text: string;
    onCancel: () => void;
    onConfirm: () => void;
};

const DeletePostDialog = ({ text, onCancel, onConfirm }: DeletePostDialogProps) => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;

        const previousFocus = document.activeElement;
        const previousOverflow = document.body.style.overflow;
        dialog.showModal();
        document.body.style.overflow = "hidden";

        return () => {
            dialog.close();
            document.body.style.overflow = previousOverflow;
            if (previousFocus instanceof HTMLElement && previousFocus.isConnected) {
                previousFocus.focus();
            }
        };
    }, []);

    return (
        <dialog
            ref={dialogRef}
            className={styles.dialog}
            aria-labelledby="delete-title"
            aria-describedby="delete-description"
            onCancel={(event) => {
                event.preventDefault();
                onCancel();
            }}
            onClick={(event) => {
                if (event.target !== event.currentTarget) return;
                const bounds = event.currentTarget.getBoundingClientRect();
                const clickedOutside = event.clientX < bounds.left || event.clientX > bounds.right ||
                    event.clientY < bounds.top || event.clientY > bounds.bottom;
                if (clickedOutside) onCancel();
            }}
        >
            <div className={styles.content}>
                <p className={styles.label}>УПРАВЛЕНИЕ ЗАМЕТКОЙ</p>
                <h2 id="delete-title" className={styles.title}>Удалить эту заметку?</h2>
                <p id="delete-description" className={styles.description}>
                    Она исчезнет из ленты и профиля. Вернуть её после удаления не получится.
                </p>
                <p className={styles.preview}>{text}</p>
                <div className={styles.actions}>
                    <button type="button" className={styles.cancelButton} onClick={onCancel}>
                        Отмена
                    </button>
                    <button type="button" className={styles.deleteButton} onClick={onConfirm}>
                        Удалить заметку
                    </button>
                </div>
            </div>
        </dialog>
    );
};

export default DeletePostDialog;
