// inputNode.js

import { useState } from "react";
import { BaseNode } from "../BaseNode/BaseNode";
import { NodeSelectDropdown } from "../components/NodeSelectDropdown/NodeSelectDropdown";
import { NodeTextArea } from "../components/NodeTextArea/NodeTextArea";
import { NodeInput } from "../components/NodeInput/NodeInput";

export const InputNode = ({ id, data }) => {
    const [currName, setCurrName] = useState(
        data?.inputName || id.replace("customInput-", "input_")
    );
    const [inputType, setInputType] = useState(data.inputType || "Text");

    return (
        <BaseNode
            title="Input"
            handles={[{ type: "source", id, label: "Output" }]}
            description="Pass data of different types into your node design."
        >
            {inputType.toLowerCase() === "text" ? (
                <NodeTextArea
                    label="Value: "
                    value={currName}
                    onChange={setCurrName}
                    type={inputType}
                ></NodeTextArea>
            ) : (
                <NodeInput
                    label="Value: "
                    value={currName}
                    onChange={setCurrName}
                    type={inputType}
                ></NodeInput>
            )}

            <NodeSelectDropdown
                label="Type: "
                value={inputType}
                onChange={setInputType}
                options={[{ value: "Text" }, { value: "Number" }]}
            ></NodeSelectDropdown>
        </BaseNode>
    );
};
