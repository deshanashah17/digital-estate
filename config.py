"""
Configuration module for Digital Estate platform
"""
import os
from dotenv import load_dotenv

load_dotenv()

# Algorand
ALGOD_URL = os.getenv("ALGOD_URL", "https://testnet-api.algonode.cloud")
ALGOD_TOKEN = os.getenv("ALGOD_TOKEN", "")
INDEXER_URL = os.getenv("INDEXER_URL", "https://testnet-idx.algonode.cloud")

# Agents
SENTINEL_PRIVATE_KEY = os.getenv("SENTINEL_PRIVATE_KEY")
ESTATE_PRIVATE_KEY = os.getenv("ESTATE_PRIVATE_KEY")
NOMINEE_PRIVATE_KEY = os.getenv("NOMINEE_PRIVATE_KEY")

# Vault
VAULT_AES_KEY = bytes.fromhex(os.getenv("VAULT_AES_KEY", "00" * 32))

# DigiLocker
DIGILOCKER_TOKEN = os.getenv("DIGILOCKER_TOKEN")

# Twilio
TWILIO_ACCOUNT_SID = os.getenv("TWILIO_ACCOUNT_SID")
TWILIO_AUTH_TOKEN = os.getenv("TWILIO_AUTH_TOKEN")
TWILIO_WHATSAPP_FROM = os.getenv("TWILIO_WHATSAPP_FROM", "whatsapp:+14155238886")

# Aadhaar
AADHAAR_API_KEY = os.getenv("AADHAAR_API_KEY")
AADHAAR_API_SECRET = os.getenv("AADHAAR_API_SECRET")
