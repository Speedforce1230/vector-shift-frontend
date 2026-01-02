// outputNode.js

import { useState } from "react";
import { Position } from "reactflow";
import { BaseNode } from "../BaseNode/BaseNode";
import { NodeInput } from "../components/NodeInput/NodeInput";
import { NodeSelectDropdown } from "../components/NodeSelectDropdown/NodeSelectDropdown";
export const OutputNode = ({ id, data }) => {
    const [currName, setCurrName] = useState(
        data?.outputName || id.replace("customOutput-", "output_")
    );
    const [outputType, setOutputType] = useState(data.outputType || "Text");

    return (
        <BaseNode
            handles={[
                {
                    type: "target",
                    position: Position.Left,
                    id: `${id}-value`,
                    label: "Result",
                },
            ]}
            title="Output"
        >
            <NodeInput
                label="Name: "
                onChange={setCurrName}
                value={currName}
            ></NodeInput>
            <NodeSelectDropdown
                label="Type: "
                value={outputType}
                onChange={setOutputType}
                options={[{ value: "Text" }, { value: "File", label: "Image" }]}
            ></NodeSelectDropdown>
        </BaseNode>
    );
};
