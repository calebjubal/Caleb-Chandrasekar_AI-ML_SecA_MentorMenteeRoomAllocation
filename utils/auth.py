import streamlit as st
from supa.config import supabase

def login():
    st.title("🔐 Admin Login")
    email = st.text_input("📧 Email")
    password = st.text_input("🔑 Password", type="password")

    if st.button("Login"):
        try:
            user = supabase.auth.sign_in_with_password({"email": email, "password": password})
            st.session_state.user = user
            st.success("✅ Login successful!")
        except:
            st.error("❌ Invalid credentials")
