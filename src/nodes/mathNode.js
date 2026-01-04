import { useState } from "react";
import { BaseNode } from "../BaseNode/BaseNode";
import { NodeSelectDropdown } from "../components/NodeSelectDropdown/NodeSelectDropdown";

export const MathNode = ({ id, data }) => {
    const [currentOperation, setCurrentOperation] = useState("Add");
    return (
        <BaseNode
            title="Math"
            description="Perform basic arithmetic operations between two values."
            handles={[
                {
                    id: `${id}-a`,
                    label: "A",
                    type: "target",
                    style: { top: "35%" },
                },
                {
                    id: `${id}-b`,
                    label: "B",
                    type: "target",
                    style: { top: "50%" },
                },
                { id: `${id}-output`, label: "Result", type: "source" },
            ]}
        >
            <NodeSelectDropdown
                label="Operation"
                options={[
                    { value: "Multiply" },
                    { value: "Subtract" },
                    { value: "Add" },
                    { value: "Divide" },
                ]}
                value={currentOperation}
                onChange={setCurrentOperation}
            ></NodeSelectDropdown>
        </BaseNode>
    );
};
