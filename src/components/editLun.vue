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
            <h2>Edit Lun: {{ lunInfo.name }}</h2>
        </div>
        
        <Form :model="lunInfo" :label-width="150">
            <FormItem label="Select Lun type">
                <Row>
                    <Col span="20">
                        <Select v-model="lunInfo.type" disabled>
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
                        <Button type="ghost" @click="deleteLun">Delete</Button>
                    </Col>
                    <Col span="12">
                        <Button type="primary" @click="updateLun">Update</Button>
                    </Col>
                </Row>
            </FormItem>
        </Form>
    </div>
</template>
<script>
export default {
    props: {
        project: Object,
        index: Number
    },
    data(){
        return { 
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
    mounted: function(){
        let lun = this.project.luns[this.index];
        this.lunInfo.type = lun.type;
        this.lunInfo.name = lun.name;
        this.lunInfo.pool_name = lun.pool_name;
        let re = /(\d+)(GB|TB)/;
        let sizeArray = re.exec(lun.size);
        this.lunInfo.size = Number(sizeArray[1]);
        this.lunInfo.unit = sizeArray[2];
        this.lunInfo.ilc = lun.ilc;
        this.lunInfo.thin_percentage = lun.thin_percentage;
        this.lunInfo.io_type = lun.io_type;
        if(this.lunInfo.ilc){
            this.ilcDisabled = false;
        }
        if(lun.type === 'group'){
            this.lunInfo.lg_number = lun.lg_number;
            this.lunInfo.per_lg_number = lun.per_lg_number;
        }else{
            this.lunInfo.lun_number = lun.lun_number;
        }

    },
    computed: {
        display: function(){
            return this.lunInfo.type === "group"
        }
    },
    methods: {
        updateLun: function(){
            var lun = { 
                    ax_id: this.project.luns[this.index].ax_id,
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
            this.$bus.emit('update', ob);
        },
        deleteLun:function(){
            this.$bus.emit('delete','luns', this.index);
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
    }
}
</script>

