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
            <h2>Edit Filesystem {{ fileInfo.name }}</h2>
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
                </Row>
            </FormItem>

            <FormItem label="Select NAS">
                <Row>
                    <Col span="20">
                        <Select v-model="fileInfo.nas_name" placeholder="Please select NAS">
                            <Option v-for="(nas, key) in project.nases" :value="nas.name" :key="key" >{{ nas.name }}</Option>
                        </Select>
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
                        <Button type="ghost" @click="deleteFilesystem">Delete</Button>
                    </Col>
                    <Col span="12">
                        <Button type="primary" @click="updateFilesystem">Update</Button>
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
    mounted: function(){
        let fs = this.project.filesystems[this.index];
        this.fileInfo.name = fs.name;
        this.fileInfo.pool_name = fs.pool_name;
        this.fileInfo.fs_number = fs.fs_number;
        this.fileInfo.nas_name = fs.nas_name;
        let re = /(\d+)(GB|TB)/;
        let sizeArray = re.exec(fs.size);
        this.fileInfo.size = Number(sizeArray[1]);
        this.fileInfo.unit = sizeArray[2];
        if(fs.ilc){
            this.ilcDisabled = false;
        }
        this.fileInfo.ilc = fs.ilc;
        this.fileInfo.thin_percentage = fs.thin_percentage;
        this.io_type = fs.io_type;
    },
    methods: {
        
        updateFilesystem: function(){
            var fs = { 
                    ax_id: this.project.filesystems[this.index].ax_id,
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
                    info: fs
            }
            this.$bus.emit('update', ob);
        },
        deleteFilesystem: function(){
            this.$bus.emit('delete', 'filesystems', this.index);
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
    }
}
</script>

