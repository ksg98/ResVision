export let dummyPBFTConsensusData = {
    "primary_id": 1,
    "numberOfReplicas": 4,
    "phases": [
      {
        "phase": "New-Txns",
        "senders": [
          5
        ],
        "receivers": [
          1
        ]
      },
      {
        "phase": "Pre-Prepare",
        "senders": [
          1
        ],
        "receivers": [
          1,
          2,
          3,
          4
        ]
      },
      {
        "phase": "Prepare",
        "senders": [
          2
        ],
        "receivers": [
          1,
          2,
          3,
          4
        ]
      },
      {
        "phase": "Prepare",
        "senders": [
          3
        ],
        "receivers": [
          1,
          2,
          3,
          4
        ]
      },
      {
        "phase": "Prepare",
        "senders": [
          4
        ],
        "receivers": [
          1,
          2,
          3,
          4
        ]
      },
      {
        "phase": "Prepare",
        "senders": [
          1
        ],
        "receivers": [
          1,
          2,
          3,
          4
        ]
      },
      {
        "phase": "Commit",
        "senders": [
          1
        ],
        "receivers": [
          1,
          2,
          3,
          4
        ]
      },
      {
        "phase": "Commit",
        "senders": [
          3
        ],
        "receivers": [
          1,
          2,
          3,
          4
        ]
      },
      {
        "phase": "Commit",
        "senders": [
          2
        ],
        "receivers": [
          1,
          2,
          3,
          4
        ]
      },
      {
        "phase": "Commit",
        "senders": [
          4
        ],
        "receivers": [
          1,
          2,
          3,
          4
        ]
      },
      {
        "phase": "Response",
        "senders": [
          1,
          2,
          3,
          4
        ],
        "receivers": [
          5
        ]
      }
    ]
  }

export let dummyPBFTConsensusData2 = {
    primary_id: 2,
    numberOfReplicas: 4,
    phases: [
      {
        phase: 'New-Txns',
        senders: [
          5
        ],
        receivers: [
          2
        ]
      },
      {
        phase: 'Pre-Prepare',
        senders: [
          2
        ],
        receivers: [
          1,
          2,
          3,
          4
        ]
      },
      {
        phase: 'Prepare',
        senders: [
          1,2,3,4
        ],
        receivers: [
          1,
          2,
          3,
          4
        ]
      },
      {
        phase: 'Commit',
        senders: [
          1,2,3,4
        ],
        receivers: [
          1,
          2,
          3,
          4
        ]
      },
      {
        phase: 'Response',
        senders: [
          1,
          2,
          3,
          4
        ],
        receivers: [
          5
        ]
      }
    ]
  }

export let dummyViewChangeData = {
    primary_id: 1,
    numberOfReplicas: 4,
    phases: [
        {
            phase: 'View-Change-Request',
            senders: [2,3],
            receivers: [1,2,3,4]
        },
        {
            phase: 'View-Change-Request',
            senders: [4],
            receivers: [1,2,3,4]
        },
        {
            phase: 'New-View',
            senders: [2],
            receivers: [1,2,3,4]
        }
    ]
}