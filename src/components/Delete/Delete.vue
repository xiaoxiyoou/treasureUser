<template>
  <!-- 删除弹框 -->
  <div class="deleteWrapper" v-if="deleteWrapper">
    <div class="mask" @click="deleteWrapperShow(false)"></div>
    <div class="item">
      <div class="deleteCon col a-c">
        <div class="tip">{{tip}}</div>
        <div class="confirm col a-c j-c" @click="delcard">确认删除</div>
        <img class="close" src="./closeTwo.png" alt="" @click="deleteWrapperShow(false)">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Delete",
  props: {
    deleteWrapper: Boolean,
    tip:String
  },
  methods: {
    delcard() {
      this.$emit("delcard");
    },
    deleteWrapperShow(flag) {
      this.$emit("deleteWrapperShow", flag);
    },
  }
};
</script>

<style scoped>
.mask {
  width: 100%;
  height: 100%;
  background-color: #000;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  opacity: 0.5;
  bottom: 0;
}
.deleteWrapper > .item {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1001;
  background-color: #ffffff;
  width: 648px;
  border-radius: 10px;
}
.deleteCon {
  position: relative;
}
.deleteCon > .tip {
  margin-top: 160px;
  color: #5aa967;
  font-size: 32px;
}
.deleteCon > .confirm {
  margin-top: 116px;
  margin-bottom: 29px;
  width: 600px;
  height: 91px;
  background-color: #5aa967;
  color: #ffffff;
  font-size: 36px;
  border-radius: 10px;
}
.close {
  position: absolute;
  right: 24px;
  top: 16px;
  width: 40px;
  height: 40px;
}
</style>
