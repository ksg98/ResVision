import { ReplicaNodeCircle } from './ReplicaNodeCircle';


let start_x1 = 10
let start_y1 = 8
let start_x2 = 90
let start_y2 = 8

export let ReplicaToReplicaView = ({numberOfReplicas, primary}) => {
    let radius = 21/(2*(numberOfReplicas-1))
    let node_spacing = 2*radius + (13/(numberOfReplicas-1))
    return (
        <g className='replica-node'>
            {[...Array(numberOfReplicas)].map((x,i) =>
                i+1 === primary ? 
                    <ReplicaNodeCircle centerXCord={start_x1}
                        centerYCord={start_y1+i*node_spacing}
                        radius={radius}
                        nodeName={`R${i}`}
                        primary={true}/> :
                    <ReplicaNodeCircle centerXCord={start_x1}
                        centerYCord={start_y1+i*node_spacing}
                        radius={radius}
                        nodeName={`R${i}`}
                        primary={false}/>
            )}
            {[...Array(numberOfReplicas)].map((x,i) =>
                i+1 === primary ?
                    <ReplicaNodeCircle centerXCord={start_x2}
                        centerYCord={start_y2+i*node_spacing}
                        radius={radius}
                        nodeName={`R${i}`}
                        primary={true}/> :
                    <ReplicaNodeCircle centerXCord={start_x2}
                        centerYCord={start_y2+i*node_spacing}
                        radius={radius}
                        nodeName={`R${i}`}
                        primary={false}/>
            )}
        </g>
    )
}
