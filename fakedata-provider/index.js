const servers = require("./mock-data-servers");
const services = require("./mock-data-services");

servers.forEach(mockedServer => {
    mockedServer.externalId = Math.random().toString(36).split(".").pop();
    mockedServer.services = randomServices(6);
})

const executor = resolvedValue => resolve =>
    setTimeout(() => resolve(resolvedValue), 0)


function randomNumber(max) {
    return Number.parseInt(Math.random() * max)
}

function randomServices(numServices) {
    const randomServices = [];
    for (let i = 0; i < numServices; i++) {
        // Pick a random service random number of times
        const randomService = services[randomNumber(services.length)];
        randomServices.push(randomService);
    }

    return randomServices;
}

function randomServer() {
    const randomServer = servers[randomNumber(servers.length)];
    const mockedServer = { ...randomServer };
    mockedServer.services = randomServices(randomNumber(5));
    return mockedServer;
}

function getServers() {
    return new Promise(executor(servers));
}

function getServer(id) {
    return new Promise(executor(servers[id]));
}

module.exports = {
    getServer,
    getServers,
    randomServer,
    randomNumber,
    randomServices
}