<template>
  <div id="create-pool">
      <Form :model="poolInfo" :label-width="100">
            <FormItem label="Pool name">
                <Row>
                    <Col span="20">
                        <Input v-model="poolInfo.name" placeholder="Enter something..."></Input>
                    </Col>
                </Row>
            </FormItem>

            <FormItem label="Tier type">
                <Row>
                    <Col span="20">
                        <Select v-model="poolInfo.tier">
                            <Option v-for="(tier,key) in tierType" :value="tier" :key="key">{{ tier }}</Option>
                        </Select>
                    </Col>
                    <Col span="4">
                        <a @click="addTier"><Icon type="plus-circled" size="30" ></Icon></a>
                    </Col>
                </Row>
            </FormItem>
            <ul>
                <li :is="item.component" 
                    v-for="(item,key) in items" 
                    :tiername="item.tiername" 
                    @controlCard="handleCard"
                    :ref="item.tiername"
                    :key="key">
                </li>
            </ul>
        </Form>
    </div>
</template>

<<script>
import cardTier from './tierCard.vue';

export default {
  data (){
        return { 
              poolInfo: {
                    name: 'pool_0',
                    tier: 'EXTREME'
              },
              tierType:[
                    'EXTREME',
                    'PERF',
                    'CAPACITY'
              ],
              items: []
      }
  },
  components: {
    'cardComponent':cardTier
  },
  methods: {
      addTier: function () {
            var _this = this
            var tempItems = this.items.filter(function(item){
                return _this.poolInfo.tier === item.tiername;
            });
            if(tempItems.length === 0){
                this.items.push({
                component: 'cardComponent',
                tiername: this.poolInfo.tier
                })
            }
      },
      handleCard: function(name){
          this.items = this.items.filter(function(item){
              return item.tiername !== name
          });
          
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

