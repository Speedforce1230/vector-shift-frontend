// inputNode.js

import { useState } from "react";
import { Position } from "reactflow";
import { BaseNode } from "../BaseNode/BaseNode";
import { NodeInput } from "../components/NodeInput/NodeInput";
import { NodeSelectDropdown } from "../components/NodeSelectDropdown/NodeSelectDropdown";

export const InputNode = ({ id, data }) => {
    const [currName, setCurrName] = useState(
        data?.inputName || id.replace("customInput-", "input_")
    );
    const [inputType, setInputType] = useState(data.inputType || "Text");

    return (
        <BaseNode
            title="Input"
            handles={[{ type: "source", id, label: "Output" }]}
        >
            <NodeInput
                label="Name: "
                value={currName}
                onChange={setCurrName}
                type="text"
            ></NodeInput>
            <NodeSelectDropdown
                label="Type: "
                value={inputType}
                onChange={setInputType}
                options={[{ value: "Text" }, { value: "File" }]}
            ></NodeSelectDropdown>
        </BaseNode>
    );
};
