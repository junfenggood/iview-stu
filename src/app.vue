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
                    Item1
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
        <Menu mode="horizontal" active-name="block" @on-select="changeview">
            <div class="layout-assistant">
                <MenuItem name="block">Block Test</MenuItem>
                <MenuItem name="file">File Test</MenuItem>
                <MenuItem name="total">Summary</MenuItem>
            </div>
        </Menu>
        <div class="layout-content">
            <Row>
                <Col span="5">
                    <Menu active-name="pool" width="auto" :open-names="['pool']" @on-select="changeSubItem">
                        <Submenu name="pool">
                            <template slot="title">
                                <Icon type="ios-keypad"></Icon>
                                Pool
                            </template>
                            <MenuItem v-for="(pool,key) in project.pools" :name="'pool-' + key" :key="key">{{ pool.name }}</MenuItem>
                        </Submenu>
                        <Submenu name="nas">
                            <template slot="title">
                                <Icon type="ios-keypad"></Icon>
                                NAS Server
                            </template>
                            <MenuItem v-for="(nas,key) in project.nases" :name="'nas-' + key" :key="key">{{ nas.name }}</MenuItem>
                        </Submenu>
                        <Submenu name="lun">
                            <template slot="title">
                                <Icon type="ios-keypad"></Icon>
                                Lun
                            </template>
                            <MenuItem v-for="(lun, key) in project.luns" :name="'lun-'+ key" :key="key">{{ lun.name }}</MenuItem>
                        </Submenu>
                        <Submenu name="fs">
                            <template slot="title">
                                <Icon type="ios-keypad"></Icon>
                                Filesystem
                            </template>
                            <MenuItem v-for="(fs, key) in project.filesystems" :name="'fs-'+ key" :key="key">{{ fs.name }}</MenuItem>
                        </Submenu>
                    </Menu>
                </Col>
                <Col span="19">
                    <div class="layout-content-main">
                       <component :is="currentView" :project="project" :index="index"></component> 
                    </div>
                </Col>
            </Row>
        </div>
        <div class="layout-copy">
            2011-2016
        </div>
    </div>
</template>
<script>
import blockcomponent from './components/blockTest.vue';
import filecomponent from './components/fileTest.vue';
import summarycomponent from './components/summary.vue';
import editpoolcomponent from './components/editPool.vue';
import editnascomponent from './components/editNas.vue';
import editluncomponent from './components/editLun.vue';
import editfscomponent from './components/editFilesystem.vue';
export default {
    data(){
        return { 
            project: {
                pools:[],
                nases: [],
                luns:[],
                filesystems: []
            },
            currentView:'block',
            index: 0,
            ax_id: 10000
        }
    },
    created: function(){
        this.$bus.on('add', this.add);
        this.$bus.on('update', this.update);
        this.$bus.on('delete', this.delete);
    },
    beforeDestroy: function(){
        this.$bus.off('add', this.add);
        this.$bus.off('update', this.update);
        this.$bus.off('delete', this.delete);
    },
    components:{
        'block':blockcomponent,
        'file': filecomponent,
        'total': summarycomponent,
        'pool': editpoolcomponent,
        'nas': editnascomponent,
        'lun':editluncomponent,
        'fs': editfscomponent
        },
    
    methods:{
        add: function(ob){
            ob.info.ax_id = this.ax_id++;
            this.project[ob.type].push(ob.info)
            console.log(JSON.stringify(this.project[ob.type]));
        },
        update: function(ob, index){
            this.project[ob.type].splice(index, 1, ob.info);
            this.currentView = 'total';
            console.log(JSON.stringify(this.project[ob.type]));
        },
        delete: function (type, index) {
            this.project[type].splice(index, 1);
        },
        changeview: function(e){
            this.currentView = e;
        },
        changeSubItem: function(e){
            let sideItem = e.split('-');
            this.index = Number(sideItem[1]);
            this.currentView = sideItem[0];
            
        }
    }
}
</script>
