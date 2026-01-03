import { BaseNode } from "../BaseNode/BaseNode";
import { NodeDescription } from "../components/NodeDescription/NodeDescription";

export const SwitchLogicNode = ({ id, data }) => {
    return (
        <BaseNode
            title="Switch Case"
            description="Gives two outputs based on if the condition provided is true or false"
            handles={[
                { id: `${id}-input`, label: "Condition", type: "target" },
                { id: `${id}-true`, label: "True", type: "source" },
                { id: `${id}-false`, label: "False", type: "source" },
            ]}
        >
            <NodeDescription description="Checking if condition is true or false."></NodeDescription>
        </BaseNode>
    );
};
