import styles from "./NodeInput.module.css";
export const NodeInput = ({
    type,
    label,
    placeholder,
    value,
    onChange = () => {},
}) => {
    return (
        <label className={`${styles["container"]} nodrag`}>
            <span className={`${styles.label}`}>{label}</span>
            <input
                className={`${styles.input}`}
                type={type || "text"}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            ></input>
        </label>
    );
};
