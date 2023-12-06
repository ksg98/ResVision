export let ReplicaNodeCircle = ({ centerXCord, centerYCord, radius, nodeName }) => {
    return (
        <>
            <circle cx={centerXCord} cy={centerYCord} r={radius} fill='white'/>
            <text dominant-baseline="middle" 
                text-anchor="middle"
                font-size="2"
                x={centerXCord} y={centerYCord}>
                    {nodeName}
            </text>
        </>
    )
}