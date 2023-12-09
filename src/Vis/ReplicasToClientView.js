import { ReplicaNodeCircle } from './ReplicaNodeCircle';

let client_x = 90
let client_y = 25
let replicas_start_x = 10
let replicas_start_y = 8

export let ReplicasToClientView = ( {numberOfReplicas, primary} ) => {
    let radius = 21/(2*(numberOfReplicas-1))
    let node_spacing = 2*radius + (13/(numberOfReplicas-1))
    return(
        <g className='replica-node'>
            <ReplicaNodeCircle centerXCord={client_x} 
                centerYCord={client_y}
                radius={radius}
                nodeName='C'/>

            {[...Array(numberOfReplicas)].map((x,i) =>
                i+1 === primary ? 
                    <ReplicaNodeCircle centerXCord={replicas_start_x}
                        centerYCord={replicas_start_y+i*node_spacing}
                        radius={radius}
                        nodeName={`R${i}`}
                        primary={true}/> :
                    <ReplicaNodeCircle centerXCord={replicas_start_x}
                    centerYCord={replicas_start_y+i*node_spacing}
                    radius={radius}
                    nodeName={`R${i}`}
                    primary={false}/>
            )}
        </g>
    )

}