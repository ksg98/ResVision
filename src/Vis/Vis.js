import logo from './logo.svg';
import './Vis.css';
import {MyRootComponent} from './MyRootComponent'

function Vis() {
  return (
    <div className="Vis">
      <header className="Vis-header">
        <p>
          BFT Protocols Visualization
        </p>
      </header>
      <MyRootComponent/>
    </div>
  );
}

export default Vis;
