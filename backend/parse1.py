# import time
# try:
#     while True:
import re

def extract_sender_pbft_logs(logs):
    sender_pattern = re.compile(r"Sender ID:(\d+)")
    pbft_pattern = re.compile(r"Message Type:TYPE_(\w+)")
    
    result = []
    
    for log in logs:
        sender_match = sender_pattern.search(log)
        pbft_match = pbft_pattern.search(log)
        
        if sender_match and pbft_match:
            sender_id = int(sender_match.group(1))
            pbft_stage = pbft_match.group(1)
            
            result.append((sender_id, pbft_stage))
    
    return result

# Example usage with your logs
the_results = []

the_results = []
for i in range(4):
    logs = open("server"+(str(i))+".log", "r").read().splitlines()
    logs1 = extract_sender_pbft_logs(logs)
    for q in logs1:
        the_results.append(q)

from collections import defaultdict
def convert_to_format(input_data):
    phases = {
        'NEW_TXNS': 'New-Txns',
        'PRE_PREPARE': 'Pre-Prepare',
        'PREPARE': 'Prepare',
        'COMMIT': 'Commit',
        'RESPONSE': 'Response'  # Adding a Response phase based on the given example
    }

    result_list = []

    for sender, phase in input_data:
        phase_name = phases[phase]
        result_list.append({
            'phase': phase_name,
            'senders': [sender],
            'receivers': [1, 2, 3, 4]
        })

    return result_list

result = convert_to_format(the_results)

def add_responses(data):
    new_data = []

    for entry in data:
        if entry['phase'] == 'New-Txns':
            response_entry = {
                'phase': 'Response',
                'senders': [entry['senders']],
                'receivers': [0, 1, 2, 3]
            }
            new_data.append(response_entry)
        new_data.append(entry)

    return new_data

data = result
data = add_responses(data)
# Specify the file path where you want to save the JSON file
file_path = 'output.json'
datar = []
for i in range(len(data)):
    if(i == 0):
        continue
    else:
        datar.append(data[i])
import json
# Write the array of JSON objects to the JSON file
with open(file_path, 'w') as json_file:
    json.dump(datar, json_file, indent=2)

print(f'The array of JSON objects has been written to {file_path}')
the_commit = 0
the_prepare = 0
the_pre_prepare = 0
blocks = []
for i in datar:
    if(i["phase"] == "Commit"):
        the_commit += 1
    elif(i["phase"] == "Prepare"):
        the_prepare += 1
    elif(i["phase"] == "Pre-Prepare"):
        the_pre_prepare += 1

blocks = []
the_blocks = []
the_temp = []
for iq in datar:
    the_temp.append(iq)

the_county = 0
storer = []
for i in range(the_pre_prepare):
    the_temp = []
    if(len(blocks) == 0):
        blocks.append({'phase': 'New-Txns', 'senders': [5], 'receivers': [1, 2, 3, 4]})
    for iq in datar:
        if(len(blocks) == 1):
            if(iq["phase"] == "Pre-Prepare"):
                blocks.append(iq)
                storer.append(the_county)
        elif(len(blocks) < 6):
            if(iq["phase"] == "Prepare"):
                blocks.append(iq)
                storer.append(the_county)
        elif(len(blocks) < 10):
            if(iq["phase"] == "Commit"):
                blocks.append(iq)
                storer.append(the_county)
        elif(len(blocks) == 10):
            blocks.append({'phase': 'Response', 'senders': [5], 'receivers': [1, 2, 3, 4]})
            the_county = 0
            continue

        the_county += 1

    the_blocks.append(blocks)
    blocks = []
    for i in range(len(datar)):
        if(i in storer):
            continue
        else:
            the_temp.append(datar[i])
    datar = the_temp


the_blockso = []
the_question = []
for i in the_blocks:
    for q in i:
        the_question.append(q)
        the_blockso.append(q)

the_blockso = the_blockso[0:len(the_blockso)-5]

the_commit = 0
the_prepare = 0
the_pre_prepare = 0
blocks = []
for i in the_question:
    if(i["phase"] == "Commit"):
        the_commit += 1
    elif(i["phase"] == "Prepare"):
        the_prepare += 1
    elif(i["phase"] == "Pre-Prepare"):
        the_pre_prepare += 1
    

if(the_pre_prepare*4 != the_commit or the_pre_prepare*4 != the_prepare):
    print(the_pre_prepare*4-the_commit)
    print(the_pre_prepare*4-the_prepare)
    if(the_pre_prepare*4-the_commit > the_pre_prepare*4-the_prepare):
        print("here")
        the_question = the_question[0:len(the_question)-((the_pre_prepare*4-the_commit)+1)]
    else:
        the_question = the_question[0:len(the_question)-the_pre_prepare*4-the_prepare]

the_final = []
the_dictionary = {"primary_id": 1,"numberOfReplicas": 4,"phases": []}
for i in the_question:
    if(i["phase"] == "Response"):
        the_dictionary["phases"].append(i)
        the_final.append(the_dictionary)
        the_dictionary = {"primary_id": 1,"numberOfReplicas": 4,"phases": []}
    else:
        the_dictionary["phases"].append(i)

print(the_final)
with open("parser/output.json", 'w') as file:
    json.dump(the_final, file, indent=2)
#         time.sleep(5)  # Wait for 1 second
# except KeyboardInterrupt:
#         print("Script stopped by user.")

