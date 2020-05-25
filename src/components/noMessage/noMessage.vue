<template>
  <div class="noinfoCon col a-c j-c" v-if="noinfoShow">
    <img class="noinfo" src="./../../assets/img/noInfo1.png" alt="" />
  </div>
</template>

<script>
export default {
  name: "noMessage",
  props: {
    noinfoShow: Boolean
  }
};
</script>

<style scoped>
.noinfo {
  width: 100%;
  height: auto;
}
.noinfoCon {
  color: #8a898a;
  /* position: absolute; */
}
</style>
