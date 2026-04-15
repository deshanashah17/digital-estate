"""
AssetVault - AES-256-CBC encrypted store for digital estate data.
In production the encrypted blob is stored as an ARC-69 note
on an Algorand NFT (via separate MCP integration).
"""
import json, base64, os
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad, unpad

class AssetVault:
    """
    AES-256-CBC encrypted store for digital estate data.
    In production the encrypted blob is stored as an ARC-69 note
    on an Algorand NFT via GoPlausible MCP server.
    """
    def __init__(self, key: bytes):
        assert len(key) == 32, "Key must be exactly 32 bytes for AES-256"
        self.key = key

    def encrypt(self, data: dict) -> str:
        cipher   = AES.new(self.key, AES.MODE_CBC)
        ct       = cipher.encrypt(pad(json.dumps(data).encode(), AES.block_size))
        return base64.b64encode(cipher.iv + ct).decode()

    def decrypt(self, payload: str) -> dict:
        raw    = base64.b64decode(payload)
        iv, ct = raw[:16], raw[16:]
        cipher = AES.new(self.key, AES.MODE_CBC, iv)
        return json.loads(unpad(cipher.decrypt(ct), AES.block_size))

    def save_to_file(self, aadhaar_hash: str, estate_data: dict):
        """Local file store for development. Replace with Algorand MCP in production."""
        os.makedirs(".vault", exist_ok=True)
        with open(f".vault/{aadhaar_hash}.enc", "w") as f:
            f.write(self.encrypt(estate_data))

    def decrypt_and_load(self, aadhaar_hash: str) -> list[dict]:
        with open(f".vault/{aadhaar_hash}.enc") as f:
            return self.decrypt(f.read())["assets"]
