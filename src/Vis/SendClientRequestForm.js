import { useState } from 'react';
import './form.css'
import {dummyPBFTConsensusData, dummyPBFTConsensusData2, dummyViewChangeData} from './dummyConsensusData'

export let SendClientRequestFrom = ( {startVisualization} ) => {
    let [ requestKey, setRequestKey ] = useState( '' );
    let [ requestValue, setRequestValue ] = useState( '' );
    const [showAlert, setShowAlert] = useState(false);

    let updateRequestKey = ( event ) => {
        setRequestKey( event.target.value);
    }

    let updateRequestValue = ( event ) => {
        setRequestValue( event.target.value);
    }

    let sendClientRequest = async ( event ) => {
        event.preventDefault();
        setShowAlert(true);
        // implement server call to initiate kvservice request
        const keyValueData = {
            key: requestKey,
            value: requestValue
        }
        let consensusDataFromServer = await getConsensusData(keyValueData)
        startVisualization( consensusDataFromServer );
        console.log( requestKey );
        console.log( requestValue );
    }

    const getConsensusData = async ( keyValueData ) => {
        let response = {}
        if( keyValueData.key === '' ) {
            switch ( keyValueData.value.toLowerCase() ) {
                case 'pbft':
                    response = Promise.resolve( dummyPBFTConsensusData )
                    break;
                case 'fbft':
                    response = Promise.resolve( dummyPBFTConsensusData2 )
                    break;
                case 'vc':
                    response = Promise.resolve( dummyViewChangeData )
                    break;
                default:
                    response = Promise.resolve( dummyPBFTConsensusData )
                    break;
            }
            const delay = await new Promise(resolve => setTimeout(resolve, 2000));
            setShowAlert(false);
            return(response)
        }
        else {
            try {
                const options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(keyValueData)
                }
                let url = 'http://34.171.249.215:3000/execute-command';
                response = await fetch(url, options );
                //console.log(jsonData)
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log(data)
                return(data);
            }
            catch (error) {
            console.error('Error:', error);
            }
        }
      }

    return (
        <>
            <form className="request-form">
                <label className='vis-label'>
                    Key
                    <input type="text" className='vis-input' value={requestKey} onChange={updateRequestKey}></input>
                </label>
                <label className='vis-label'>
                    Value
                    <input type="text" className='vis-input' value={requestValue} onChange={updateRequestValue}></input>
                </label>
                <button type='submit' className='vis-send-button' onClick={sendClientRequest}>Send</button>
            </form>
            {showAlert && (
                <div className="alert">
                <p>Sending data...</p>
                </div>
            )}
        </>
    );
}