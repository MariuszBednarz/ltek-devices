const broadcast = function (data) {
    return console.log(aggregate(data)) //źródełko
};

let keys = [];
const aggregate = function (data) {
    if (data === undefined || data === null) return;
    if (data.keys.length !== 0 && data.keys.down !== undefined && data.keys.up !== undefined) {
        keys.push(...data.keys.down);
        keys = keys.filter(key => !data.keys.up.includes(key.number))
    }
    return {
        devices: data.devices,
        keys: keys.filter((a, i) => keys.findIndex((s) => a.controller === s.controller && a.number === s.number) === i)
    };
}

module.exports = {
    broadcast,
    aggregate
}