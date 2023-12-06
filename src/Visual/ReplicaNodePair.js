import { ReplicaNodeCircle } from './ReplicaNodeCircle';
import './visualization.css';

export let ReplicaNodePair = ({ index }) => {
    let xStart = 10;
    let yStart = 10;
    let radius = 3;
    return (
        <g className='replica-node'>
            <ReplicaNodeCircle centerXCord={xStart} 
                centerYCord={yStart+index*3*radius}
                radius={radius}
                nodeName={`R${index}`}/>
            <ReplicaNodeCircle centerXCord={100-xStart} 
            centerYCord={yStart+index*3*radius}
            radius={radius}
            nodeName={`R${index}`}/>
        </g>
    )
}