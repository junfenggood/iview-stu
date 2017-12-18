<template>
  <div id="create-pool">
      <Form :model="nasInfo" :label-width="100">
            <FormItem label="Pool name">
                <Row>
                    <Col span="20">
                        <Input v-model="nasInfo.name" placeholder="Enter something..."></Input>
                    </Col>
                </Row>
            </FormItem>

            <FormItem label="Select Pool">
                <Row>
                    <Col span="20">
                        <Select v-model="nasInfo.pool_name" placeholder="Please select pool">
                            <Option v-for="(pool, key) in project.pools" :value="pool.name" :key="key" >{{ pool.name }}</Option>
                        </Select>
                    </Col>
                </Row>
            </FormItem>
        </Form>
    </div>
</template>

<<script>
export default {
  props: ['project'],
  data (){
        return { 
              nasInfo: {
                    name: 'nas_0',
                    pool_name: ''
              }
      }
  },
  methods: {
      handleSubmit: function(){
          var nas = { 
              name: this.nasInfo.name,
              pool_name: this.nasInfo.pool_name
            };
          return nas
      }
    }
}
</script>

