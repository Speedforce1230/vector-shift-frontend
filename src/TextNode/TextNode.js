// textNode.js
import { useEffect, useState } from "react";
import { Position, useUpdateNodeInternals } from "reactflow";
import { BaseNode } from "../BaseNode/BaseNode";
import { stringToColor } from "../utility/stringToColor";
import { NodeTextArea } from "../components/NodeTextArea/NodeTextArea";

export const TextNode = ({ id, data }) => {
    const [currentText, setCurrentText] = useState(data?.text || "{{input}");
    const [handles, setHandles] = useState([
        {
            type: "source",

            id: "output",
            label: "Result",
        },
        {
            type: "target",
            id: "color",
            label: "Text Color",
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

                data: { color },
            };
        });
        const inputHandle = {
            type: "target",
            id: "color",
            label: "Text Color",
        };
        const outputHandle = {
            id: "output",
            type: "source",
            position: Position.Right,
            label: "Result",
        };
        setHandles([...newHandles, outputHandle, inputHandle]);

        data.text = currentText;
    }, [currentText, data]);
    useEffect(() => {
        updateNodeInternals(id);
    }, [id, updateNodeInternals, handles]);
    return (
        <BaseNode
            title="Text"
            handles={handles}
            description="Pass dynamically processed text with the '{{' notation."
        >
            <NodeTextArea
                label="Text: "
                onChange={setCurrentText}
                type="text"
                value={currentText}
            ></NodeTextArea>
        </BaseNode>
    );
};
