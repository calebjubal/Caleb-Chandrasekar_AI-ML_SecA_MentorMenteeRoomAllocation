import requests
import pandas as pd

# Replace with your Apps Script Web App URL
GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec"

def trigger_allocation():
    response = requests.get(GOOGLE_SCRIPT_URL)
    if response.status_code == 200:
        return True
    return False

def fetch_allocations_from_sheet(sheet_csv_url: str) -> pd.DataFrame:
    # Export Room Allocation Google Sheet as CSV and read into DataFrame
    df = pd.read_csv(sheet_csv_url)
    return df
