// textNode.js
import { useEffect, useState } from "react";
import { Position, useUpdateNodeInternals } from "reactflow";
import { BaseNode } from "../BaseNode/BaseNode";
import { stringToColor } from "../utility/stringToColor";
import { NodeInput } from "../components/NodeInput/NodeInput";

export const TextNode = ({ id, data }) => {
    const [currentText, setCurrentText] = useState(data?.text || "{{input}");
    const [handles, setHandles] = useState([
        {
            type: "source",
            position: Position.Right,
            id: "output",
            label: "Output",
            style: { top: "50%" },
        },
    ]);
    const updateNodeInternals = useUpdateNodeInternals();
    useEffect(() => {
        const regex = /\{\{(.*?)\}\}/g;
        const matches = [];
        let match;
        while ((match = regex.exec(currentText)) !== null) {
            const varName = match[1].trim();
            if (varName && !matches.includes(varName)) {
                matches.push(varName);
            }
        }
        const newHandles = matches.map((variable) => {
            const color = stringToColor(variable);
            return {
                id: `${variable}`,
                type: "target",
                position: Position.Left,
                label: variable,
                style: {
                    top: "30%",
                },
                data: { color },
            };
        });
        const outputHandle = {
            id: "output",
            type: "source",
            position: Position.Right,
            label: "Output",
            style: { top: "50%" },
        };
        setHandles([outputHandle, ...newHandles]);

        data.text = currentText;
    }, [currentText, data]);
    useEffect(() => {
        updateNodeInternals(id);
    }, [id, updateNodeInternals, handles]);
    return (
        <BaseNode title="Text" handles={handles}>
            <NodeInput
                label="Text: "
                onChange={setCurrentText}
                type="text"
                value={currentText}
            ></NodeInput>
        </BaseNode>
    );
};
