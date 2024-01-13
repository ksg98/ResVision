import React from 'react';
import Feature from '../../components/feature/Feature';
import './whatGPT3.css';
import Blockchain from '../../assets/Blockchain';

const WhatGPT3 = () => (
  <div className="gpt3__whatgpt3 section__margin" id="wgpt3">
    <div className="gpt3__whatgpt3-feature">
      <Feature title="What is ResilientDB ?" text="ResilientDB is a blockchain fabric tailored for research and education, enabling exploration and experimentation with blockchain technologies. It supports a variety of consensus mechanisms, making it a versatile tool for studying different blockchain protocols and applications. Designed with a focus on scalability and performance, ResilientDB offers a customizable and extensible environment ideal for researchers and students keen on delving into the intricacies and potential of blockchain systems." />
    </div>

    <div className="gpt3__whatgpt3-feature">
      <Feature title="What is BFT ?" text="A Byzantine fault (also Byzantine generals problem, interactive consistency, source congruency, error avalanche, Byzantine agreement problem, and Byzantine failure) is a condition of a computer system, particularly distributed computing systems, where components may fail and there is imperfect information on whether a component has failed. The term takes its name from an allegory, the Byzantine generals problem, developed to describe a situation in which, to avoid catastrophic failure of the system, the system's actors must agree on a concerted strategy , but some of these actors are unreliable." />
    </div>

    <div className="gpt3__whatgpt3-heading">
      <h1 className="gradient__text">The possibilities are beyond your imagination</h1>
      {/* <p>Explore the Library</p> */}
    </div>
    <div className="gpt3__whatgpt3-container">
      <Feature title="PBFT" text="Practical Byzantine Fault Tolerance is referred to as PBFT. It is a consensus algorithm made to guarantee a distributed system's consistency even in the face of malfunctioning nodes or malevolent actors. When some nodes in a distributed system malfunction or act maliciously, giving other nodes false information, the Byzantine Fault Tolerance problem occurs." />
      {/* <Feature title="HotStuff" text="The HotStuff consensus protocol is a Byzantine Fault Tolerant system designed for blockchain efficiency, employing a leader-based approach with a three-phase commit process (prepare, pre-commit, commit) for decision consensus. Capable of tolerating up to one-third of faulty or malicious nodes, it ensures system integrity as long as two-thirds of the nodes are honest. Its unique features include a chained approach linking decisions to simplify voting and reduce communication overhead, coupled with a pipelining technique for overlapping consensus phases, thereby enhancing throughput. Additionally, it employs a rotating leadership among nodes for fairness and risk mitigation." />
      <Feature title="Proof of Stake" text="Proof of Stake (PoS) is a blockchain consensus mechanism where validators are chosen to confirm transactions and create new blocks based on the number of coins they hold and are willing to stake as collateral. This approach, contrasting with the computationally intensive Proof of Work (PoW) system, significantly enhances energy efficiency. While it potentially reduces the risk of network centralization seen in PoW, as those with more coins have greater validation chances, various PoS implementations include safeguards against excessive centralization. The security of PoS is underpinned by the financial stake of validators, as acting maliciously or validating false transactions could lead to the forfeiture of their staked coins, thus aligning their incentives with the network's integrity." /> */}
      <img src={Blockchain} />
    </div>
  </div>
);

export default WhatGPT3;
