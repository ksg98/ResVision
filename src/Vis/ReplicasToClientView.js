import { ReplicaNodeCircle } from './ReplicaNodeCircle';

let client_x = 90
let client_y = 25
let replicas_start_x = 10
let replicas_start_y = 10
let radius = 3;
export let ReplicasToClientView = ( {numberOfReplicas} ) => {

    return(
        <g className='replica-node'>
            <ReplicaNodeCircle centerXCord={client_x} 
                centerYCord={client_y}
                radius={radius}
                nodeName='C'/>

            {[...Array(numberOfReplicas)].map((x,i) =>
                <ReplicaNodeCircle centerXCord={replicas_start_x}
                    centerYCord={replicas_start_y+i*3*radius}
                    radius={radius}
                    nodeName={`R${i}`}/>
            )}
        </g>
    )

}