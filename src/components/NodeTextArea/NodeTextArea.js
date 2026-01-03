import { useEffect, useRef } from "react";
import styles from "./NodeTextArea.module.css";
export const NodeTextArea = ({
    label,
    type,
    placeholder,
    value,
    onChange = () => {},
}) => {
    const textRef = useRef(null);
    const autoResize = () => {
        if (!textRef.current) return;
        const text = textRef.current;
        text.style.height = "auto";
        text.style.height = `${text.scrollHeight}px`;
    };
    useEffect(() => {
        autoResize();
    }, []);
    const handleTextChange = (e) => {
        onChange(e.target.value);
        autoResize();
    };
    return (
        <label className={`${styles["container"]}`}>
            <span className={`${styles.label}`}>{label}</span>
            <textarea
                className={`${styles.input} nodrag`}
                type={type || "text"}
                placeholder={placeholder}
                ref={textRef}
                value={value}
                rows={1}
                onChange={handleTextChange}
            ></textarea>
        </label>
    );
};
