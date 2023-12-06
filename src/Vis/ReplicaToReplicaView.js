import { ReplicaNodePair } from './ReplicaNodePair';


export let ReplicaToReplicaView = ({numberOfReplicas}) => {
    return (
        <>
            {[...Array(numberOfReplicas)].map((x,i) =>
                <ReplicaNodePair index={i}/>
            )}
        </>
    )
}
