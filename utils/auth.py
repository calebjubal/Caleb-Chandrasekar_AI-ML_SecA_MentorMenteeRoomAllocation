import streamlit as st
from supa.config import supabase

def login():
    st.title("🔐 Mentor Allocation Login")
    email = st.text_input("📧 Email")
    password = st.text_input("🔑 Password", type="password")

    if st.button("Login"):
        result = supabase.auth.sign_in_with_password(
            {"email": email, "password": password}
        )
        if result.user:
            st.session_state.user = result.user
            st.success("✅ Logged in successfully!")
        else:
            st.error("❌ Login failed")
