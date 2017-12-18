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
        <Menu mode="horizontal" active-name="1" @on-select="changeview">
            <div class="layout-assistant">
                <MenuItem name="block">Block Test</MenuItem>
                <MenuItem name="file">File Test</MenuItem>
                <MenuItem name="total">Summary</MenuItem>
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
                            <MenuItem v-for="(pool,key) in project.pools" :name="'1-' + key" :key="key">{{ pool.name }}</MenuItem>
                        </Submenu>
                        <Submenu name="2">
                            <template slot="title">
                                <Icon type="ios-keypad"></Icon>
                                NAS Server
                            </template>
                            <MenuItem v-for="(nas, key) in project.nases" :name="'3-'+ key" :key="key">{{ nas.name }}</MenuItem>
                        </Submenu>
                        <Submenu name="3">
                            <template slot="title">
                                <Icon type="ios-keypad"></Icon>
                                Lun
                            </template>
                            <MenuItem v-for="(lun, key) in project.luns" :name="'3-'+ key" :key="key">{{ lun.name }}</MenuItem>
                        </Submenu>
                        <Submenu name="4">
                            <template slot="title">
                                <Icon type="ios-keypad"></Icon>
                                Filesystem
                            </template>
                            <MenuItem v-for="(fs, key) in project.filesystems" :name="'3-'+ key" :key="key">{{ fs.name }}</MenuItem>
                        </Submenu>

                    </Menu>
                </Col>
                <Col span="19">
                    <component :is="currentView" :project="project"></component>
                </Col>
            </Row>
        </div>
        <div class="layout-copy">
            2011-2016 &copy; TalkingData
        </div>
    </div>
</template>
<script>
import luncomponent from './components/blockTest.vue';
import filecomponent from './components/fileTest.vue';
import summarycomponent from './components/summary.vue';
export default {
    data () {
        return {
            project: {
                pools:[],
                nases: [],
                luns:[],
                filesystems: []
            },
            currentView:'block'   
        }
    },
    created: function(){
        this.$bus.on('addpool', this.addPool);
        this.$bus.on('addlun', this.addLun);
        this.$bus.on('addnas', this.addNas);
        this.$bus.on('addfilesystem', this.addFilesystem)
    },
    beforeDestroy: function(){
        this.$bus.off('addpool', this.addPool);
        this.$bus.off('addlun', this.addLun);
        this.$bus.off('addnas', this.addNas);
        this.$bus.off('addfilesystem', this.addFilesystem)
    },
    components: {
        'block': luncomponent,
        'file': filecomponent,
        'total': summarycomponent
    },
    methods:{
        addPool: function(pool){
            this.project.pools.push(pool);
            
            console.log(JSON.stringify(this.project.pools));
        },
        addLun: function(lun){
            this.project.luns.push(lun);
            console.log(JSON.stringify(this.project.luns));
        },
        addNas: function(nas){
            this.project.nases.push(nas);
            
            console.log(JSON.stringify(this.project.nases));
        },
        addFilesystem: function(fs){
            this.project.filesystems.push(fs);
            console.log(JSON.stringify(this.project.filesystems));
        },
        changeview: function(e){
            console.log(e);
            this.currentView = e;
        }
    }
}
</script>