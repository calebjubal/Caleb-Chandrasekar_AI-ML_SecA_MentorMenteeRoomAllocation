from supabase.config import supabase
import pandas as pd
from datetime import datetime

def log_to_supabase(df: pd.DataFrame):
    logs = df.to_dict(orient="records")
    timestamp = datetime.now().isoformat()
    
    for row in logs:
        row["logged_at"] = timestamp
        supabase.table("allocation_logs").insert(row).execute()

    return True
