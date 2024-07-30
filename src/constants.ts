import * as path from "@std/path";
import JSONBig from "json-bigint";
import { PODStore } from "./types.ts";

export const jsonBig = JSONBig({
  useNativeBigInt: true,
  alwaysParseAsBig: true,
});

// Load config
export const configDir = path.join(import.meta.dirname, "..");
export const configFile = "serverConfig.json";

export const dataDir = path.join(import.meta.dirname, "..");
export const podStoreFile = "pods.json";
export const credentialFile = "credentials.json";

export const siteDir = path.join(import.meta.dirname, "..", "public");

export const serverConfig: ServerConfig = JSON.parse(
  await Deno.readTextFile(path.join(configDir, configFile)),
);
export const credentials = JSON.parse(
  await Deno.readTextFile(path.join(dataDir, credentialFile)),
);

// Record mapping template POD content IDs to the corresponding
// submission, which contains the entries and the signer's private key
// (if it differs from the default server key).
export const podStore: PODStore = await (async (): Promise<PODStore> => {
  try {
    return jsonBig.parse(
      await Deno.readTextFile(path.join(dataDir, podStoreFile)),
    );
  } catch {
    return {};
  }
})();