import openpyxl
import json

# Load the workbook
wb = openpyxl.load_workbook('All FS collections - Nov2025.xlsx')
ws = wb.active

# Get all data
data = []
for i, row in enumerate(ws.iter_rows(values_only=True)):
    if i == 0:
        headers = row
        print(f"Headers: {headers}")
    else:
        data.append(row)

# Print first 20 rows to see the structure
print(f"\nTotal rows: {len(data)}")
print("\nFirst 20 rows:")
for i, row in enumerate(data[:20]):
    print(f"Row {i+1}: {row}")
