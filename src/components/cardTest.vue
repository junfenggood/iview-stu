<style>

</style>

<template>
  <div style="background:#eee;padding: 20px">
        <Card :bordered="false">
            <p slot="title">No border title</p>
             <a href="#" slot="extra" @click.prevent="changeLimit">
                <Icon type="close"></Icon>
            </a>
            
        </Card>
    </div>
</template>
