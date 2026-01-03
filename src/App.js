import { PipelineToolbar } from "./toolbar";
import { PipelineUI } from "./ui";
import { SubmitButton } from "./submit";
import { ReactFlowProvider } from "reactflow";

function App() {
    return (
        <div>
            <PipelineToolbar />
            <ReactFlowProvider>
                <PipelineUI />
            </ReactFlowProvider>
            <SubmitButton />
        </div>
    );
}

export default App;
