// submit.js
import { useStore } from "./store";
import { shallow } from "zustand/shallow";
export const SubmitButton = () => {
    const { nodes, edges } = useStore(
        (state) => ({
            nodes: state.nodes,
            edges: state.edges,
        }),
        shallow
    );
    const handleSubmit = async () => {
        const payload = {
            nodes: nodes.map((node) => ({
                id: node.id,
                type: node.type,
                data: node.data,
            })),
            edges: edges.map((edge) => ({
                source: edge.source,
                sourceHandle: edge.sourceHandle,
                target: edge.target,
                targetHandle: edge.targetHandle,
            })),
        };

        try {
            const resp = await fetch("http://localhost:8000/pipelines/parse", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            const data = await resp.json();
            alert(
                `Pipeline Analysis:\n` +
                    `Number of Nodes: ${data.num_nodes}\n` +
                    `Number of Edges: ${data.num_edges}\n` +
                    `Is DAG: ${data.is_dag ? "Yes" : "No"}`
            );
        } catch (err) {
            console.error("Error trying to fetch pipeline parser", err);
        }
    };
    return (
        <div className="submit">
            <button type="submit" onClick={handleSubmit}>
                Submit
            </button>
        </div>
    );
};
