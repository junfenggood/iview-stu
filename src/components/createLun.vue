<style scoped>
</style>
<template>
    <div>
        <Form :modal="lunInfo" :label-width="150">
            <FormItem label="Type">
                <Row>
                    <Col span="20">
                        <Select v-model="lunInfo.type">
                            <Option value="stanlone">Stanlone</Option>
                            <Option value="group">Group</Option>
                        </Select>
                    </Col>
                </Row>
            </FormItem>
            <FormItem label="Name">
                <Row>
                    <Col span="20">
                        <Input v-model="lunInfo.name"></Input>
                    </Col>
                </Row>
            </FormItem>
            <FormItem label="Select Pool">
                <Row>
                    <Col span="20">
                        <Select v-model="lunInfo.pool_name" placeholder="Please select" >
                            <Option  v-for="(pool, key) in pools" :value="pool.name" :key="key">{{ pool.name }}</Option>
                        </Select>
                    </Col>
                    <Col span="4">
                        <a href="#" @click="modal1 = true"><Icon type="plus-circled" :size="30"></Icon></a>
                    </Col>
                </Row>
            </FormItem>
            <FormItem label="Lun Number" v-if="!showGroup">
                <Row>
                    <Col span="20">
                         <Slider v-model="lunInfo.lun_number" :max="500" show-input></Slider>
                    </Col>
                </Row>
            </FormItem>
            <FormItem label="Group Number" v-if="showGroup">
                <Row>
                    <Col span="20">
                        <Slider v-model="lunInfo.lg_number" :max="80" show-input></Slider>
                    </Col>
                </Row>
            </FormItem>
            <FormItem label="Lun Number per Group" v-if="showGroup">
                <Row>
                    <Col span="20">
                        <Slider v-model="lunInfo.per_lg_number" :max="75" show-input></Slider>
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
import poolcomponent from './createPool.vue'
    export default {
        props:['pools'],
        data () {
            return {
                modal1: false,
                lunInfo: {
                    name: "lun",
                    type: 'stanlone',
                    pool_name: '',
                    lun_number: 0,
                    lg_number: 0,
                    per_lg_number: 0,
                    io_type: 'ilpd'
                }
            }
        },
        mounted () {

        },
        beforeDestroy () {

        },
        computed: {
            showGroup: function(){
                return this.lunInfo.type === 'group'
            }
        },
        methods: {
            ok: function(){
                var pool = this.$refs.createpool.handleSubmit();
                this.$bus.emit('addpool', pool);
            },
            cancel: function(){
                this.$Message.info("YOU click cancel")
            },
            saveLun: function(){
                var lun = { 
                        name: this.lunInfo.name,
                        type: this.lunInfo.type,
                        pool_name: this.lunInfo.pool_name,
                        io_type: this.lunInfo.io_type
                    };
                if(this.lunInfo.type === 'group'){
                    lun.lg_number = this.lunInfo.lg_number;
                    lun.per_lg_number = this.lunInfo.per_lg_number
                }else{
                    lun.lun_number = this.lunInfo.lun_number;
                }
                
                this.$bus.emit('addlun', lun);
            }
            
        },
        components: {
            createpoolcomponent: poolcomponent
        }
    }
</script>
