<style>

</style>

<template>
  <div style="background:#eee;padding: 20px">
        <Card :bordered="false">
            <p slot="title">{{ tiername }}</p>
             <a href="#" slot="extra" @click.prevent="destory">
                <Icon type="close"></Icon>
            </a>
            <Form :model="tierInfo" :label-width="100">
                <FormItem label="Disk Count">
                    <Slider v-model="tierInfo.diskCount" show-input :max='500'></Slider>
                </FormItem>
                <FormItem label="Raid">
                    <Select v-model="tierInfo.raid">
                        <Option v-for="(raid, key) in raids" :value="raid" :key="key">{{ raid }}</Option>
                    </Select>
                </FormItem>
            </Form>
        </Card>
    </div>
</template>

<script>
export default {
  data: function(){
        return{
            tierInfo:{
                diskCount: 0,
                raid: 'raid5'
            },
            raids:[
                'raid10',
                'raid01',
                'raid5',
                'raid6'
            ]      
        } 
  },
  props: ['tiername'],

  methods: {
      destory: function(){
          this.$emit('controlDestory', this.tiername)
      }
  }
}
</script>
