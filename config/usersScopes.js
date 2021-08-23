const adminScopes = [
  // Analysis
  "analysis:create",
  "analysis:read",
  "analysis:update",
  "analysis:delete",
  // ApiKeys
  "apikey:create",
  "apikey:read",
  "apikey:update",
  "apikey:delete",
  // News
  "new:create",
  "new:read",
  "new:update",
  "new:delete",
  // Rankings
  "ranking:create",
  "ranking:read",
  "ranking:update",
  "ranking:delete",
  // User
  "user:create",
  "user:read",
  "user:update",
  "user:delete",
  // Websites
  "website:create",
  "website:read",
  "website:update",
  "website:delete",
];

const userScopes = [
  // Analysis
  "analysis:create",
  "analysis:read",
  // ApiKeys

  // News
  "new:create",
  "new:read",
  // Rankings

  // User

  // Websites
  "website:create",
  "website:read",
];

module.exports = { adminScopes, userScopes };
