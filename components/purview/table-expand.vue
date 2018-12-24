<template>
    <div class="symbin-purview-subtable">
        <Table :columns="subcolumns" :data="children"></Table>
    </div>    
</template>
<script>
    import './index.css';
    import sysbinVerification from '../lib/verification';
    import symbinUtil from '../lib/util';
    import Vue from 'vue';
    export default {
        props: {
            row: Object,
            children: Array,
            subcolumns:Array
        }
    };
</script>