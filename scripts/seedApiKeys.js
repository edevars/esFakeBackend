const { adminScopes, userScopes } = require("../config/usersScopes");
const { ApiKeyService } = require("../services/apiKeys");
const { scopesToString } = require("../utils/scopesTransformation");
const { initConnection } = require("../lib/database/initConnection");



function generateRandomToken() {
  return Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2)
}

const apiKeys = [
  {
    token: generateRandomToken(),
    scopes: scopesToString(adminScopes),
  },
  {
    token: generateRandomToken(),
    scopes: scopesToString(userScopes),
  },
];

async function seedApiKeys() {
  const apiKeyService = new ApiKeyService();
  try {
    await initConnection();
    let promises = apiKeys.map(async (apiKey) => {
      await apiKeyService.createApiKey(apiKey);
    });
    await Promise.all(promises);
  } catch (err) {
    console.error(err);
  }
}

seedApiKeys()
