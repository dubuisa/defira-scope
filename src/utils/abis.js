const abis = {
    'firaToken': require('@/abi/firaTokenAbi.json'),
    'lpStakingPool': require('@/abi/liquidityStakingPoolAbi.json'),
    'tokenStakingPool': require('@/abi/sealedFiraStakingPoolAbi.json'),
    'tokenCirculation': require('@/abi/tokenCirculationAbi.json'),
    'tranqFramController': require('@/abi/tranqFarmControllerAbi.json'),
    'tranqLiquidityToken': require('@/abi/tranqLiquidityPoolAbi.json'),
    'usdcToken': require('@/abi/USDC_token_abi.json'),
    'woneToken': require('@/abi/WONE_token_abi.json')
}

export { abis };