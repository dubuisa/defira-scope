const { Harmony } = require('@harmony-js/core')
const {
    ChainID,
    ChainType,
} = require('@harmony-js/utils');

const hmy = new Harmony(
    'https://rpc.s0.t.hmny.io',
    {
        chainType: ChainType.Harmony,
        chainId: ChainID.HmyMainnet,
    },
);

async function getHarmonyPrice(){
    const contractAbi = [{"name":"getReserves","type":"function","outputs":[{"name":"_reserve0","internalType":"uint112","type":"uint112"},{"name":"_reserve1","type":"uint112","internalType":"uint112"},{"internalType":"uint32","type":"uint32","name":"_blockTimestampLast"}],"stateMutability":"view","inputs":[]}];
    const contractAddress = '0x66c17f5381d7821385974783be34c9b31f75eb78'.toLowerCase(); // USDC - WONE LP Contract
    const contract = hmy.contracts.createContract(contractAbi, contractAddress);
    const res = await contract.methods.getReserves().call();

    return (res[0] / 1e6) / (res[1] / 1e18);

}

async function getFiraPrice(){
    const hmyPrice = await getHarmonyPrice();
    const contractAbi = [{"name":"getReserves","type":"function","outputs":[{"name":"_reserve0","internalType":"uint112","type":"uint112"},{"name":"_reserve1","type":"uint112","internalType":"uint112"},{"internalType":"uint32","type":"uint32","name":"_blockTimestampLast"}],"stateMutability":"view","inputs":[]}];
    const contractAddress = '0x08De72C31eCf51dDa637624d1e767578d1914dca'.toLowerCase();

    const contract = hmy.contracts.createContract(contractAbi, contractAddress);
    const res = await contract.methods.getReserves().call();

    const firaPrice = ((res[1] / 1e18) / (res[0] / 1e18)) * hmyPrice;
    const priceTimestamp = -(parseInt(res[2], 16) - Math.floor(new Date().getTime() / 1000));

    return [firaPrice, priceTimestamp];
}

async function getTranqPrice(){
    const hmyPrice = await getHarmonyPrice();
    const contractAbi = [{"name":"getReserves","type":"function","outputs":[{"name":"_reserve0","internalType":"uint112","type":"uint112"},{"name":"_reserve1","type":"uint112","internalType":"uint112"},{"internalType":"uint32","type":"uint32","name":"_blockTimestampLast"}],"stateMutability":"view","inputs":[]}];
    const contractAddress = '0xB91945E55bb4Ff672aCe118179CFdF281877bf35'.toLowerCase();

    const contract = hmy.contracts.createContract(contractAbi, contractAddress);
    const res = await contract.methods.getReserves().call();
    return ((res[1] / 1e18) / (res[0] / 1e18)) * hmyPrice;
}

export { getHarmonyPrice, getFiraPrice, getTranqPrice };