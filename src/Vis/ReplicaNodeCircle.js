import './visualization.css';

export let ReplicaNodeCircle = ({ centerXCord, centerYCord, radius, nodeName, primary }) => {
    let fillColor = 'white'
    if( primary === true ) {
        fillColor = '#ffff00'
    }
    const keyframes = `
    @keyframes pulse {
      0% { r: ${radius * 0.9}; }
      50% { r: ${radius * 1.1}; }
      100% { r: ${radius * 0.9}; }
    }`;
    return (
        <>
            <style>{keyframes}</style>
            <circle cx={centerXCord} cy={centerYCord} r={radius} fill={fillColor}/>
            <text dominant-baseline="middle" 
                text-anchor="middle"
                font-size="2"
                x={centerXCord} y={centerYCord}>
                    {nodeName}
            </text>
        </>
    )
}