// ui.js
// Displays the drag-and-drop UI
// --------------------------------------------------

import { useState, useRef, useCallback } from "react";
import ReactFlow, { Controls, Background, MiniMap } from "reactflow";
import { useStore } from "./store";
import { shallow } from "zustand/shallow";
import { InputNode } from "./nodes/inputNode";
import { LLMNode } from "./nodes/llmNode";
import { OutputNode } from "./nodes/outputNode";
import { TextNode } from "./TextNode/TextNode";
import "reactflow/dist/style.css";
import { ColorNode } from "./nodes/colorNode";
import { MathNode } from "./nodes/mathNode";
import { SwitchLogicNode } from "./nodes/switchLogicNode";
import { DateNode } from "./nodes/dateNode";
import { CompareNumberNode } from "./nodes/compareNumberNode";
const gridSize = 20;
const proOptions = { hideAttribution: true };
const nodeTypes = {
    customInput: InputNode,
    llm: LLMNode,
    customOutput: OutputNode,
    text: TextNode,
    color: ColorNode,
    math: MathNode,
    switch: SwitchLogicNode,
    date: DateNode,
    compare: CompareNumberNode,
};

const selector = (state) => ({
    nodes: state.nodes,
    edges: state.edges,
    getNodeID: state.getNodeID,
    addNode: state.addNode,
    onNodesChange: state.onNodesChange,
    onEdgesChange: state.onEdgesChange,
    onConnect: state.onConnect,
});

export const PipelineUI = () => {
    const reactFlowWrapper = useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const {
        nodes,
        edges,
        getNodeID,
        addNode,
        onNodesChange,
        onEdgesChange,
        onConnect,
    } = useStore(selector, shallow);

    const getInitNodeData = (nodeID, type) => {
        let nodeData = { id: nodeID, nodeType: `${type}` };
        return nodeData;
    };

    const onDrop = useCallback(
        (event) => {
            event.preventDefault();

            const reactFlowBounds =
                reactFlowWrapper.current.getBoundingClientRect();
            if (event?.dataTransfer?.getData("application/reactflow")) {
                const appData = JSON.parse(
                    event.dataTransfer.getData("application/reactflow")
                );
                const type = appData?.nodeType;

                // check if the dropped element is valid
                if (typeof type === "undefined" || !type) {
                    return;
                }

                const position = reactFlowInstance.project({
                    x: event.clientX - reactFlowBounds.left,
                    y: event.clientY - reactFlowBounds.top,
                });

                const nodeID = getNodeID(type);
                const newNode = {
                    id: nodeID,
                    type,
                    position,
                    data: getInitNodeData(nodeID, type),
                };

                addNode(newNode);
            }
        },
        [reactFlowInstance]
    );

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    }, []);
    const defaultEdgeOptions = {
        type: "simplebezier",
        animated: true,
        style: {
            stroke: "#a855f7",
            strokeWidth: 5,
        },
    };
    return (
        <>
            <div
                ref={reactFlowWrapper}
                style={{ width: "100wv", height: "70vh" }}
            >
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                    onInit={setReactFlowInstance}
                    defaultEdgeOptions={defaultEdgeOptions}
                    nodeTypes={nodeTypes}
                    style={{ backgroundColor: "#191919" }}
                    proOptions={proOptions}
                    snapGrid={[gridSize, gridSize]}
                    connectionLineType="simplebezier"
                    connectionLineStyle={{ stroke: "#a855f7", strokeWidth: 5 }}
                >
                    <Background color="#f0f0f0" gap={gridSize} />
                    <Controls />
                    <MiniMap
                        className="map"
                        maskColor="rgba(0, 0, 0, 0.7)"
                        style={{ backgroundColor: "#141414" }}
                        nodeColor={(node) => {
                            // return node.type === 'custom' ? '#8B0000' : '#555';

                            return "#82344b";
                        }}
                        nodeStrokeColor="#fff"
                        nodeStrokeWidth={10}
                    />
                </ReactFlow>
            </div>
        </>
    );
};
