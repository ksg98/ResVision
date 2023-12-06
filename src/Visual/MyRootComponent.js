import { SendClientRequestFrom } from "./SendClientRequestForm";
import { NodeVisualization } from "./NodeVisualization";
import { useState } from "react";

let dummyConsensusData = {
    primary_id: 0,
    phases: {
        preprepare: [
            {
                sender_id: 0,
                receivers: [0,1,2,3]
            }
        ],
        prepare: [
            {
                sender_id: 0,
                receivers: [0,1,2,3]
            },
            {
                sender_id: 1,
                receivers: [0,1,2,3]
            },
            {
                sender_id: 2,
                receivers: [0,1,2,3]
            },
            {
                sender_id: 3,
                receivers: [0,1,2,3]
            }
        ],
        commit: [
            {
                sender_id: 0,
                receivers: [0,1,2,3]
            },
            {
                sender_id: 1,
                receivers: [0,1,2,3]
            },
            {
                sender_id: 2,
                receivers: [0,1,2,3]
            },
            {
                sender_id: 3,
                receivers: [0,1,2,3]
            }
        ]
    }
}
export let MyRootComponent = () => {
    let [startVisFlag, setStartVisFlag] = useState(false);
    let [consensusData, setConsensusData] = useState(null)
    let startVisualization = () => {
        setStartVisFlag(true);
        setConsensusData(dummyConsensusData);
    }
    return (
        <>
            <SendClientRequestFrom startVisualization={startVisualization}/>
            <div style={{display: 'flex'}}>
            <NodeVisualization start={startVisFlag} data={consensusData}/>
            </div>
        </>
    )
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    /* return (
        <>
        <div style={{display:'flex',flexDirection: 'row', justifyContent: 'space-between'}}>
            <div className='replica-left'>
            <LeftReplicas/>
            </div>
            <div className='replica-right'>
            <RightReplicas/>
            </div>
        </div>
        </>
    ) */
}