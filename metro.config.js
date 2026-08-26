const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

for (const extension of ["db", "wasm"]) {
  if (!config.resolver.assetExts.includes(extension)) {
    config.resolver.assetExts.push(extension);
  }
}

// expo-sqlite Web usa SharedArrayBuffer no worker WASM.
// Estes headers cobrem o servidor Metro de desenvolvimento. O host de
// produção deverá reproduzir os mesmos headers no gate de publicação Web.
config.server.enhanceMiddleware = (middleware) => {
  return (request, response, next) => {
    response.setHeader(
      "Cross-Origin-Embedder-Policy",
      "credentialless",
    );
    response.setHeader(
      "Cross-Origin-Opener-Policy",
      "same-origin",
    );

    return middleware(request, response, next);
  };
};

module.exports = config;
