import { ReplicaNodeCircle } from './ReplicaNodeCircle';
import './visualization.css';
let numberOfReplicas = 7
export let ReplicaNodePair = ({ index }) => {
    let xStart = 10;
    let yStart = 5;
    let radius = 21/(2*(numberOfReplicas-1));
    return (
        <g className='replica-node'>
            <ReplicaNodeCircle centerXCord={xStart} 
                centerYCord={yStart+index*(2*radius + (19/(numberOfReplicas-1)))}
                radius={radius}
                nodeName={`R${index}`}/>
            <ReplicaNodeCircle centerXCord={100-xStart} 
            centerYCord={yStart+index*(2*radius + (19/(numberOfReplicas-1)))}
            radius={radius}
            nodeName={`R${index}`}/>
        </g>
    )
}