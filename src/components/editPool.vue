<style scoped>
    .editPool{
        padding: 20px;
    }
    .headcust{
        text-align: center;
        padding: 20px;
    }
    .buttonDiv{
        margin-top: 20px;
    }
</style>

<template>
  <div class="editPool">
      <div class="headcust">
        <h2> Edit {{ poolInfo.name }}</h2>
      </div>
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
            <Row>
                <Col span="20" offset="1">
                    <ul>
                        <li :is="item.component" 
                            v-for="(item,key) in items" 
                            :tierdesc="item" 
                            @controlCard="handleCard"
                            :ref="item.tierType"
                            :key="key">
                        </li>
                    </ul>
                </Col>
            </Row>
            <FormItem>
                <div class="buttonDiv">
                    <Row>
                        <Col span="12">
                            <Button type="ghost" @click="deletePool">Delete</Button>
                        </Col>
                        <Col span="12">
                            <Button type="primary" @click="savePool">Update</Button>
                        </Col>
                    </Row>
                </div>
            </FormItem>
        </Form>
    </div>
</template>

<<script>
import cardTier from './editTierCard.vue';

export default {
  props: {
      project: Object,
      index: Number
  },
  data (){
        return { 
              poolInfo: {
                  name: '',
                  tier: ''
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
  mounted: function () {
      let pool = this.project.pools[this.index];
      this.poolInfo.name = pool.name;
      this.poolInfo.tier = pool.tiers[0].tierType;

      for(let tier of pool.tiers){
          this.items.push({
            component: 'cardComponent',
            tierType: tier.tierType,
            diskCount: tier.diskCount,
            raid: tier.raid
        })
      }
  },
  methods: {
      addTier: function () {
            var _this = this
            var tempItems = this.items.filter(function(item){
                return _this.poolInfo.tier === item.tierType;
            });
            if(tempItems.length === 0){
                this.items.push({
                component: 'cardComponent',
                tierType: this.poolInfo.tier
                })
            }
      },
      handleCard: function(name){
          this.items = this.items.filter(function(item){
              return item.tierType!== name
          });
          
      },
      savePool: function(){
          var pool = { 
              name: this.poolInfo.name,
              ax_id: this.project.pools[this.index].ax_id
          };
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
          var ob = {
              type: 'pools',
              info: pool
          }
          this.$bus.emit("update", ob, this.index)
      },
      deletePool: function () {
          this.$bus.emit('delete', 'pools', this.index);
      }
    }
}
</script>

