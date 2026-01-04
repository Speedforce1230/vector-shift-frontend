import { useState } from "react";
import { BaseNode } from "../BaseNode/BaseNode";
import { NodeSelectDropdown } from "../components/NodeSelectDropdown/NodeSelectDropdown";

export const CompareNumberNode = ({ id, data }) => {
    const [comparison, setComparison] = useState("Equal To (A=B)");
    return (
        <BaseNode
            title="Compare Node"
            description="Pass two numbers to compare them, outputs a boolean"
            handles={[
                { id: `${id}-a`, label: "A", type: "target" },
                { id: `${id}-b`, label: "B", type: "target" },
                { id: `${id}-output`, label: "Comparison", type: "source" },
            ]}
        >
            <NodeSelectDropdown
                label="Comparison: "
                value={comparison}
                onChange={setComparison}
                options={[
                    { value: "Equal To (A=B)" },
                    { value: "Lesser Than (A<B)" },
                    { value: "Greater Than (A>B)" },
                ]}
            ></NodeSelectDropdown>
        </BaseNode>
    );
};
