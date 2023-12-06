import { useState } from 'react';
import './form.css'

export let SendClientRequestFrom = ( {startVisualization} ) => {
    let [ requestKey, setRequestKey ] = useState( '' );
    let [ requestValue, setRequestValue ] = useState( '' );

    let updateRequestKey = ( event ) => {
        setRequestKey( event.target.value);
    }

    let updateRequestValue = ( event ) => {
        setRequestValue( event.target.value);
    }

    let sendClientRequest = async ( event ) => {
        event.preventDefault();
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
        try {
          const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(keyValueData)
          }
          const response = await fetch('url', options );
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          return(data);
        } catch (error) {
          console.error('Error:', error);
        }
      }

    return (
        <>
            <form className="request-form">
                <label>
                    Key:
                    <input type="text" value={requestKey} onChange={updateRequestKey}></input>
                </label>
                <label>
                    Value:
                    <input type="text" value={requestValue} onChange={updateRequestValue}></input>
                </label>
                <button type='submit' onClick={sendClientRequest}>Send</button>
            </form>
        </>
    );
}