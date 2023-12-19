import { useState } from 'react';
import './form.css'
import {dummyPBFTConsensusData, dummyPBFTConsensusData2, dummyViewChangeData} from './dummyConsensusData'
import received_data from './received_data'
import { color } from 'd3';

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
        if( keyValueData.key === '00000000' ) {
            switch ( keyValueData.value.toLowerCase() ) {
                case '-1':
                    response = Promise.resolve( dummyPBFTConsensusData )
                    break;
                case '-2':
                    response = Promise.resolve( dummyPBFTConsensusData2 )
                    break;
                case '-3':
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
                let url = 'http://35.236.46.255:3000/execute-command';
                response = await fetch(url, options );
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const delay = await new Promise(resolve => setTimeout(resolve, 2000));
                setShowAlert(false);
                response = Promise.resolve(received_data);
                console.log(response)
                return(response);
            }
            catch (error) {
            console.error('Error:', error);
            }
        }
      }

    return (
        <>
            <h2 className='vis-txn-banner'>
                Send   Transaction
            </h2>
            <form className="request-form">
                <label className='vis-label'>
                    Receiver Account ID
                    <input type="number" className='vis-input' value={requestKey} onChange={updateRequestKey}></input>
                </label>
                <label className='vis-label'>
                    Amount
                    <input type="number" className='vis-input' value={requestValue} onChange={updateRequestValue}></input>
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