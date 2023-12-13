import time
try:
    while True:
        import re
        import json

        def parse_pbft_log(file_path):
            pbft_stages = []
            current_stage = None
            has_transaction = False
            commit_count = 0
            primary_nodes = set(range(4))  # Assuming 4 primary nodes

            with open(file_path, 'r') as file:
                for line in file:
                    # Check for lines indicating PBFT stages
                    match = re.search(r'recv impl type:(\d+) sender id:(\d+)', line)
                    if match:
                        impl_type, sender_id = int(match.group(1)), int(match.group(2))

                        if impl_type == 14:
                            # New-Txns phase
                            if current_stage is not None:
                                append_stage_if_unique(pbft_stages, current_stage)
                            current_stage = {"phase": "New-Txns", "senders": [sender_id], "receivers": [1]}
                            has_transaction = True

                        elif impl_type == 3: #and has_transaction:
                            # Pre-Prepare phase
                            if current_stage is not None:
                                append_stage_if_unique(pbft_stages, current_stage)
                            current_stage = {"phase": "Pre-Prepare", "senders": [sender_id], "receivers": list(range(1,5))}
                            has_transaction = False  # Reset the flag after Pre-Prepare

                        elif impl_type == 4:
                            # Prepare phase
                            if current_stage is not None:
                                append_stage_if_unique(pbft_stages, current_stage)
                            current_stage = {"phase": "Prepare", "senders": [sender_id], "receivers": list(range(1,5))}

                        elif impl_type == 5:
                            # Commit phase
                            if current_stage is not None:
                                append_stage_if_unique(pbft_stages, current_stage)
                                commit_count += 1
                                if commit_count == 4:
                                    # Add Response after commits 0-3 are done
                                    append_stage_if_unique(pbft_stages, {"phase": "Response", "senders": [], "receivers": list(range(1, 5))})
                                    append_stage_if_unique(pbft_stages, {"phase": "New-Txns", "senders": [], "receivers": []})  # Add TXN after Response
                                    commit_count = 0  # Reset commit count

                            current_stage = {"phase": "Commit", "senders": [sender_id], "receivers": list(range(1,5))}

                        elif impl_type == 15:
                            # Execute phase
                            if current_stage is not None:
                                append_stage_if_unique(pbft_stages, current_stage)
                            current_stage = {"phase": "Execute", "senders": [sender_id], "receivers": list(range(1,5))}

                        elif impl_type == 16:
                            # Response phase
                            if current_stage is not None:
                                append_stage_if_unique(pbft_stages, current_stage)
                                current_stage = {"phase": "Response", "senders": [sender_id], "receivers": list(range(1,5))}

            # Add the last stage if any
            if current_stage is not None:
                append_stage_if_unique(pbft_stages, current_stage)

            return pbft_stages

        def append_stage_if_unique(pbft_stages, current_stage):
            # Check if the current stage is not already in the list
            if current_stage not in pbft_stages:
                pbft_stages.append(current_stage)

        def save_to_json(pbft_stages, output_file):
            with open(output_file, 'w') as json_file:
                json.dump(pbft_stages, json_file, indent=2)

        the_array = []
        if __name__ == "__main__":
            for i in range(4):
                file_path = "server"+str(i)+".log"
                output_file = "pbft_stages"+str(i)+".json"
                
                pbft_stages = parse_pbft_log(file_path)
                the_array.append(pbft_stages)
        save_to_json(the_array, output_file)
        print(f"PBFT stages saved to {output_file}")

        import json

        def remove_empty_senders(data):
            return [
                [block for block in phase_data if block["senders"]]
                for phase_data in data
            ]

        def read_json_file(file_path):
            with open(file_path, 'r') as file:
                return json.load(file)

        def write_json_file(file_path, data):
            with open(file_path, 'w') as file:
                json.dump(data, file, indent=2)

        # Replace 'your_file_path.json' with the actual path to your JSON file
        file_path = 'pbft_stages3.json'

        # Read data from the JSON file
        data = read_json_file(file_path)

        # Remove blocks where "senders" is empty
        filtered_data = remove_empty_senders(data)

        # Write the filtered data back to the file
        write_json_file(file_path, filtered_data)

        file_path = 'pbft_stages3.json'

        # Read data from the JSON file
        file_path = 'pbft_stages3.json'
        data = read_json_file(file_path)
        the_output = []
        counter = 0
        other_counter = 0
        stage = "New-Txns"
        saved_commits = []
        the_prepare = []
        pre = []
        prepare_counter = 0
        commit_counter = 0

        def reorder_phases(data):
            ordered_phases = ['New-Txns', 'Pre-Prepare', 'Prepare', 'Commit']
            reordered_data = []

            for txn_list in data:
                ordered_txns = []
                for phase in ordered_phases:
                    ordered_txns.extend([txn for txn in txn_list if txn['phase'] == phase])
                reordered_data.append(ordered_txns)

            return reordered_data

        # Example usage:
        data = data
        result = reorder_phases(data)
        def add_new_txns(data):
            for txn_list in data:
                new_txns_added = False
                for i, txn in enumerate(txn_list):
                    if txn['phase'] == 'Pre-Prepare' and (i == 0 or txn_list[i - 1]['phase'] != 'New-Txns'):
                        new_txns_block = {
                            "phase": "New-Txns",
                            "senders": [5],
                            "receivers": [1]
                        }
                        txn_list.insert(i, new_txns_block)
                        new_txns_added = True

                # If no "New-Txns" block was added, add it at the beginning
                if not new_txns_added:
                    new_txns_block = {
                        "phase": "New-Txns",
                        "senders": [5],
                        "receivers": [1]
                    }
                    txn_list.insert(0, new_txns_block)

            return data

        # Example usage:
        data = result

        result = add_new_txns(result)

        the_output = []
        counter = 0
        for i in result:
            for q in i:
                if(counter == 0):
                    counter += 1
                    continue
                the_output.append(q)

        write_json_file("newer_final.json", the_output)

        import json

        # Read the existing JSON file
        import json

        # Read the existing JSON file
        with open('newer_final.json', 'r') as file:
            logs = json.load(file)

        # Define the information to prepend
        prepend_data = {
            "primary_id": 1,
            "number_of_replicas": 4
        }

        # Add metadata lines at the beginning
        metadata_lines = [
            f"Primary ID: {prepend_data['primary_id']}",
            f"Number of Replicas: {prepend_data['number_of_replicas']}",
        ]

        # Write metadata lines and JSON data to a new JSON file
        with open('newer_final.json', 'w') as file:
            # Write metadata lines
            file.write('\n'.join(metadata_lines) + '\n')

            # Write JSON data
            json.dump(logs, file, indent=2)


        input_data = logs
        the_data = []
        the_counter = 0
        for i in input_data:
            if(i["phase"] == "Commit" and the_counter < 3):
                the_counter += 1
                the_data.append(i)
                continue
            if(i["phase"] == "Commit" and the_counter > 2):
                print("here")
                the_data.append(i)
                the_data.append({'phase': 'Response', 'senders': [1,2,3,4], 'receivers': [5]})
                the_counter = 0
                continue
            the_data.append(i)

        input_data = the_data
        consensusData = {
            "primary_id": 1,
            "numberOfReplicas": 4,
            "phases": []
        }
        #print(input_data)
        for phase_data in input_data:
            phase = {
                "phase": phase_data["phase"],
                "senders": phase_data["senders"],
                "receivers": phase_data["receivers"]
            }
            consensusData["phases"].append(phase)

        the_data = consensusData

        write_json_file("newer_final.json", consensusData)

        import json
        import copy
        with open('newer_final.json', 'r') as file:
            logs = json.load(file)

        def process_phases(original_data):
            new_data = []
            current_obj = None

            for phase_data in original_data["phases"]:
                if phase_data["phase"] == "New-Txns":
                    if current_obj is not None:
                        new_data.append(current_obj)

                    # Start a new JSON object for "New-Txns"
                    current_obj = copy.deepcopy(original_data)
                    current_obj["phases"] = [phase_data]
                else:
                    current_obj["phases"].append(phase_data)

            # Add the last JSON object if there are phases after the last "New-Txns"
            if current_obj is not None:
                new_data.append(current_obj)

            return new_data

        # Example usage
        original_json = logs


        new_json_objects = process_phases(original_json)

        # Save the new JSON objects to a file
        output_file_path = "output.json"
        with open(output_file_path, "w") as output_file:
            json.dump(new_json_objects, output_file, indent=2)

        print(f"New JSON objects saved to {output_file_path}")
            
        time.sleep(5)  # Wait for 1 second
except KeyboardInterrupt:
        print("Script stopped by user.")


    