import logo from './logo.svg';
import './Vis.css';
import {MyRootComponent} from './MyRootComponent'
import Feature from '../components/feature/Feature';

let visText = 'This visualization runs on the back of the data parsed from the consensus logs generated in ResilientDB. ResilientDB provides a built-in Key Value (KV) Service which we will use to generate consensus log. Please provide some key-value pair below to initiate the visualization. You can also view some of the examples by giving an empty key and values like "pbft", "fbft" or "vc". '

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
