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
            <h2>Block Test</h2>
        </div>
        
        <Form :model="lunInfo" :label-width="150">
            <FormItem label="Select Lun type">
                <Row>
                    <Col span="20">
                        <Select v-model="lunInfo.type">
                            <Option value="standalone">Standalone</Option>
                            <Option value="group">Group</Option>
                        </Select>
                    </Col>
                </Row>
            </FormItem>
            <FormItem label="Select Pool">
                <Row>
                    <Col span="20">
                        <Select v-model="lunInfo.pool_name" placeholder="Please select pool">
                            <Option v-for="(pool, key) in project.pools" :value="pool.name" :key="key" >{{ pool.name }}</Option>
                        </Select>
                    </Col>
                    <Col span="4">
                        <a href="#" @click="modal1 = true">
                            <Icon type="plus-circled" size="30"></Icon>
                        </a>
                    </Col>
                </Row>
            </FormItem>
            
            <FormItem label="Lun Prefix name">
                <Row>
                    <Col span="20">
                        <Input v-model="lunInfo.name" placeholder="Enter something..."></Input>
                    </Col>
                </Row>
            </FormItem>
            <FormItem label="Lun number" v-show="!display">
                <Row>
                    <Col span="20">
                        <Slider v-model="lunInfo.lun_number" show-input :max="500"></Slider>
                    </Col>
                </Row>
            </FormItem>
            <FormItem label="Group number" v-show="display">
                <Row>
                    <Col span="20">
                        <Slider v-model="lunInfo.lg_number" show-input :max="80" ></Slider>
                    </Col>
                </Row>
            </FormItem>
            <FormItem label="Lun number Per Group" v-show="display">
                <Row>
                    <Col span="20">
                        <Slider v-model="lunInfo.per_lg_number" :max="75" show-input ></Slider>
                    </Col>
                </Row>
            </FormItem>
            <FormItem label="Lun Size">
                <Row>
                    <Col span="20">
                        <Slider v-model="lunInfo.size" show-input :max="unit_limit" ></Slider>
                    </Col>
                    <Col span="4">
                        <Select v-model="lunInfo.unit" style="width: 55px; margin-left: 8px" @on-change="changeMax">
                            <Option value="GB">GB</Option>
                            <Option value="TB">TB</Option>
                        </Select>
                    </Col>
                </Row>
            </FormItem>
            <FormItem label="Enable ILC">
                <Switch v-model="lunInfo.ilc" size="large" @on-change="switchIlc">
                    <span slot="open">On</span>
                    <span slot="close">Off</span>
                </Switch>
            </FormItem>
            <FormItem label="Thin Percentage">
                <Row>
                    <Col span="20">
                        <Slider v-model="lunInfo.thin_percentage" :max="100" show-input :disabled="ilcDisabled"></Slider>
                    </Col>
                    <Col span="4">
                        <span style="font-size:20px">%</span>
                    </Col>
                </Row>
            </FormItem>
            <FormItem label="Select IO type">
                <Row>
                    <Col span="20">
                        <RadioGroup v-model="lunInfo.io_type">
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
                        <Button type="primary" @click="saveLun">Submit</Button>
                    </Col>
                </Row>
            </FormItem>
        </Form>
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
import poolcomponent from './createPool.vue';
export default {
    props: ['project'],
    data(){
        return { 
            modal1: false,
            lunInfo: {
                type: 'standalone',
                name: 'Lun',
                lun_number: 0,
                lg_number: 0,
                per_lg_number: 0,
                pool_name: '',
                io_type: 'ilpd',
                ilc: false,
                size: 0,
                unit:'GB',
                thin_percentage: 0
                },
            unit_limit:1024,
            ilcDisabled: true
            }
            
    },
    computed: {
        display: function(){
            return this.lunInfo.type === "group"
        }
    },
    methods: {
        ok: function(){
                var pool = this.$refs.createpool.handleSubmit();
                var ob = {
                    type: 'pools',
                    info: pool
                }
                this.$bus.emit('add', ob);
        },
        cancel: function(){
                this.$Message.info("YOU click cancel")
        },
        saveLun: function(){
            var lun = { 
                    name: this.lunInfo.name,
                    type: this.lunInfo.type,
                    pool_name: this.lunInfo.pool_name,
                    io_type: this.lunInfo.io_type,
                    size: this.lunInfo.size + this.lunInfo.unit,
                    ilc: this.lunInfo.ilc,
                    thin_percentage: this.lunInfo.ilc ? this.lunInfo.thin_percentage : 0
                };
            if(this.lunInfo.type === 'group'){
                lun.lg_number = this.lunInfo.lg_number;
                lun.per_lg_number = this.lunInfo.per_lg_number
            }else{
                lun.lun_number = this.lunInfo.lun_number;
            }

            var ob = {
                    type: 'luns',
                    info: lun
                }
            this.$bus.emit('add', ob);
        },
        changeMax: function () {
            if(this.lunInfo.unit === 'GB'){
                this.unit_limit = 1024
            }else if(this.lunInfo.unit === 'TB'){
                this.unit_limit = 256
                if(this.lunInfo.size > 256){
                    this.lunInfo.size = 256
                }
            }
        },
        switchIlc: function () {
            if(this.lunInfo.ilc){
                this.ilcDisabled = false
            }else{
                this.ilcDisabled = true
            }
        }
    },
    components: {
            createpoolcomponent: poolcomponent
    }
}
</script>

