<template>
  <div id="tier-card" style="background:#eee; padding:10px">
      <Card :bordered="false">
          <p slot="title">{{ tiername }}</p>
          <a 
            href="#" 
            slot="extra" 
            @click.prevent="destoryCard">
            <Icon type="close"></Icon>
          </a>
          <Form :model="tierInfo" :label-width="75">
            <FormItem label="Raid">
              <Select v-model="tierInfo.raid" placeholder="Enter something...">
                <Option v-for="(raid, key) in raids" :value="raid" :key="key">{{ raid }}</Option>
              </Select>
            </FormItem>
            <FormItem label="Disk Count">
              <Slider v-model="tierInfo.diskCount" show-input :max="1000"></Slider>
            </FormItem>
          </Form>
      </Card>
  </div>
</template>
<script>
export default {
  data(){
      return {
          tierInfo:{
              raid:'raid5(4+1)',
              diskCount: 0
          },
          raids: [
            'raid5(4+1)', 'raid5(8+1)', 'raid5(12+1)', 'raid6(4+2)', 
            'raid6(6+2)', 'raid6(8+2)', 'raid6(10+2)', 'raid6(12+2)', 
            'raid6(14+2)', 'raid1/0(1+1)','raid1/0(2+2)', 'raid1/0(3+3)', 
            'raid1/0(4+4)'
            ]
      }
  },
  props: ['tiername'],
  methods:{
      destoryCard: function () {
          this.$emit('controlCard', this.tiername)
      }
  }
}
</script>

