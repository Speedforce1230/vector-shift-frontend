import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import styles from "./NodeSelectDropdown.module.css";
export const NodeSelectDropdown = ({
    label,
    value,
    options,
    onChange = () => {},
}) => {
    const [shouldDropdown, setShouldDropdown] = useState(false);
    const dropdownRef = useRef(null);
    const handleOptionClick = (value) => {
        onChange(value);
        setShouldDropdown(false);
    };
    useEffect(() => {
        if (!dropdownRef.current) return;
        const dropdown = dropdownRef.current;
        const handleClickOutside = (event) => {
            if (!dropdown.contains(event.target)) {
                setShouldDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside, true);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside, true);
    }, []);
    return (
        <div
            className={`nodrag ${styles["dropdown-container"]}`}
            ref={dropdownRef}
        >
            <span className={styles.label}>{label}</span>
            <div className={styles["container"]}>
                <button
                    className={styles["dropdown"]}
                    onClick={() => setShouldDropdown((prev) => !prev)}
                >
                    <span>{value}</span>
                    <div className={styles.chevron}>
                        <FontAwesomeIcon
                            icon={faChevronDown}
                            style={{
                                width: "100%",
                                height: "100%",
                                transform: shouldDropdown
                                    ? "rotate(180deg)"
                                    : "rotate(0deg)",
                                transition: "transform 0.3s ease-out",
                            }}
                        ></FontAwesomeIcon>
                    </div>
                </button>
                {shouldDropdown && (
                    <div className={styles["dropdown-content"]}>
                        {options.map((option) => (
                            <button
                                className={styles.option}
                                key={option.value}
                                onClick={() => handleOptionClick(option.value)}
                            >
                                <span>{option.value}</span>
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
