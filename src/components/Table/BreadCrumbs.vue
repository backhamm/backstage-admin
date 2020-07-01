<template>
  <div class="bread-crumbs">
    <span v-for="(item, i) of breadList" :key="item.userId" class="span" @click="changeCurrentInfo(item, i)">/ {{item.name}} </span>
  </div>
</template>

<script>
  export default {
    name: 'BreadCrumbs',
    props: {
      breadList: {
        type: Array,
        default: null
      }
    },
    methods: {
      changeCurrentInfo(item, i) {
        const breadList = this.breadList.slice(0, i + 1)
        this.$emit('update:breadList', breadList)
        this.$emit('changeCurrentInfo', item)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .bread-crumbs {
    display: inline-block;
    margin-left: 10px;
    line-height: 30px;
    cursor: pointer;
    color: #E6A23C;

    .span {
      cursor: pointer;
    }
  }
</style>
