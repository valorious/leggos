import csv


def  isint(value):
    try:
        int(value)
        return True
    except ValueError:
        return False

files = ['crafted_from', 'item', 'legendary', 'legendary_rank', 'makes_duplicates']
database = {}
for file in files:
    with open(file + '.csv') as csv_file:
        table = []
        csv_reader = csv.reader(csv_file, delimiter=',')
        line_count = 0
        for row in csv_reader:
            if line_count == 0:
                headers = row
                table.append(row)
                line_count += 1
            else:
                newRow = []
                for item in row:
                    if isint(item):
                        newRow.append(int(item))
                    else:
                        newRow.append(item)

                table.append(newRow)
        database[file] = table

print(database)