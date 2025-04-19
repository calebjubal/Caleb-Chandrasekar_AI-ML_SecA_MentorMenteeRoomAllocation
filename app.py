import streamlit as st
from utils.auth import login
from utils.google_script import trigger_allocation, fetch_allocations_from_sheet
from utils.supabase_logger import log_to_supabase

st.set_page_config(page_title="Mentor Room Allocation", page_icon="🏫")

if "user" not in st.session_state:
    login()
else:
    st.title("🏫 Mentor Room Allocation Dashboard")

    if st.button("📤 Trigger Allocation"):
        if trigger_allocation():
            st.success("✅ Google App Script Allocation Triggered")
        else:
            st.error("❌ Failed to trigger allocation")

    sheet_csv_url = st.text_input("📎 Paste public CSV export link of 'Room Allocation' Sheet")

    if sheet_csv_url and st.button("📥 Fetch & Log Allocations"):
        df = fetch_allocations_from_sheet(sheet_csv_url)
        st.dataframe(df)

        if log_to_supabase(df):
            st.success("🗃️ Allocation Logged to Supabase")
        else:
            st.error("❌ Logging failed")

    if st.button("🚪 Logout"):
        del st.session_state["user"]
        st.rerun()
