<style scoped>
.tableset{
    padding: 20px;
}
.forbutton{
    text-align: center;
}
</style>
<template>
<div>
    <div class="tableset">
        <Table stripe :columns="columns1" :data="data1"></Table>
    </div>
    <div class="forbutton">
        <Button type="primary" shape="circle" icon="paper-airplane">Submit</Button>
    </div>
</div>
</template>
<script>
export default {
  props: ['project'],
  data (){
      return {
          columns1: [
              {
                  title: 'Type',
                  key: 'name'
              },
              {
                  title: 'Number',
                  key: 'number'
              }
          ],
          data1: [
          ]
      }
  },
  mounted (){
      for(let key in this.project){
          this.data1.push({
              name: key,
              number: this.project[key].length
          })
      }
  }
}
</script>

