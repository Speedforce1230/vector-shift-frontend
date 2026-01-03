import styles from "./NodeImage.module.css";
export const NodeImage = ({ image, alt, originalWidth, originalHeight }) => {
    return (
        <div className={`${styles["image-container"]}`}>
            <img
                src={image}
                alt={alt}
                width={originalWidth}
                height={originalHeight}
                decoding="async"
                loading="lazy"
            ></img>
        </div>
    );
};
