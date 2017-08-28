var sha256crypt = require('./src/sha256crypt').cwrap('sha256_crypt', 'string', ['string', 'string']);

function verify(password, rounds, salt, derived) {
    var rounds_n = parseInt(rounds, 10);
    if (rounds_n < 1000) {
        throw new Error('Rounds must be at least 1000.');
    }
    if (rounds_n > 999999999) {
        throw new Error('Rounds must be at most 999999999.');
    }
    const padded_salt = '$5$rounds=' + rounds_n.toFixed(0) + '$' + salt;
    const hash = sha256crypt(password, padded_salt);
    const verify = `${padded_salt}$${derived}`;
    return (hash === verify);
}

function hash(password, rounds, salt) {
    var rounds_n = parseInt(rounds, 10);
    if (rounds_n < 1000) {
        throw new Error('Rounds must be at least 1000.');
    }
    if (rounds_n > 999999999) {
        throw new Error('Rounds must be at most 999999999.');
    }
    const padded_salt = '$5$rounds=' + rounds_n.toFixed(0) + '$' + salt;
    const hash = sha256crypt(password, padded_salt);
    return hash.split('$').pop();
}

module.exports = {
    verify: verify,
    hash: hash
}