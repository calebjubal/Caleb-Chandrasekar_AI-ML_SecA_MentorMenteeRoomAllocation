import streamlit as st
from supa.config import supabase
import pandas as pd

def allocate_rooms():
    mentors = supabase.table("mentors").select("*").execute().data
    rooms = supabase.table("rooms").select("*").order("room_id", desc=False).execute().data

    allocations = []
    used_rooms = set()

    for mentor in mentors:
        required = mentor["mentees"]
        for room in rooms:
            if room["room_id"] in used_rooms:
                continue
            if room["occupancy"] >= required:
                used_rooms.add(room["room_id"])
                allocations.append({
                    "mentor": mentor["mentor"],
                    "programme": mentor["programme"],
                    "mentees": required,
                    "room_id": room["room_id"],
                    "occupancy": room["occupancy"]
                })
                break

    # Clear previous allocations
    supabase.table("allocations").delete().neq("id", 0).execute()

    # Insert new allocations
    for alloc in allocations:
        supabase.table("allocations").insert(alloc).execute()

    return allocations

def view_allocations():
    allocs = supabase.table("allocations").select("*").execute().data
    df = pd.DataFrame(allocs)
    if not df.empty:
        st.dataframe(df[["mentor", "programme", "mentees", "room_id", "occupancy"]])
    else:
        st.warning("⚠️ No allocations yet.")
