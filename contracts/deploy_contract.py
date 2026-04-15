import os, base64
from dotenv import load_dotenv
from algosdk.v2client import algod
from algosdk import account, transaction

load_dotenv()

def deploy():
    client = algod.AlgodClient(
        os.getenv("ALGOD_TOKEN", ""),
        os.getenv("ALGOD_URL", "https://testnet-api.algonode.cloud"),
    )
    private_key = os.getenv("SENTINEL_PRIVATE_KEY")
    address     = account.address_from_private_key(private_key)
    sp          = client.suggested_params()

    with open("estate_approval.teal") as f:
        approval_program = base64.b64decode(client.compile(f.read())["result"])
    with open("estate_clear.teal") as f:
        clear_program = base64.b64decode(client.compile(f.read())["result"])

    txn = transaction.ApplicationCreateTxn(
        sender=address, sp=sp,
        on_complete=transaction.OnComplete.NoOpOC,
        approval_program=approval_program,
        clear_program=clear_program,
        global_schema=transaction.StateSchema(num_uints=3, num_byte_slices=3),
        local_schema=transaction.StateSchema(num_uints=0, num_byte_slices=0),
    )
    signed = txn.sign(private_key)
    tx_id  = client.send_transaction(signed)
    result = transaction.wait_for_confirmation(client, tx_id, 4)
    app_id = result["application-index"]
    print(f"Contract deployed. APP_ID={app_id}")
    with open(".app_id", "w") as f:
        f.write(str(app_id))

if __name__ == "__main__":
    deploy()
