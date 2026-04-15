from vault.asset_vault import AssetVault

KEY = bytes.fromhex("00" * 32)

def test_encrypt_decrypt_roundtrip():
    vault = AssetVault(KEY)
    data  = {"assets": [{"nominee_addr": "ABC", "asset_id": 0, "amount": 1000000}]}
    enc   = vault.encrypt(data)
    dec   = vault.decrypt(enc)
    assert dec == data
