from pathlib import Path
import csv
from pathlib import Path
import json
from random import shuffle


#  Assumes a header.
def csv_to_json(csv_path, json_path, json_file):
	Path(json_path).mkdir(parents=True, exist_ok=True)

	with open(csv_path, 'r') as csv_handle:
		with open(json_path + json_file, 'w') as json_handle:
			complete_csv = csv.reader(csv_handle, delimiter=',')
			complete_csv = [row for row in complete_csv]
			header_csv = complete_csv[0]
			body_csv = complete_csv[1:]
			json_data = {'posts': []}

			for row in body_csv:
				new_post = {pair[0]: pair[1] for pair in zip(header_csv, row)}
				json_data['posts'].append(new_post)

			json.dump(json_data, json_handle)

def is_float(string):
  try:
    return float(string) # True if string is a number contains a dot
  except ValueError:  # String is not a number
    return False

# Also make a str to float conversion.
def add_id_slug_to_json(file_src, file_dst):
	with open(file_src, 'r') as file_handle:
		good_data = list()
		data = json.load(file_handle)['posts']
		count = 0
		slugs = [i for i in range(len(data))]
		shuffle(slugs)
		shuffle(slugs)
		shuffle(slugs)

		# Make fields/CSV column names more conducive to React programming (remove spaces).
		for item in data:
			if is_float(item['longitude ']) and is_float(item['latitude']):
				item.update({'id': count, 'slug': 'Sighting-' + '-' + str(slugs[count]) })
				item['durationinseconds'] = item.pop('duration (seconds)')
				item['duration'] = item.pop('duration (hours/min)')
				item['dateposted'] = item.pop('date posted')
				item['longitude'] = float(item.pop('longitude '))
				item['latitude'] = float(item.pop('latitude'))
				good_data.append(count)
			count += 1

		data = [data[i] for i in good_data]

		with open(file_dst, 'w') as file_dst_handle:
			# 80331 sightings
			json.dump({'count': len(data), 'posts': data}, file_dst_handle)

def reduce_data_size(src_file, dst_file, reduction_amount):
	with open(src_file, 'r') as src_file_handle:
		jsonData = json.load(src_file_handle)
		orig_data = jsonData['posts']
		new_size = jsonData['count'] - reduction_amount

		new_data = [orig_data[i] for i in range(new_size)]

		with open(dst_file, 'w') as dst_file_handle:
			json.dump({'count': new_size, 'posts': new_data}, dst_file_handle)

head = "C:\\Users\\Michael\\ProgrammingProjects\\UFO-SightingsToMaps\\ufos-sights-to-maps\\src\\data\\"
reduction_amount = 80100
#csv_to_json(head+"scrubbed.csv", head, "RawJson.json")
#add_id_slug_to_json(head+"RawJson.json", head+"AllData.json")
reduce_data_size(head+"AllData.json", head+"ReducedData.json", reduction_amount)
