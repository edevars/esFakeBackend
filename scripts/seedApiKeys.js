const bcrypt = require("bcrypt");
const { adminScopes, userScopes } = require("../config/usersScopes");
const { ApiKeyService } = require("../services/apiKeys");
const { scopesToString } = require("../utils/scopesTransformation");
const { initConnection } = require("../lib/database/initConnection");



function generateRandomToken() {
  let randomApiKey = "";
  for (let i = 0; i < 64; i++) {
    let charCode = Math.floor(Math.random() * (126 - 34)) + 34;
    let randomChar = String.fromCharCode(charCode);
    randomApiKey += randomChar;
  }

  const hashedApiKey = bcrypt.hashSync(randomApiKey, 10);
  return hashedApiKey;
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
