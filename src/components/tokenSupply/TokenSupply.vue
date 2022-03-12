<template>
    <div class="container">
        <div class="col-lg-8 m-auto">
            <h2 class="mt-2 p-2 text-center" >FIRA Circulating Supply</h2>
            <table class="table border">
                <tbody>
                    <tr>
                        <th>Current Circulating Supply</th>
                        <td class="text-end">{{ numberSeparator(circulatingSupply) }} FIRA</td>
                        <td/>
                    </tr>
                    <tr>
                        <th>Token Price</th>
                        <td class="text-end">${{ firaPrice.toFixed(2) }}</td>
                        <td class="text-end">{{ priceTimestamp }}s ago</td>
                    </tr>
                    <tr>
                        <th>Market Cap</th>
                        <td class="text-end">${{ marketCap }}</td>
                        <td/>
                    </tr>
                    <tr>
                        <th>FIRA in Staking and LP</th>
                        <td class="text-end">{{ numberSeparator(((parseFloat(stakedFira) + parseFloat(lpStakedFira1) + parseFloat(lpStakedFira2))).toFixed(0)) }} FIRA*</td>
                        <td class="text-end">{{ ((parseFloat(stakedFira) + parseFloat(lpStakedFira1) + parseFloat(lpStakedFira2)) / circulatingSupply * 100).toFixed(4) }}%*</td>
                    </tr>
                    <tr>
                        <th>FIRA in Staking</th>
                        <td class="text-end">{{ numberSeparator(stakedFira) }} FIRA</td>
                        <td class="text-end">{{ (stakedFira / circulatingSupply * 100).toFixed(4) }}%</td>
                    </tr>
                    <tr>
                        <th>FIRA - ONE LP</th>
                        <td class="text-end">{{ numberSeparator(lpStakedFira1) }} FIRA</td>
                        <td class="text-end">{{ (lpStakedFira1 / circulatingSupply * 100).toFixed(4) }}%</td>
                    </tr>
                    <tr>
                        <th>FIRA - TRANQ LP</th>
                        <td class="text-end">{{ numberSeparator(lpStakedFira2) }} FIRA</td>
                        <td class="text-end">{{ (lpStakedFira2 / circulatingSupply * 100).toFixed(4) }}%</td>
                    </tr>
                    <tr>
                        <th>sFira in Unsealing Process</th>
                        <td class="text-end">{{ numberSeparator(sFiraOnUnsealing) }} sFIRA</td>
                        <td/>
                    </tr>
                    <tr>
                        <th>sFira in Staking</th>
                        <td class="text-end">{{ numberSeparator(sFiraOnStaking) }} sFIRA</td>
                        <td/>
                    </tr>
                </tbody>
            </table>
            <p>*Fira Circulating Supply info was fetched from address 0xeA877C177A86ddc6427bAB2596E65A9566b1e7B0<br/>
               and balance address 0x338445769b89bebfbf91348d6eeaf8b9154d3646 was excluded from calculating circulation.<br/>
               in this case, FIRA token in LP token owned by this address maybe not included in circulating supply. <br/>
               it means percentage of 'FIRA in Staking and LP' can be lower.
            </p>
        </div>
    </div>
</template>

<script>
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
)

const { getHarmonyPrice, getFiraPrice } = require('@/utils/tokenPrice.js')
const { address } = require('@/utils/address.js')
const { abis } = require('@/utils/abis.js')

export default{
    // eslint-disable-next-line vue/multi-word-component-names
    name:"TokenSupply",
    data(){
        return {
            circulatingSupply: 0,
            firaPrice: 0,
            harmonyPrice: 0,
            priceTimestamp: 0,
            stakedFira: 0,
            lpStakedFira1: 0,
            lpStakedFira2: 0,
            sFiraOnUnsealing: 0,
            sFiraOnStaking: 0
        }
    },
    methods:{
        numberSeparator(x){
            return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
        },
        async getFiraCirculatingSupply(){
            const contract = hmy.contracts.createContract(abis.tokenCirculation, address.tokenCirculation.toLowerCase());
            this.circulatingSupply = (await contract.methods.circulatingSupply().call() / 1e18).toFixed(0);
        },
        getFiraStakingAmount(){
            const contract = hmy.contracts.createContract(abis.firaToken, address.firaToken.toLowerCase());
            contract.methods.balanceOf(address.firaStakingPool.toLowerCase()).call().then(amount =>{
                this.stakedFira = (amount / 1e18).toFixed(0);
            });
        },
        getFiraLiqudityAmount(){
            const contract = hmy.contracts.createContract(abis.firaToken, address.firaToken.toLowerCase());
            contract.methods.balanceOf(address.firaOneLP.toLowerCase()).call().then(amount => {
                this.lpStakedFira1 = (amount / 1e18).toFixed(0);
            });
            contract.methods.balanceOf(address.firaTranqLP.toLowerCase()).call().then(amount => {
                this.lpStakedFira2 = (amount / 1e18).toFixed(0);
            });
        },
        getUnsealingAmount(){
            const contract = hmy.contracts.createContract(abis.firaToken, address.sealedFiraToken.toLowerCase());
            contract.methods.balanceOf(address.sealedFiraUnsealingPool.toLowerCase()).call().then(amount =>{
                this.sFiraOnUnsealing = (amount / 1e18).toFixed(0);
            });
        },
        getStakingSFIRA(){
            const contract = hmy.contracts.createContract(abis.tokenStakingPool, address.sealedFiraStakingPool.toLowerCase());
            contract.methods.totalSupplies().call().then(amount =>{
                this.sFiraOnStaking = (amount / 1e18).toFixed(0);
            });
        },
        async loadTokenStatus(){
            this.harmonyPrice = await getHarmonyPrice();
            [this.firaPrice, this.priceTimestamp] = await getFiraPrice();
            this.getFiraCirculatingSupply();
            this.getFiraStakingAmount();
            this.getFiraLiqudityAmount();
            this.getStakingSFIRA();
            this.getUnsealingAmount();
        }
    },
    mounted(){
        this.loadTokenStatus();
    },
    computed:{
        marketCap: function(){
            return this.numberSeparator((this.circulatingSupply * this.firaPrice).toFixed(2));
        }
    }
}
</script>

<style>
    td { padding: 5px; }
    th { padding: 5px; }
</style>