import logo from './logo.svg';
import './Vis.css';
import {MyRootComponent} from './MyRootComponent'
import Feature from '../components/feature/Feature';

let visText = "This visualization runs on the back of the data parsed from the consensus logs generated in ResilientDB. ResilientDB provides a built-in Key Value (KV) Service which we will leverage to simulate a blockchain transaction. Please enter the account ID to whome you want to send a transaction amount through the amount field. You can also view some of the examples by giving an account ID of   '00000000'   and values like '-1', '-2' or '-3'. "

function Vis() {
  return (
    <div className="Vis">
      <h1 className="Vis-header">
          BFT Protocols Visualization
      </h1>
      <div className="gpt3__whatgpt section__margin">
        <div className="gpt3__whatgpt3-feature">
          <Feature title = 'Note' text = {visText}/>
        </div>
      </div>
      <MyRootComponent/>
    </div>
  );
}

export default Vis;
