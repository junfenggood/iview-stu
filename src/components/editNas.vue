<style scoped>
    .editPool{
        padding: 20px;
    }
    .headcust{
        text-align: center;
        padding: 20px;
        background-color: #f8f8f9;
    }
</style>
<template>
  <div class=".editPool">
      <div class="headcust">
          <h2> NAS SERVER {{ }}</h2>
      </div>
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

            <FormItem>
                <Row>
                    <Col span="12">
                        <Button type="ghost" @click="deleteNas">Delete</Button>
                    </Col>
                    <Col span="12">
                        <Button type="primary" @click="saveNas">Update</Button>
                    </Col>
                </Row>
            </FormItem>
        </Form>
    </div>
</template>

<<script>
export default {
  props: {
      project: Object,
      index: Number
  },
  data (){
        return { 
              nasInfo: {
                  name: '',
                  pool_name: ''
              }
      }
  },
  mounted: function () {
      let nas = this.project.nases[this.index];
      this.nasInfo.name = nas.name;
      this.nasInfo.pool_name = nas.pool_name;
  },
  methods: {
      saveNas: function () {
          let nas = {
              name: this.nasInfo.name,
              pool_name: this.nasInfo.pool_name
          };
          let ob = {
              type: 'nases',
              info: nas
          };
          this.$bus.emit("update", ob);
      },
      deleteNas: function () {
          this.$bus.emit("delete", "nases", this.index)
      }
    }
}
</script>