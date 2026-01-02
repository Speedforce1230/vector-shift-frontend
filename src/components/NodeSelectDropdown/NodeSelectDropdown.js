import styles from "./NodeSelectDropdown.module.css";
export const NodeSelectDropdown = ({ label, value, onChange, options }) => {
    return (
        <label>
            <span className={styles.label}>{label}</span>
            <select
                className={styles["selectable"]}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            >
                {options.map((option) => (
                    <option value={option.value} key={option.value}>
                        {option.label || option.value}
                    </option>
                ))}
            </select>
        </label>
    );
};
