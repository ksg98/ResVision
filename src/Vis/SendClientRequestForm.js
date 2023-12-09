import { useState } from 'react';
import './form.css'

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
        try {
          const options = {
            //method: 'POST',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            //body: JSON.stringify(keyValueData)
          }
          let url = `http://localhost:8080/api/data?key=${keyValueData.key}&value=${keyValueData.value}`
          const response = await fetch(url, options );
          const delay = await new Promise(resolve => setTimeout(resolve, 2000));
          setShowAlert(false);
          //console.log(jsonData)
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          console.log(data)
          return(data);
        } catch (error) {
          console.error('Error:', error);
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