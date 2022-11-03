const broadcast = function (data) {
    console.log(data.keys)
   //return console.log(aggregate(data)) //źródełko
};

let keys = [];
const aggregate = function (data) {
    if (data === undefined || data === null) return;
    if (data.keys.length !== 0 && data.keys !== undefined) {
        console.log(data.keys)
        keys.push(data.keys);
    }
    return {
        devices: data.devices,
        keys: keys.filter((a, i) => keys.findIndex((s) => a.controller === s.controller && a.number === s.number) === i)
    };
}

const clearKeys = function () {
    return keys.length = 0;
}

module.exports = {
    broadcast,
    aggregate,
    clearKeys,
}