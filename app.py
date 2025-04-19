import streamlit as st
from supa.config import supabase
from utils.auth import login
from utils.allocater import allocate_rooms, view_allocations

st.set_page_config(page_title="Mentor Room Allocation", page_icon="🏫", layout="centered")

if "user" not in st.session_state:
    login()
else:
    st.title("🏫 Mentor Room Allocation Dashboard")

    if st.button("📤 Allocate Rooms Now"):
        result = allocate_rooms()
        st.success("✅ Allocation completed successfully!")

    if st.button("📋 View Allocations"):
        view_allocations()

    if st.button("🚪 Logout"):
        del st.session_state["user"]
        st.rerun()
