<style>

</style>

<template>
  <div id="create-pool">
      <Form :model="poolInfo" :label-width="150">
          <FormItem label="Name">
              <Row>
                  <Col span="20">
                    <Input v-model="poolInfo.name" placeholder="Enter something"></Input>
                  </Col>
              </Row>
          </FormItem>
          <FormItem label="TierType">
              <Row>
                  <Col span="20">
                    <Select v-model="poolInfo.tier">
                        <Option v-for="(item,key) in tiers" :value="item" :key="key">{{ item }}</Option>
                    </Select>
                  </Col>
                  <Col span="4">
                    <a @click="addTier"><Icon type="plus-circled" size="30"></Icon></a>
                  </Col>
              </Row>
          </FormItem>
          <ul>
              <li 
                :is="item.component" 
                v-for="(item, key) in items"
                :tiername="item.tiername"
                @controlDestory="handleDestory"
                :ref="item.tiername"
                :key="key"
                ></li>
          </ul>
          <!-- <FormItem>
            <Button type="primary" @click="handleSubmit">Submit</Button>
            
        </FormItem> -->
      </Form> 
    </div>

</template>

<script>
import card from './cardCreate.vue'
export default {
    name: "create-pool",
    data: function(){
        return {
            poolInfo: {
                name: 'pool_0',
                tier: 'EXTREM'
            },
            items: [],
            tiers: [
                'EXTREM',
                'PERFORMANCE',
                'CAPOCITY'
            ]
        }
    },
    components: {
        'cardComponet':card
    },
    methods: {
        addTier: function(){
            var _this = this
            var tempItems = this.items.filter(function(item){
                return _this.poolInfo.tier === item.tiername;
            });
            if(tempItems.length === 0){
                this.items.push({
                component: 'cardComponet',
                tiername: this.poolInfo.tier
                })
            }
        },
        handleDestory: function(tiername){
            this.items = this.items.filter(function(item){
                return item.tiername !== tiername
            })
        },
        handleSubmit: function(){
            var pool = { name: this.poolInfo.name };
            var tiers = [];
            for( let item of this.items ){
                if(this.$refs[item.tiername]){
                    let tierinfo = this.$refs[item.tiername][0].tierInfo;
                    tiers.push({
                        tierType: item.tiername,
                        diskCount: tierinfo.diskCount,
                        raid: tierinfo.raid
                    })
                }
            }
            pool.tier = tiers;
            
            return pool
        }
        
    }
}
</script>
