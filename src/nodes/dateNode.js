import { useState } from "react";
import { BaseNode } from "../BaseNode/BaseNode";
import { NodeInput } from "../components/NodeInput/NodeInput";

export const DateNode = ({ id, data }) => {
    const [date, setDate] = useState("");
    return (
        <BaseNode
            title="Date"
            description="Provides a data timestamp."
            handles={[{ id: `${id}-output`, label: "Output", type: "source" }]}
        >
            <NodeInput
                label="Date: "
                type="date"
                value={date}
                onChange={setDate}
            ></NodeInput>
        </BaseNode>
    );
};
