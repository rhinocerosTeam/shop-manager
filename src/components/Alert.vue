<template>
    <div class="alert-model" v-show="alert.show" transition="modal">
        <div class="modal-confirm">
            <h2 class="deltle">
                {{ alert.title }}
            </h2>
            <div class="deltxt" v-html="alert.message">
            </div>
            <div class="zydelbtndv">
                <hf-button mClass="delbtn delok" :style="alert.okStyle" v-show="alert.type == 'confirm'" @click="confirm">{{ alert.okBtnText }}</hf-button>
                <hf-button mClass="delbtn delno" :style="alert.cancelStyle" @click="close" >{{ alert.canlBtnText }}</hf-button>
            </div>
        </div>
    </div>
</template>

<script>
    import HfButton from 'components/HfButton.vue';
    import { mapGetters, mapActions } from 'vuex';

    export default {
        name: "Alert",
        components: {
            'hf-button': HfButton
        },
        computed: {
                ...mapGetters({
                    alert: 'getAlert'
                })
        },
        methods: {
        ...mapActions({
                hideAlert: 'hideAlert'
            }),
            confirm () {
                this.alert.onOk();
                this.hideAlert();
            },
            close () {
                this.alert.onCancel();
                this.hideAlert();
            }
        }
    }
</script>