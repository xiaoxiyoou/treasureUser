<template>
  <div class="container">
    <div class="con col a-c">
      <div class="top row">
        <div class="tabDouble row j-c a-c" :class="idx==index?'hover':''" @click="son(item,idx)" v-for="(item,idx) in menu" :key="idx">{{item}}</div>
      </div>
      <div class="peopleMsg">
        <div class="item  row j-b a-c">
          <div class="text">逝者姓名</div>
          <input type="text" name="name" placeholder="请输入姓名" v-model="firstName" />
        </div>
        <div class="item  row j-b a-c" @click="showStartime(1)">
          <div class="text">逝者生日</div>
          <input type="text" name="birthday" id="birth" readonly="readonly" placeholder="请选择日期" :value="firstBirthday | moment" />
        </div>
        <div class="item  row j-b a-c" @click="showStartime(2)">
          <div class="text">离世时间</div>
          <input type="text" name="deathdate" id="death" readonly="readonly" placeholder="请选择日期" :value="firstDeathdate | moment" />
        </div>

      </div>
      <!-- 机构 -->
      <div class="peopleMsg" v-if="mechan">
        <div class="item  row j-b a-c">
          <div class="text">逝者姓名</div>
          <input type="text" name="name" placeholder="请输入姓名" v-model="secondName" />
        </div>
        <div class="item  row j-b a-c" @click="showStartime(3)">
          <div class="text">逝者生日</div>
          <input type="text" name="birthday" id="birth" readonly="readonly" placeholder="请选择日期" :value="secondBirthday | moment" />
        </div>
        <div class="item  row j-b a-c" @click="showStartime(4)">
          <div class="text">离世时间</div>
          <input type="text" name="deathdate" id="death" readonly="readonly" placeholder="请选择日期" :value="secondDeathdate | moment" />
        </div>

      </div>
      <div class="bar"></div>

      <div class="btmCon col j-c a-c" >
        <div class="btm row j-c a-c" @click="toPerson">创建纪念堂</div>
        <div class="btm row j-c a-c" @click="myRecall">我的纪念堂</div>
      </div>
      <!-- <div class="btmCon row j-c a-c" v-if="mechan"  @click="toMechan">
        <div class="btm row j-c a-c">确认提交</div>
      </div> -->
    </div>
    <van-popup v-model="datetime" position="bottom" :columns-placeholder="['请选择', '请选择', '请选择']" :style="{ height: '40%' }">
      <van-datetime-picker v-if="datetime" v-model="currentDate" type="date" :min-date="minDate" :max-date="maxDate" @confirm="confirm" @cancel="cancel" />
    </van-popup>
  </div>
</template>
<script type="text/ecmascript-6">
import { add } from 'api/index'
import { Toast } from 'vant';
export default {
  data() {
    return {
      datetime: false,
      minDate: new Date(1790, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date("1970/6/6"),
      menu: ['单人', '双人'],
      index: 0,
      mechan: false,
      person: true,
      firstName: '',
      firstBirthday: '',
      firstDeathdate: '',
      secondName: '',
      secondBirthday: '',
      secondDeathdate: '',
      cardtype: 1,
      flag: ''

    }
  },
  mounted() {



  },
  methods: {

    confirm(value) {
      this.datetime = false
      if (this.flag == 1) {
        this.firstBirthday = value
      } else if (this.flag == 2) {
        this.firstDeathdate = value
      } else if (this.flag == 3) {
        this.secondBirthday = value
      } else if (this.flag == 4) {
        this.secondDeathdate = value
      }
    },
    cancel() {
      this.datetime = false

    },
    showStartime(flag) {
      this.flag = flag
      console.log(flag)
      if (flag == 2 || flag == 4) {
        this.currentDate = new Date("2000/6/6")
        console.log('22', flag)

      } else {
        this.currentDate = new Date("1970/6/6")
      }
      this.datetime = true

    },
    son(item, idx) {
      this.index = idx;
      console.log(idx)
      if (idx) {
        this.mechan = true
        this.cardtype = 2
      } else {
        this.mechan = false
        this.cardtype = 1

      }

    },
    toMechan() {
      this.$router.push({
        path: './mechan'
      })
    },
      myRecall() {
      this.$router.push({
        path: './myRecall'
      })
    },
    toPerson() {
      if (this.cardtype == 1) {
        this._addOne()
      } else {
        this._addTwo()
      }

    },

    _addOne() {
      if (this.firstName == '') {
        Toast("请输入逝者姓名")
        return false
      } else if (this.firstBirthday == '') {
        Toast("请输入逝者生日")
        return false
      } else if (this.firstDeathdate == '') {
        Toast("请输入离世时间")
        return false
      } else {
        add({
          cardtype: this.cardtype,
          firstName: this.firstName,
          firstDeathdate: this.firstDeathdate,
          firstBirthday: this.firstBirthday,
          sid: this.$route.query.sid

        }).then(res => {
          console.log('创建', res)
          if (res.code == 0) {
            let carid = res.data.carid
            this.$router.push({
              path: './completion',
              query: {
                carid: carid,
              }
            })

          } else {
            Toast('创建失败，请重试');

          }

        })
      }

    },
    _addTwo() {
      if (this.firstName == '') {
        console.log('执行')
        Toast("请输入逝者姓名")
        return false
      } else if (this.firstBirthday == '') {
        Toast("请输入逝者生日")
        return false
      } else if (this.firstDeathdate == '') {
        Toast("请输入离世时间")
        return false
      } else if (this.secondName == '') {
        Toast("请输入逝者姓名")
        return false
      } else if (this.secondBirthday == '') {
        Toast("请输入逝者生日")
        return false
      } else if (this.secondDeathdate == '') {
        Toast("请输入离世时间")
        return false
      } else {
        add({
          cardtype: this.cardtype,
          firstName: this.firstName,
          firstDeathdate: this.firstDeathdate,
          firstBirthday: this.firstBirthday,
          secondName: this.secondName,
          secondBirthday: this.secondBirthday,
          secondDeathdate: this.secondDeathdate,
          sid: 658
        }).then(res => {
          console.log('创建', res)
          if (res.code == 0) {
            let carid = res.data.carid
            this.$router.push({
              path: './completion',
              query: {
                carid: carid,
              }
            })
          } else {
            Toast('创建失败，请重试');

          }
        })
      }
    }


  },
  components: {

  }
}
</script>
<style  lang="scss" scoped >
.container {
  position: absolute;
  top: 0px;
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
}
.con {
  padding-bottom: 3rem;
}
.top {
  width: 400px;
  height: 61px;
  overflow: hidden;
  border-radius: 10px;
  border: 1px solid $color;
  background-color: #ffffff;
  margin-top: 36px;
  color: $color;
}

.tabDouble {
  font-size: 30px;
  width: 50%;
  height: 61px;
}
.hover {
  background-color: $color;
  color: #ffffff;
}
.peopleMsg {
  padding: 0 29px;
  background-color: #ffffff;
  width: 690px;
  margin-top: 0.28rem;
  border-radius: 0.1rem;
}
.deoble {
  display: none;
}
.peopleMsg > .item {
  height: 97px;

  border-bottom: 1px solid #f5f5f5;
  color: #000000;
  font-size: 31px;
}
input {
  text-align: right;
}
.headImgCon {
  height: 160px;
  color: #000000;
  font-size: 31px;
  position: relative;
}

.headImg {
  width: 122px;
  height: 122px;
  position: absolute;
  right: 0;
}
.btmMsg {
  background-color: #ffffff;
  height: 220px;
  border-radius: 0.1rem;
  font-size: 31px;
  color: #000000;
}
.btmMsg > .item {
  height: 0.96rem;
}
.btmMsg > .item > .btn {
  width: 1.82rem;
  height: 0.55rem;
  background-color: #6a6198;
  color: #ffffff;
  font-size: 0.24rem;
  border-radius: 0.26rem;
  white-space: nowrap;
}
textarea {
  width: 100%;
  height: 150px;
  color: #000000;
  font-size: 31px;
  padding: 0;
  border-bottom: 1px solid #f2f2f2;
}
.layui-upload-list {
  background-color: #ffffff;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
}
.imglist {
  position: relative;
  display: inline-block;
  margin-top: 0.2rem;
}
.imglist img {
  width: 3rem;
  height: 4rem;
}

.btmCon {
  width: 100%;
  position: fixed;
  bottom: 18px;
}
form {
  text-align: right;
}
.btm {
  width: 690px;
  height: 90px;
  background-color: $color;
  color: #ffffff;
  font-size: 35px;
  border-radius: 10px;
  margin-top: 10px;
}
.bar {
  height: 280px;
  width: 750px;
  background-color: #f5f5f5;
}
</style>