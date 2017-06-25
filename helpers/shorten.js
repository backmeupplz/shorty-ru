const db = require('./db');
const generator = require('./generator');

async function shorten(address) {
  let dbaddress = await db.findAddress(address);

  if (!dbaddress) {
    const shortUrl = await getShortUrl(address);
    dbaddress = await db.saveAddress({
      original_url: address,
      short_url: shortUrl,
    });
  }

  return dbaddress.short_url;
}

async function getShortUrl(address) {
  const shortUrl = generator();
  const longAddress = await db.findLongAddress(shortUrl);
  if (longAddress) {
    return await getShortUrl(address);
  } else {
    return shortUrl;
  }
}

/** Exports */
module.exports = {
  shorten,
};
