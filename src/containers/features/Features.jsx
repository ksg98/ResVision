import React from 'react';
import Feature from '../../components/feature/Feature';
import './features.css';
import Blockchain2 from '../../assets/Blockchain2'


// const Features = () => {

// }

const featuresData = [
  {
    title: 'View Change Protocol',
    text: 'PBFT operates in rounds or "views." Each round consists of a sequence of steps, including a view change protocol that allows the system to recover in case of faulty behavior. If a primary node (leader) is suspected of being faulty, the system can switch to a new primary in a new view.',
  },
  {
    title: 'Request & Pre-Prepare',
    text: 'A client initiates a request, and the primary node for the current view assigns a sequence number to the request. The primary sends a "pre-prepare" message to other nodes, indicating the proposed order and content of the request.',
  },
  {
    title: 'Prepare',
    text: 'Upon receiving a pre-prepare message, each honest node broadcasts a "prepare" message to the network, indicating that it has seen the pre-prepare message and accepts the proposed request.',
  },
  {
    title: 'Commit',
    text: 'Once a node collects enough prepare messages (2f + 1, where f is the maximum number of faulty nodes the system can tolerate), it broadcasts a "commit" message, indicating that it has reached a consensus on the order and content of the request.',
  },
  {
    title: 'Response',
    text: 'Once a node receives enough commit messages, it responds to the client indicating that the request has been processed and agreed upon by the network.',
  },
];




const Features = () => (
  <div className="gpt3__features section__padding" id="features">
    <div className="gpt3__features-heading">
      <h1 className="gradient__text">The Future is Now and You Just Need to Realize It. Step into Future Today & Make it Happen.</h1>
      
      <img src={Blockchain2}/>
    </div>
    <div className="gpt3__features-container">
      {featuresData.map((item, index) => (
        <Feature title={item.title} text={item.text} key={item.title + index} />
      ))}
    </div>
  </div>
);

export default Features;
