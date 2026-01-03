import styles from "./BaseNode.module.css";
import { Position } from "reactflow";
import { SmartHandle } from "./SmartHandle";

/**
 * @typedef {Object} HandleProp
 * @property {'source' | 'target'} type - The type of handle
 * @property {import('reactflow').Position} position - Position
 * @property {string} id - Unique ID for the handle
 * @property {string} label - Unique label for handle
 * @property {Object} [style] - Optional styles
 */

/**
 * @param {Object} props
 * @param {string} props.title - Title of the node
 * @param {string} props.description
 * @param {HandleProp[]} [props.handles] - List of handles
 */
export const BaseNode = ({ title, description, children, handles = [] }) => {
    const inputHandles = handles.filter((handle) => handle.type === "target");
    const outputHandles = handles.filter((handle) => handle.type === "source");

    return (
        <div className={`${styles.container} `}>
            {/* Title of the Node */}
            <div className={`${styles["node-title"]}`}>
                <span>{title}</span>
                <span>{description}</span>
            </div>

            <div className={`${styles["node-container"]}`}>
                {/* Output Handles */}
                <div className={`${styles["output-handle-container"]}`}>
                    {outputHandles.map((handle, index) => (
                        <div
                            key={index}
                            className={`${styles["output-handle"]}`}
                        >
                            <span>{handle.label}</span>
                            <SmartHandle
                                position={Position.Right}
                                type="source"
                                id={handle.id}
                                style={{ top: "50%" }}
                            ></SmartHandle>
                        </div>
                    ))}
                </div>

                {/* Content of Node */}
                <div className={styles["node-content"]}>{children}</div>

                {/* Input Handles */}
                {inputHandles.length > 0 && (
                    <div className={`${styles["input-handle-container"]}`}>
                        {inputHandles.map((handle, index) => (
                            <div
                                key={index}
                                className={`${styles["input-handle"]}`}
                            >
                                <span>{handle.label}</span>
                                <SmartHandle
                                    position={Position.Left}
                                    type="target"
                                    id={handle.id}
                                    style={{ top: "50%" }}
                                ></SmartHandle>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
