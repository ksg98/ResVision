import * as d3 from 'd3'
import { useEffect, useRef } from 'react';
import { useState } from 'react';
import './visualization.css';
import msgSVG from './message.svg'
import { ReplicaNodePair } from './ReplicaNodePair';
import { ReplicaToReplicaView } from './ReplicaToReplicaView';
import { ClientToReplicasView } from './ClientToReplicasView';
import { ReplicasToClientView } from './ReplicasToClientView';

export let NodeVisualization = ( {view, numberOfReplicas, primary} ) => {
    const inputRef = useRef(null);
    let showView = ( view ) => {
        switch(view) {
            case 0:
                return <ClientToReplicasView numberOfReplicas={numberOfReplicas} primary={primary}/>
            case 1:
                return <ReplicaToReplicaView numberOfReplicas={numberOfReplicas} primary={primary}/>
            case 2:
                return <ReplicasToClientView numberOfReplicas={numberOfReplicas} primary={primary}/>
            default:
                return <></>
        }
    }
    if(view >= 0 && view <=2 ) {
        inputRef?.current?.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "start"
          });
    }
    return (

            <svg viewBox='0 0 100 50' 
                id='vis-svg'
                className='vis-svg-graph'
                ref={inputRef}>
                    { showView(view)  }
                
            </svg>

    )
}
