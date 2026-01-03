import { useEffect, useState } from "react";
import { BaseNode } from "../BaseNode/BaseNode";
import styles from "./colorNode.module.css";
import { NodeTextArea } from "../components/NodeTextArea/NodeTextArea";
import { isValidColor } from "../utility/isValidColor";
export const ColorNode = () => {
    const [currentText, setCurrentText] = useState("");
    const [currentColor, setCurrentColor] = useState("#f0f0f0");
    useEffect(() => {
        if (isValidColor(currentText)) {
            setCurrentColor(currentText);
        }
    }, [currentText]);
    return (
        <BaseNode
            title="Color"
            description="Pass any color into the field and convert it to a different color format."
            handles={[
                { id: "rgb", label: "RGB", type: "source" },
                { id: "lch", label: "LCH", type: "source" },
                { id: "oklch", label: "OKLCH", type: "source" },
                { id: "hex", label: "Hex", type: "source" },
            ]}
        >
            <div
                className={styles.swatch}
                style={{ "--bg": currentColor }}
            ></div>
            <NodeTextArea
                label="Color: "
                type="text"
                value={currentText}
                onChange={setCurrentText}
            ></NodeTextArea>
        </BaseNode>
    );
};
