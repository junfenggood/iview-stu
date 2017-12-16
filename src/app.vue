<style scoped>
    @import 'styles/common.css';
</style>
<template>
    <div>
        <Button type="primary" @click="modal1 = true">Primary</Button>
        <Modal v-model="modal1"
               title="Create Pool"
               @on-ok="ok"
               @on-cancel="cancel"
               ok-text="Create"
               cancel-text="Cancel">
               <createpoolcomponent ref="createpool"></createpoolcomponent>
        </Modal>
    </div>
</template>
<script>
import poolcomponent from './components/createPool.vue'
    export default {
        data () {
            return {
                modal1: false
            }
        },
        mounted () {

        },
        beforeDestroy () {

        },
        methods: {
            ok: function(){
                var pool = this.$refs.createpool.handleSubmit();
                        console.log(pool);
            },
            cancel: function(){
                this.$Message.info("YOU click cancel")
            }
            
            
        },
        components: {
            createpoolcomponent: poolcomponent
        }
    }
</script>
