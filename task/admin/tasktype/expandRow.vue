<template>
   <Table :data='row' :columns='col'></Table>
</template>

<script>
export default {
    
    props:['row','col'],
    data(){
        return{}
    },
    mounted(){
        console.log(this.row)
    }

}
</script>
