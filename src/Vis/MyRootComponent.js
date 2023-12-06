import { SendClientRequestFrom } from "./SendClientRequestForm";
import { NodeVisualization } from "./NodeVisualization";
import { useState } from "react";
import * as d3 from 'd3'
import { useEffect, useRef } from 'react';
import msgSVG from './message.svg'

let dummyConsensusData = {
    primary_id: 1,
    phases: 
        [
            {
                phase: "New-Txns",
                senders: [5],
                receivers: [1]
            },
            {
                phase: "Pre-Prepare",
                senders: [1],
                receivers: [1,2,3,4]
            },
            {
                phase: "Prepare",
                senders: [1],
                receivers: [1,2,3,4]
            },
            {
                phase: "Prepare",
                senders: [2],
                receivers: [1,2,3,4]
            },
            {
                phase: "Prepare",
                senders: [3],
                receivers: [1,2,3,4]
            },
            {
                phase: "Prepare",
                senders: [4],
                receivers: [1,2,3,4]
            },
            {
                phase: "Commit",
                senders: [1],
                receivers: [1,2,3,4]
            },
            {
                phase: "Commit",
                senders: [2],
                receivers: [1,2,3,4]
            },
            {
                phase: "Commit",
                senders: [3],
                receivers: [1,2,3,4]
            },
            {
                phase: "Commit",
                senders: [4],
                receivers: [1,2,3,4]
            },
            {
                phase: "Response",
                senders: [1,2,3,4],
                receivers: [5]
            }
        ]
}

let xStart = 10;
let yStart = 10;
let radius = 3;
let nodeConnections =
        {
            x1: xStart+radius,
            y1: yStart,
            x2: 100-xStart-radius,
            y2: yStart
        };
export let MyRootComponent = () => {
    let prevConsensusData;
    let [startVisFlag, setStartVisFlag] = useState(false);
    let [consensusData, setConsensusData] = useState(null)
    let [visPhase, setVisPhase] = useState(0);
    let startVisualization = ( consensusDataFromServer ) => {
        setStartVisFlag(!startVisFlag);
        if( consensusData === null ) {
            prevConsensusData = consensusDataFromServer
            setConsensusData(consensusDataFromServer);
        }
    }

    useEffect(() => {
        //if( prevConsensusData !== consensusData ) 
            consensusData && showCommunicationNew( dummyConsensusData.phases, setVisPhase )
      }, [consensusData]);
    return (
        <>
            <SendClientRequestFrom startVisualization={startVisualization}/>
            <div style={{display: 'flex'}}>
            <NodeVisualization view={visPhase}/>
            </div>
        </>
    )
    
}
let showReplicaToReplicaCommunication = ( fromNodes, toNodes, phaseName ) => {
    const svgSelector = d3.select( 'svg' )

    //if (svgSelector.classed(`svg-phase-${phaseName}`))
    const phaseTextRect = svgSelector.append( 'g' )
                                    .attr( 'id', 'phase-text')

    phaseTextRect.append( 'rect' )
                .attr( 'x', 25 )
                .attr( 'y', 2)
                .attr( 'width', 50)
                .attr( 'height', 5)
    phaseTextRect.classed(`svg-phase-${phaseName}`, true);
        const phaseNameText = phaseTextRect.append('text')
            .attr( 'id', phaseName)
            .attr( 'x', 45)
            .attr( 'y', 5)
            .attr("font-size", "2")
            .style( 'fill', 'white')
            .text( phaseName )

    // x co-ordinate is same for all nodes
    const toNodeStartCoord_Y = nodeConnections.y2;

    // render all communication lines and message icons
    showCommunicationLines(svgSelector, fromNodes, toNodes, nodeConnections.x1, nodeConnections.y1,
                            nodeConnections.x2, nodeConnections.y2)

    // transition message icons along the communication lines
    for(let i=0; i < fromNodes.length; i++ ) {
        for( let j=0; j < toNodes.length; j++ ) {
            const smvImg = d3.select( `#line_${fromNodes[i]}${toNodes[j]}` )
                        .transition()
                        .duration(2000)
                        .ease(d3.easeLinear)
                        .attr('x', 100-xStart-radius - 3 )
                        .attr('y', toNodeStartCoord_Y + ((toNodes[j]-1)*3*radius) - 1.5)
                        .transition()
                        .duration(100)
                        .remove()
        }
    }

    // hide all communication lines 
    svgSelector.selectAll( 'line' )
                .transition()
                .duration(2100)
                .remove()
    svgSelector.select( `#${phaseName}` )
                .transition()
                .on('end', () => {
                    svgSelector.classed(`svg-phase-${phaseName}`, false);
                })
                .duration(2100)
                .remove()
    phaseTextRect.transition()
                .duration(2100)
                .remove()
}

let showClientToReplicasCommunication = ( fromNodes, toNodes, phaseName ) => {
    const svgSelector = d3.select( 'svg' )

    //if (svgSelector.classed(`svg-phase-${phaseName}`))
    const phaseTextRect = svgSelector.append( 'g' )
                                    .attr( 'id', 'phase-text')

    phaseTextRect.append( 'rect' )
                .attr( 'x', 25 )
                .attr( 'y', 2)
                .attr( 'width', 50)
                .attr( 'height', 5)
    phaseTextRect.classed(`svg-phase-${phaseName}`, true);
        const phaseNameText = phaseTextRect.append('text')
            .attr( 'id', phaseName)
            .attr( 'x', 45)
            .attr( 'y', 5)
            .attr("font-size", "2")
            .style( 'fill', 'white')
            .text( phaseName )

    const toNodeStartCoord_Y = nodeConnections.y2;
    showCommunicationLines(svgSelector, fromNodes, toNodes, nodeConnections.x1, 25,
                nodeConnections.x2, nodeConnections.y2)

    // transition message icons along the communication lines
    for(let i=0; i < fromNodes.length; i++ ) {
        for( let j=0; j < toNodes.length; j++ ) {
            const smvImg = d3.select( `#line_${fromNodes[i]}${toNodes[j]}` )
                        .transition()
                        .duration(2000)
                        .ease(d3.easeLinear)
                        .attr('x', 100-xStart-radius - 3 )
                        .attr('y', toNodeStartCoord_Y + ((toNodes[j]-1)*3*radius) - 1.5)
                        .transition()
                        .duration(100)
                        .remove()
        }
    }

    // hide all communication lines 
    svgSelector.selectAll( 'line' )
                .transition()
                .duration(2100)
                .remove()
    svgSelector.select( `#${phaseName}` )
                .transition()
                .on('end', () => {
                    svgSelector.classed(`svg-phase-${phaseName}`, false);
                })
                .duration(2100)
                .remove()
    phaseTextRect.transition()
                .duration(2000)
                .transition()
                .duration(100)
                .remove()
}

let showReplicasToClientCommunication = ( fromNodes, toNodes, phaseName ) => {
    const svgSelector = d3.select( 'svg' )

    //if (svgSelector.classed(`svg-phase-${phaseName}`))
    const phaseTextRect = svgSelector.append( 'g' )
                                    .attr( 'id', 'phase-text')

    phaseTextRect.append( 'rect' )
                .attr( 'x', 25 )
                .attr( 'y', 2)
                .attr( 'width', 50)
                .attr( 'height', 5)
    phaseTextRect.classed(`svg-phase-${phaseName}`, true);
        const phaseNameText = phaseTextRect.append('text')
            .attr( 'id', phaseName)
            .attr( 'x', 45)
            .attr( 'y', 5)
            .attr("font-size", "2")
            .style( 'fill', 'white')
            .text( phaseName )

    const toNodeStartCoord_Y = nodeConnections.y2;
    showCommunicationLines(svgSelector, fromNodes, toNodes, nodeConnections.x1, nodeConnections.y1,
                nodeConnections.x2, 25)

    // transition message icons along the communication lines
    for(let i=0; i < fromNodes.length; i++ ) {
        for( let j=0; j < toNodes.length; j++ ) {
            const smvImg = d3.select( `#line_${fromNodes[i]}${toNodes[j]}` )
                        .transition()
                        .duration(2000)
                        .ease(d3.easeLinear)
                        .attr('x', 100-xStart-radius - 3 )
                        .attr('y', 25 - 1.5)
                        .transition()
                        .duration(100)
                        .remove()
        }
    }

    // hide all communication lines 
    svgSelector.selectAll( 'line' )
                .transition()
                .duration(2100)
                .remove()
    svgSelector.select( `#${phaseName}` )
                .transition()
                .on('end', () => {
                    svgSelector.classed(`svg-phase-${phaseName}`, false);
                })
                .duration(2100)
                .remove()
    phaseTextRect.transition()
                .duration(2000)
                .transition()
                .duration(100)
                .remove()
}

let showCommunicationLines = ( svgSelector, fromNodes, toNodes, from_x, from_y, to_x, to_y ) => {
    let from_y_start;
    for( let i=0; i < fromNodes.length; i++ ) {
        from_y_start = from_y + ((fromNodes[i]-1)%4)*3*radius;
        for( let j=0; j < toNodes.length; j++ ) {
            svgSelector.append( 'line' )
                    .attr('x1', from_x)
                    .attr('y1', from_y_start)
                    .attr('x2', to_x)
                    .attr('y2', to_y + (((toNodes[j]-1)%4)*3*radius) )
            svgSelector.append( 'image' )
                    .attr( 'id', `line_${fromNodes[i]}${toNodes[j]}`)
                    .attr( 'href', msgSVG )
                    .attr( 'width', 3 )
                    .attr( 'height', 3 )
                    .attr('x', from_x)
                    .attr('y', from_y_start - 1.5);
        }
    }
}

let showCommunicationNew = ( data, setVisPhase ) => {
    d3.select( 'svg' )
        .data(data)
        .join()
        .transition()
        .on( 'start', function(d,i) {
            if( d.phase === 'New-Txns') {
                showClientToReplicasCommunication( d.senders, d.receivers, d.phase )
            }
            else if( d.phase === 'Response' ) {
                setVisPhase(2)
                showReplicasToClientCommunication( d.senders, d.receivers, d.phase )                
            }
            else {
                setVisPhase(1)
                showReplicaToReplicaCommunication( d.senders, d.receivers, d.phase )
                console.log(d)
            }
        })
        .delay( function(d,i) {
            return i*2200
        })
}  
 