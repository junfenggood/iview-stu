<style scoped>
.headcust{
    text-align: center;
    padding: 20px;
    background-color: #f8f8f9;
}
</style>
<template>
    <div id="blocktest">
        <div class="headcust">
            <h2>File Test</h2>
        </div>
        
        <Form :model="fileInfo" :label-width="150">
            <FormItem label="Filesystem Prefix name">
                <Row>
                    <Col span="20">
                        <Input v-model="fileInfo.name" placeholder="Enter something..."></Input>
                    </Col>
                </Row>
            </FormItem>

            <FormItem label="Select Pool">
                <Row>
                    <Col span="20">
                        <Select v-model="fileInfo.pool_name" placeholder="Please select pool">
                            <Option v-for="(pool, key) in project.pools" :value="pool.name" :key="key" >{{ pool.name }}</Option>
                        </Select>
                    </Col>
                    <Col span="4">
                        <a href="#" @click="modal_pool = true">
                            <Icon type="plus-circled" size="30"></Icon>
                        </a>
                    </Col>
                </Row>
            </FormItem>

            <FormItem label="Select NAS">
                <Row>
                    <Col span="20">
                        <Select v-model="fileInfo.nas_name" placeholder="Please select NAS">
                            <Option v-for="(nas, key) in project.nases" :value="nas.name" :key="key" >{{ nas.name }}</Option>
                        </Select>
                    </Col>
                    <Col span="4">
                        <a href="#" @click="modal_nas = true">
                            <Icon type="plus-circled" size="30"></Icon>
                        </a>
                    </Col>
                </Row>
            </FormItem>
            
            
            <FormItem label="Filesystem number" >
                <Row>
                    <Col span="20">
                        <Slider v-model="fileInfo.number" show-input :max="500"></Slider>
                    </Col>
                </Row>
            </FormItem>
            <FormItem label="Filesystem Size">
                <Row>
                    <Col span="20">
                        <Slider v-model="fileInfo.size" show-input :max="unit_limit" ></Slider>
                    </Col>
                    <Col span="4">
                        <Select v-model="fileInfo.unit" style="width: 55px; margin-left: 8px" @on-change="changeMax">
                            <Option value="GB">GB</Option>
                            <Option value="TB">TB</Option>
                        </Select>
                    </Col>
                </Row>
            </FormItem>
            <FormItem label="Enable ILC">
                <Switch v-model="fileInfo.ilc" size="large" @on-change="switchIlc">
                    <span slot="open">On</span>
                    <span slot="close">Off</span>
                </Switch>
            </FormItem>
            <FormItem label="Thin Percentage">
                <Row>
                    <Col span="20">
                        <Slider v-model="fileInfo.thin_percentage" :max="100" show-input :disabled="ilcDisabled"></Slider>
                    </Col>
                    <Col span="4">
                        <span style="font-size:20px">%</span>
                    </Col>
                </Row>
            </FormItem>
            <FormItem label="Select IO type">
                <Row>
                    <Col span="20">
                        <RadioGroup v-model="fileInfo.io_type">
                            <Radio label="ilpd">
                                <span>ILPD</span>
                            </Radio>
                            <Radio label="workload">
                                <span>WorkLoad</span>
                            </Radio>
                        </RadioGroup>
                    </Col>
                </Row>
            </FormItem>
            <FormItem>
                <Row>
                    <Col span="12">
                        <Button type="ghost" style="margin-left: 8px">Cancel</Button>
                    </Col>
                    <Col span="12">
                        <Button type="primary" @click="saveFileInfo">Submit</Button>
                    </Col>
                </Row>
            </FormItem>
        </Form>
        <Modal v-model="modal_pool"
               title="Create Pool"
               @on-ok="pool_ok"
               @on-cancel="pool_cancel"
               ok-text="Create"
               cancel-text="Cancel">
               <createpoolcomponent ref="createpool"></createpoolcomponent>
        </Modal>
        <Modal v-model="modal_nas"
               title="Create NAS Server"
               @on-ok="nas_ok"
               @on-cancel="nas_cancel"
               ok-text="Create"
               cancel-text="Cancel">
               <createnascomponent ref="createnas" :project="project"></createnascomponent>
        </Modal>
    </div>
</template>
<script>
import poolcomponent from './createPool.vue';
import nascomponent from './createNas.vue'
export default {
    props: ['project'],
    data(){
        return { 
            modal_pool: false,
            modal_nas: false,
            fileInfo: {
                name: 'fs',
                fs_number: 0,
                pool_name: '',
                io_type: 'ilpd',
                ilc: false,
                size: 0,
                unit:'GB',
                thin_percentage: 0,
                nas_name: ''
                },
            unit_limit:1024,
            ilcDisabled: true
            }
            
    },
    methods: {
        pool_ok: function(){
                var pool = this.$refs.createpool.handleSubmit();
                var ob = {
                    type: 'pools',
                    info: pool
                }
                this.$bus.emit('add', ob);
        },
        pool_cancel: function(){
                this.$Message.info("YOU click cancel")
        },
        nas_ok: function(){
                var nas = this.$refs.createnas.handleSubmit();
                var ob = {
                    type: 'nases',
                    info: nas
                }
                this.$bus.emit('add', ob);
        },
        nas_cancel: function(){
                this.$Message.info("YOU click cancel")
        },
        saveFileInfo: function(){
            var fs = { 
                    name: this.fileInfo.name,
                    pool_name: this.fileInfo.pool_name,
                    nas_name: this.fileInfo.nas_name,
                    fs_number: this.fileInfo.fs_number,
                    io_type: this.fileInfo.io_type,
                    size: this.fileInfo.size + this.fileInfo.unit,
                    ilc: this.fileInfo.ilc,
                    thin_percentage: this.fileInfo.ilc ? this.fileInfo.thin_percentage : 0
                };
            var ob = {
                    type: 'filesystems',
                    info: pool
            }
            this.$bus.emit('add', ob);
        },
        changeMax: function () {
            if(this.fileInfo.unit === 'GB'){
                this.unit_limit = 1024
            }else if(this.fileInfo.unit === 'TB'){
                this.unit_limit = 256
                if(this.fileInfo.size > 256){
                    this.fileInfo.size = 256
                }
            }
        },
        switchIlc: function () {
            if(this.fileInfo.ilc){
                this.ilcDisabled = false
            }else{
                this.ilcDisabled = true
            }
        }
    },
    components: {
            createpoolcomponent: poolcomponent,
            createnascomponent: nascomponent
    }
}
</script>

