import * as d3 from 'd3';

import { useEffect, useRef } from 'react';
import './visualization.css';
import msgSVG from './message.svg'
import { ReplicaNodePair } from './ReplicaNodePair';

let dummyConsensusData2 = {
    primary_id: 0,
    phases: 
        [
            {
                phase: "Pre-Prepare",
                sender_id: 0,
                receivers: [0,1,2,3]
            },
            {
                phase: "Prepare",
                sender_id: 0,
                receivers: [0,1,2,3]
            },
            {
                phase: "Prepare",
                sender_id: 1,
                receivers: [0,1,2,3]
            },
            {
                phase: "Prepare",
                sender_id: 2,
                receivers: [0,1,2,3]
            },
            {
                phase: "Prepare",
                sender_id: 3,
                receivers: [0,1,2,3]
            },
            {
                phase: "Commit",
                sender_id: 0,
                receivers: [0,1,2,3]
            },
            {
                phase: "Commit",
                sender_id: 1,
                receivers: [0,1,2,3]
            },
            {
                phase: "Commit",
                sender_id: 2,
                receivers: [0,1,2,3]
            },
            {
                phase: "Commit",
                sender_id: 3,
                receivers: [0,1,2,3]
            }
        ]
}


let numberOfReplicas = 4;
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
export let NodeVisualization = ( {start, data} ) => {
    
    // let communicationData;
    // if ( data !== null ) {
    //     communicationData = processConsensusData( data );
    // }
    data && showCommunicationNew( dummyConsensusData2.phases )
    return (
        <svg viewBox='0 0 100 50' style={{
            border: "2px solid gold",
            margin: '30px'}}>
                {[...Array(numberOfReplicas)].map((x,i) =>
                <ReplicaNodePair index={i}/>
                )}
        </svg>
    )
}

let showCommunication = ( fromNodes, toNodes, phaseName ) => {
    const svgSelector = d3.select( 'svg' )

    //if (svgSelector.classed(`svg-phase-${phaseName}`))
    svgSelector.classed(`svg-phase-${phaseName}`, true);
        const phaseNameText = svgSelector.append('text')
            .attr( 'id', phaseName)
            .attr( 'x', 45)
            .attr( 'y', 5)
            .attr("font-size", "2")
            .style( 'fill', 'white')
            .text( phaseName )

    // svgSelector.transition()
    //             .style("background", "red");;

    // x co-ordinate is same for all nodes
    let fromNodeCoord_Y;
    const toNodeStartCoord_Y = nodeConnections.y2;

    // render all communication lines
    for( let i=0; i < fromNodes.length; i++ ) {
        fromNodeCoord_Y = nodeConnections.y1 + fromNodes[i]*3*radius;
        for( let j=0; j < toNodes.length; j++ ) {
            svgSelector.append( 'line' )
                    .attr('x1', nodeConnections.x1)
                    .attr('y1', fromNodeCoord_Y)
                    .attr('x2', nodeConnections.x2)
                    .attr('y2', toNodeStartCoord_Y + (toNodes[j]*3*radius) )
        }
    }

    // render all message icon images
    for( let i=0; i < fromNodes.length; i++ ) {
        fromNodeCoord_Y = nodeConnections.y1 + fromNodes[i]*3*radius;
        for( let j=0; j < toNodes.length; j++ ) {
            svgSelector.append( 'image' )
                        .attr( 'id', `line_${fromNodes[i]}${toNodes[j]}`)
                        .attr( 'href', msgSVG )
                        .attr( 'width', 3 )
                        .attr( 'height', 3 )
                        .attr('x', nodeConnections.x1)
                        .attr('y', fromNodeCoord_Y - 1.5);
        }
    }

    // transition message icons along the communication lines
    for(let i=0; i < fromNodes.length; i++ ) {
        for( let j=0; j < toNodes.length; j++ ) {
            const smvImg = d3.select( `#line_${fromNodes[i]}${toNodes[j]}` )
                        .transition()
                        .duration(2000)
                        .ease(d3.easeLinear)
                        .attr('x', 100-xStart-radius - 3 )
                        .attr('y', toNodeStartCoord_Y + (toNodes[j]*3*radius) - 1.5)
                        .transition()
                        .duration(100)
                        .remove()
        }
    }

    // hide all communication lines 
    // todo: maybe use .remove() instead of hiding 
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
                
}

let showCommunicationNew = ( data ) => {
    d3.select( 'svg' )
        .data(data)
        .join()
        .transition()
        .on( 'start', function(d,i) { showCommunication( [d.sender_id], d.receivers, d.phase)})
        .delay( function(d,i) {
            return i*2200
        })
}   