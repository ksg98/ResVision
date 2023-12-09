import logo from './logo.svg';
import './Vis.css';
import {MyRootComponent} from './MyRootComponent'

function Vis() {
  return (
    <div className="Vis">
      <h1 className="Vis-header">
          BFT Protocols Visualization
      </h1>
      <MyRootComponent/>
    </div>
  );
}

export default Vis;
