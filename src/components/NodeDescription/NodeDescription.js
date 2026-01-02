import styles from "./NodeDescription.module.css";
export const NodeDescription = ({ description }) => {
    return <span className={styles.description}>{description}</span>;
};
