<style scoped>
    @import 'styles/common.css';
</style>
<template>
    <div class="layout">
        <Menu mode="horizontal" theme="dark" active-name="1">
            <div class="layout-logo"></div>
            <div class="layout-nav">
                <MenuItem name="1">
                    <Icon type="ios-navigate"></Icon>
                    Item 1
                </MenuItem>
                <MenuItem name="2">
                    <Icon type="ios-keypad"></Icon>
                    Item 2
                </MenuItem>
                <MenuItem name="3">
                    <Icon type="ios-analytics"></Icon>
                    Item 3
                </MenuItem>
                <MenuItem name="4">
                    <Icon type="ios-paper"></Icon>
                    Item 4
                </MenuItem>
            </div>
        </Menu>
        <Menu mode="horizontal" active-name="1">
            <div class="layout-assistant">
                <MenuItem name="1">Block Test</MenuItem>
                <MenuItem name="2">File Test</MenuItem>
                <MenuItem name="3">Summary</MenuItem>
            </div>
        </Menu>
        <div class="layout-content">
            <Row>
                <Col span="5">
                    <Menu active-name="1-2" width="auto" :open-names="['1']">
                        <Submenu name="1">
                            <template slot="title">
                                <Icon type="ios-keypad"></Icon>
                                Pool
                            </template>
                            <MenuItem v-for="(pool,key) in pools" :name="'1-' + key" :key="key">{{ pool.name }}</MenuItem>
                        </Submenu>
                        <Submenu name="2">
                            <template slot="title">
                                <Icon type="ios-keypad"></Icon>
                                NAS Server
                            </template>
                            <MenuItem name="2-1">Option 1</MenuItem>
                            <MenuItem name="2-2">Option 2</MenuItem>
                        </Submenu>
                        <Submenu name="3">
                            <template slot="title">
                                <Icon type="ios-keypad"></Icon>
                                Lun
                            </template>
                            <MenuItem v-for="(lun, key) in luns" :name="'3-'+ key" :key="key">{{ lun.name }}</MenuItem>
                        </Submenu>
                        <Submenu name="4">
                            <template slot="title">
                                <Icon type="ios-keypad"></Icon>
                                Filesystem
                            </template>
                            <MenuItem name="4-1">Option 1</MenuItem>
                            <MenuItem name="4-2">Option 2</MenuItem>
                        </Submenu>

                    </Menu>
                </Col>
                <Col span="19">
                    <luncomponent :pools="pools"></luncomponent>
                </Col>
            </Row>
        </div>
        <div class="layout-copy">
            2011-2016 &copy; TalkingData
        </div>
    </div>
</template>
<script>
import luncomponent from './components/createLun.vue'
export default {
    data () {
        return {
            pools:[],
            nases: [],
            luns:[],
            filesystems: []
        }
    },
    created: function(){
        this.$bus.on('addpool', this.addPool);
        this.$bus.on('addlun', this.addLun)
    },
    beforeDestroy: function(){
        this.$bus.off('addpool', this.addPool);
        this.$bus.off('addlun', this.addLun)
    },
    components: {
        luncomponent: luncomponent
    },
    methods:{
        addPool: function(pool){
            this.pools.push(pool);
            
            console.log(JSON.stringify(this.pools));
        },
        addLun: function(lun){
            this.luns.push(lun);
            console.log(JSON.stringify(this.luns));
        }
    }
}
</script>