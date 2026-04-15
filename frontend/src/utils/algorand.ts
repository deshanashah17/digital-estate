import algosdk from "algosdk";

const getEnv = (key: string, defaultValue: string) => {
  try {
    return (import.meta as any).env[key] ?? defaultValue;
  } catch {
    return defaultValue;
  }
};

export const algodClient = new algosdk.Algodv2(
  getEnv("VITE_ALGOD_TOKEN", ""),
  getEnv("VITE_ALGOD_URL", "https://testnet-api.algonode.cloud"),
  "",
);

export async function getAppState(appId: number) {
  const info = await algodClient.getApplicationByID(appId).do();
  const state: Record<string, string | number> = {};
  for (const kv of info.params["global-state"] ?? []) {
    const key = atob(kv.key);
    state[key] = kv.value.type === 1
      ? atob(kv.value.bytes)
      : kv.value.uint;
  }
  return state;
}
