import { Handle, useNodeId, useStore } from "reactflow";
import styles from "./BaseNode.module.css";
const connectionSelector = (state, nodeId, handleId, type) => {
    return state.edges.some((edge) => {
        if (type === "source") {
            return edge.source === nodeId && edge.sourceHandle === handleId;
        } else {
            return edge.target === nodeId && edge.targetHandle === handleId;
        }
    });
};
export const SmartHandle = (props) => {
    const nodeId = useNodeId();

    const isConnected = useStore((state) =>
        connectionSelector(state, nodeId, props.id, props.type)
    );

    return (
        <Handle
            {...props}
            style={{ width: 15, height: 15 }}
            className={`${styles.handle} ${
                isConnected ? styles.connected : ""
            }`}
        ></Handle>
    );
};
