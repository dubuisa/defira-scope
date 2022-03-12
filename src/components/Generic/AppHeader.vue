<template>
    <div class="bg-light border-bottom">
        <div class="container">
            <div class="col-lg-8 m-auto d-flex">
                <form @submit.prevent="setUserAddress" class="needs-validation col-lg-12">
                    <input type="text" id="address" class="col-lg-10 m-lg-2" placeholder="input your address here!" required v-bind:class="{'is-invalid': userAddressInvalid}" v-model="userAddress">
                    <button class="btn btn-primary m-auto">{{ addressSetButtonText }}</button>
                </form>
                <b-dropdown id="dropdown-1" text="" class="m-lg-2" >
                    <b-dropdown-item v-bind:to="'/tokenSupply'">Token Circulating Info</b-dropdown-item>
                    <b-dropdown-item v-bind:to="'/farm'">Farming</b-dropdown-item>
                    <b-dropdown-item v-bind:to="'/about'">About</b-dropdown-item>
                    <b-dropdown-divider></b-dropdown-divider>
                    <b-dropdown-item href="https://game.defira.com/">Defira</b-dropdown-item>
                    <b-dropdown-item href="https://app.tranquil.finance/">Tranquil</b-dropdown-item>
                </b-dropdown>

            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "AppHeader",
    data(){
        return {
            userAddress: "",
            userAddressInvalid: false,
            addressSetButtonText: "Set"
        }
    },
    methods:{
        setUserAddress(){
            if (this.userAddress.length === 42 && (this.userAddress.substr(0, 2) === "0x")){
                this.$store.commit("userAddress", this.userAddress);
                this.addressSetButtonText = "Done!"
            }
            else {
                this.userAddressInvalid = true;
            }
        }
    }
}
</script>

<style>
</style>