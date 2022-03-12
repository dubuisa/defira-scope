<template>
    <div class="container">
        <div class="col-lg-8 m-auto" v-if="userAddress != null">
            <h2 class="text-center">Overview</h2>
            <div class="col-lg-8 m-auto">
                <table class="table border">
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th class="text-end">Amount</th>
                            <th class="text-end">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>Fira Own & Staking</th>
                            <td class="text-end">{{ userFiraAmount }}</td>
                            <td class="text-end">{{ userFiraPrice }}</td>
                        </tr>
                        <tr>
                            <th>sFira Own & Staking</th>
                            <td class="text-end">{{ userSealedFiraAmount }}</td>
                            <td class="text-end">{{ userSealedFiraPrice }}</td>
                        </tr>
                        <tr>
                            <th>sFira Unsealing</th>
                            <td class="text-end">{{ userSealedFiraUnsealing.toFixed(4) }}</td>
                            <td class="text-end">{{ userSealedFiraUnsealingPrice }}</td>
                        </tr>
                        <tr>
                            <th>Farms</th>
                            <td/>
                            <td class="text-end">{{ totalUserLiquidityPrice }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <h2 class="text-center">Fira Stats</h2>
            <div class="col-lg-8 m-auto">
                <table class="table border">
                    <thead>
                        <tr>
                            <th>FIRA Stats</th>
                            <th class="text-end">Amount</th>
                            <th class="text-end">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>FIRA Owned</th>
                            <td class="text-end">{{ userFiraBalance.toFixed(4) }}</td>
                            <td class="text-end">{{ userFiraBalancePrice }}</td>
                        </tr>
                        <tr>
                            <th>FIRA Staking</th>
                            <td class="text-end">{{ userFiraStaking.toFixed(4) }}</td>
                            <td class="text-end">{{ userFiraStakingPrice }}</td>
                        </tr>
                        <tr v-if="userFiraStaking > 0">
                            <td/>
                            <th class="text-end">Daily Rewards</th>
                            <th class="text-end">APR</th>
                        </tr>
                        <tr v-if="userFiraStaking > 0">
                            <th>sFira</th>
                            <td class="text-end">{{ userFiraStakingRewards }}</td>
                            <td class="text-end">{{ userFiraStakingRewardsApr }}</td>
                        </tr>
                    </tbody>
                    <thead>
                        <tr>
                            <th>Sealed FIRA Stats</th>
                            <th class="text-end">Amount</th>
                            <th class="text-end">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>sFira Owned</th>
                            <td class="text-end">{{ userSealedFiraBalance.toFixed(4) }}</td>
                            <td class="text-end">{{ userSealedFiraBalancePrice }}</td>
                        </tr>
                        <tr>
                            <th>sFira Unsealing</th>
                            <td class="text-end">{{ userSealedFiraUnsealing.toFixed(4) }}</td>
                            <td class="text-end">{{ userSealedFiraUnsealingPrice }}</td>
                        </tr>
                        <tr>
                            <th>sFira Staking</th>
                            <td class="text-end">{{ userSealedFiraStaking.toFixed(4) }}</td>
                            <td class="text-end">{{ userSealedFiraStakingPrice }}</td>
                        </tr>
                        <tr v-if="userSealedFiraStaking > 0">
                            <td/>
                            <th class="text-end">Daily Rewards</th>
                            <th class="text-end">APR</th>
                        </tr>
                        <tr v-if="userSealedFiraStaking > 0">
                            <th>sFira</th>
                            <td class="text-end">{{ userSealedFiraStakingRewards }}</td>
                            <td class="text-end">{{ userSealedFiraStakingRewardsApr }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div v-if="userPoolInfo.length > 0">
                <h2 class="text-center">Liquidity Farming</h2>
                <div class="col-lg-8 m-auto" v-for="pool in userPoolInfo" v-bind:key="pool.index">
                    <h5 class="text-center">{{ pool.token0Symbol }} - {{ pool.token1Symbol }} LP</h5>
                    <table class="table border">
                        <tbody>
                            <tr>
                                <th>LP Token Amount</th>
                                <td class="text-end">{{ pool.poolTokenAmount.toFixed(4) }}</td>
                                <td class="text-end">{{ pool.poolUsdPrice.toFixed(2) }}</td>
                            </tr>
                            <tr>
                                <th>LP Token Shares</th>
                                <td colspan="2" class="text-end">{{ (pool.liquidityTokenStakingShare * 100).toFixed(4) }}%</td>
                            </tr>
                            <tr>
                                <th>{{ pool.token0Symbol }} Amount</th>
                                <td colspan="2" class="text-end" >{{ pool.token0Amount.toFixed(4) }}</td>
                            </tr>
                            <tr>
                                <th>{{ pool.token1Symbol }} Amount</th>
                                <td colspan="2" class="text-end">{{ pool.token1Amount.toFixed(4) }}</td>
                            </tr>
                            <tr>
                                <th>Token</th>
                                <th class="text-end">Daily Rewards</th>
                                <th class="text-end">APR</th>
                            </tr>
                            <tr v-if="pool.firaRewards > 0">
                                <td>FIRA</td>
                                <td class="text-end">{{ pool.firaRewards.toFixed(4) }}</td>
                                <td class="text-end">{{ (pool.firaRewards * firaPrice / pool.poolUsdPrice * 365 * 100).toFixed(2) }}%</td>
                            </tr>
                            <tr v-if="pool.sFiraRewards > 0">
                                <td>sFIRA</td>
                                <td class="text-end">{{ pool.sFiraRewards.toFixed(4) }}</td>
                                <td class="text-end">{{ (pool.sFiraRewards * firaPrice / pool.poolUsdPrice * 365 * 100).toFixed(2) }}%</td>
                            </tr>
                            <tr v-if="pool.tranqRewards > 0">
                                <td>TRANQ</td>
                                <td class="text-end">{{ pool.tranqRewards.toFixed(4) }}</td>
                                <td class="text-end">{{ (pool.tranqRewards * tranqPrice / pool.poolUsdPrice * 365 * 100).toFixed(2) }}%</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div v-else>
            <p class="text-center">^^^ enter your address ^^^</p>
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

const { getHarmonyPrice, getFiraPrice, getTranqPrice } = require('@/utils/tokenPrice.js')
const { address } = require('@/utils/address.js')
const { abis } = require('@/utils/abis.js')

export default{
    // eslint-disable-next-line vue/multi-word-component-names
    name:"Farm",
    data(){
        return {
            userAddress: null,
            firaPrice: 0,
            harmonyPrice: 0,
            tranqPrice: 0,
            userFiraBalance: 0,
            userFiraStaking: 0,
            userSealedFiraBalance: 0,
            userSealedFiraStaking: 0,
            userSealedFiraUnsealing: 0,
            totalFiraStaking: 0,
            firaStakingPoolRewards: 0,
            totalSealedFiraStaking: 0,
            sealedFiraStakingPoolRewards: 0,
            userPoolInfo: []
        }
    },
    methods:{
        async getUserFiraAmount(){
            const tokenContract = hmy.contracts.createContract(abis.firaToken, address.firaToken.toLowerCase());
            this.userFiraBalance = await tokenContract.methods.balanceOf(this.userAddress).call() / 1e18;

            const stakingPoolContract = hmy.contracts.createContract(abis.tokenStakingPool, address.firaStakingPool.toLowerCase());
            this.userFiraStaking = await stakingPoolContract.methods.supplyAmount(this.userAddress).call() / 1e18;
            this.totalFiraStaking = await stakingPoolContract.methods.totalSupplies().call() / 1e18;
            this.firaStakingPoolRewards = await stakingPoolContract.methods.rewardSpeeds(1).call() / 1e18;
        },
        async getUserSealedFiraAmount(){
            const tokenContract = hmy.contracts.createContract(abis.firaToken, address.sealedFiraToken.toLowerCase());
            this.userSealedFiraBalance = await tokenContract.methods.balanceOf(this.userAddress).call() / 1e18;

            const stakingPoolContract = hmy.contracts.createContract(abis.tokenStakingPool, address.sealedFiraStakingPool.toLowerCase());
            this.userSealedFiraStaking = await stakingPoolContract.methods.supplyAmount(this.userAddress).call() / 1e18;
            this.totalSealedFiraStaking = await stakingPoolContract.methods.totalSupplies().call() / 1e18;
            this.sealedFiraStakingPoolRewards = await stakingPoolContract.methods.rewardSpeeds(1).call() / 1e18;

            const unsealingPoolContract = hmy.contracts.createContract(abis.tokenStakingPool, address.sealedFiraUnsealingPool.toLowerCase());
            this.userSealedFiraUnsealing = await unsealingPoolContract.methods.supplyAmount(this.userAddress).call() / 1e18;
        },
        async fetchFarmingInfo(){
            this.userPoolInfo = [];
            const contract = hmy.contracts.createContract(abis.tranqFramController, address.tranqFramController.toLowerCase());
            const length = await contract.methods.poolLength().call();

            for (var i = 0; i < length; i++){
                const liquidityToken = await contract.methods.userInfo(i, this.userAddress).call();
                const lpAddress = await contract.methods.poolInfo(i).call();

                if(liquidityToken > 0){
                    var poolInfo = {};
                    poolInfo.index = this.userPoolInfo.length;
                    poolInfo.poolAddress = lpAddress.stakingPool.toLowerCase();
                    poolInfo.poolTokenAmount = liquidityToken / 1e18;
                    const poolContract = hmy.contracts.createContract(abis.lpStakingPool, poolInfo.poolAddress);
                    const tranqLiquidityContract = hmy.contracts.createContract(abis.tranqLiquidityToken, lpAddress.lpToken);
                    
                    const totalLiquidityTokenAmount = await tranqLiquidityContract.methods.totalSupply().call() / 1e18;
                    poolInfo.liquidityTokenShare = poolInfo.poolTokenAmount / totalLiquidityTokenAmount;
                    poolInfo.token0Address = await tranqLiquidityContract.methods.token0().call();
                    poolInfo.token1Address = await tranqLiquidityContract.methods.token1().call();
                    
                    poolInfo.token0Symbol = await hmy.contracts.createContract(abis.firaToken, poolInfo.token0Address).methods.symbol().call();
                    poolInfo.token1Symbol = await hmy.contracts.createContract(abis.firaToken, poolInfo.token1Address).methods.symbol().call();

                    const res = await tranqLiquidityContract.methods.getReserves().call();
                    poolInfo.token0Amount = (poolInfo.token0Symbol === '1USDC' || poolInfo.token0Symbol === '1USDT') ? (res[0] * poolInfo.liquidityTokenShare) / 1e6 : (res[0] * poolInfo.liquidityTokenShare) / 1e18;
                    poolInfo.token1Amount = (poolInfo.token1Symbol === '1USDC' || poolInfo.token1Symbol === '1USDT') ? (res[1] * poolInfo.liquidityTokenShare) / 1e6 : (res[1] * poolInfo.liquidityTokenShare) / 1e18;

                    poolInfo.liquidityTokenStakingShare = poolInfo.poolTokenAmount / (await tranqLiquidityContract.methods.balanceOf(poolInfo.poolAddress).call() / 1e18);
                    poolInfo.firaRewards = await poolContract.methods.rewardSpeeds(0).call() / 1e18 * 60 * 60 * 24 * poolInfo.liquidityTokenStakingShare;
                    poolInfo.sFiraRewards = await poolContract.methods.rewardSpeeds(1).call() / 1e18 * 60 * 60 * 24 * poolInfo.liquidityTokenStakingShare;
                    poolInfo.tranqRewards = await poolContract.methods.rewardSpeeds(3).call() / 1e18 * 60 * 60 * 24 * poolInfo.liquidityTokenStakingShare;

                    if(poolInfo.token0Symbol === 'WONE'){
                        poolInfo.poolUsdPrice = poolInfo.token0Amount * this.harmonyPrice * 2;
                    }
                    else if(poolInfo.token1Symbol === 'WONE'){
                        poolInfo.poolUsdPrice = poolInfo.token1Amount * this.harmonyPrice * 2;
                    }
                    else if(poolInfo.token0Symbol === 'FIRA'){
                        poolInfo.poolUsdPrice = poolInfo.token0Amount * this.firaPrice * 2;
                    }
                    else{
                        poolInfo.poolUsdPrice = poolInfo.token1Amount * this.firaPrice * 2;
                    }
                    this.userPoolInfo.push(poolInfo);
                }
            }
        },
        async initialize(){
            this.harmonyPrice = await getHarmonyPrice();
            [this.firaPrice, ] = await getFiraPrice();
            this.tranqPrice = await getTranqPrice();
            this.getUserFiraAmount();
            this.getUserSealedFiraAmount();
            this.fetchFarmingInfo();
        }
    },
    computed:{
        userFiraAmount: function(){
            return (parseFloat(this.userFiraBalance) + parseFloat(this.userFiraStaking)).toFixed(4);
        },
        userFiraPrice: function(){
            return ((parseFloat(this.userFiraBalance) + parseFloat(this.userFiraStaking)) * this.firaPrice).toFixed(4);
        },
        userSealedFiraAmount: function(){
            return (parseFloat(this.userSealedFiraBalance) + parseFloat(this.userSealedFiraStaking)).toFixed(4);
        },
        userSealedFiraPrice: function(){
            return ((parseFloat(this.userSealedFiraBalance) + parseFloat(this.userSealedFiraStaking)) * this.firaPrice).toFixed(4);
        },
        userSealedFiraUnsealingPrice: function(){
            return (this.userSealedFiraUnsealing * this.firaPrice).toFixed(4);
        },
        userFiraBalancePrice: function(){
            return (this.userFiraBalance * this.firaPrice).toFixed(4);
        },
        userFiraStakingPrice: function(){
            return (this.userFiraStaking * this.firaPrice).toFixed(4);
        },
        userSealedFiraBalancePrice: function(){
            return (this.userSealedFiraBalance * this.firaPrice).toFixed(4);
        },
        userSealedFiraStakingPrice: function(){
            return (this.userSealedFiraStaking * this.firaPrice).toFixed(4);
        },
        userFiraStakingRewards: function(){
            return ((this.userFiraStaking / this.totalFiraStaking) * this.firaStakingPoolRewards * 60 * 60 * 24).toFixed(4);
        },
        userFiraStakingRewardsApr: function(){
            return (this.userFiraStaking / this.totalFiraStaking * this.firaStakingPoolRewards * 60 * 60 * 24 / this.userFiraStaking * 365 * 100).toFixed(4);
        },
        userSealedFiraStakingRewards: function(){
            return ((this.userSealedFiraStaking / this.totalSealedFiraStaking) * this.sealedFiraStakingPoolRewards * 60 * 60 * 24).toFixed(4);
        },
        userSealedFiraStakingRewardsApr: function(){
            return (this.userSealedFiraStaking / this.totalSealedFiraStaking * this.sealedFiraStakingPoolRewards * 60 * 60 * 24 / this.userSealedFiraStaking * 365 * 100).toFixed(4);
        },
        totalUserLiquidityPrice: function(){
            var totalPrice = 0;
            for(var i = 0; i < this.userPoolInfo.length; i++){
                totalPrice = totalPrice + parseFloat(this.userPoolInfo[i].poolUsdPrice);
            }
            return totalPrice.toFixed(4);
        },
        getUserAddress(){
            return this.$store.getters.getUserAddress;
        }
    },
    watch:{
        getUserAddress(value){
            this.userAddress = value;
            this.initialize();
        }
    },
    mounted(){
        this.userAddress = this.$store.state.userAddress;
        if( this.userAddress != null){
            this.initialize();
        }
    }
}
</script>