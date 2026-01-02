import styles from "./NodeInput.module.css";
export const NodeInput = ({ label, type, placeholder, value, onChange }) => {
    return (
        <label>
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
