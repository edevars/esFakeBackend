function scopesToString(scopesArray) {
  return scopesArray.toString();
}

function scopesToArray(scopesString) {
  return scopesString.split(",");
}

module.exports = { scopesToString, scopesToArray };
