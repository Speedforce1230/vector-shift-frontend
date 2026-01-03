// llmNode.js

import { Position } from "reactflow";
import { BaseNode } from "../BaseNode/BaseNode";
import { NodeDescription } from "../components/NodeDescription/NodeDescription";
export const LLMNode = ({ id, data }) => {
    return (
        <BaseNode
            handles={[
                {
                    type: "target",
                    id: `${id}-system`,
                    position: Position.Left,
                    label: "System",
                },
                {
                    type: "target",
                    id: `${id}-prompt`,
                    position: Position.Left,

                    label: "Prompt",
                },
                {
                    id: `${id}-response`,
                    label: "Response",
                    position: Position.Right,
                    type: "source",
                },
            ]}
            description="Connect with an LLM and provide knowledge bases and prompts to generate outputs."
            title="LLM"
        >
            <NodeDescription description="Just a LLM."></NodeDescription>
        </BaseNode>
    );
};
