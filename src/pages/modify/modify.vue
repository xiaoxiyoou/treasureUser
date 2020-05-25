<template>
  <div class="container">
    <div class="con col a-c">
      <div class="top row">
        <div class="tabDouble row j-c a-c" :class="idx==index?'hover':''" @click="son(item,idx)" v-for="(item,idx) in menu" :key="idx">{{item}}</div>
      </div>
      <div class="peopleMsg">
        <div class="item row j-b a-c">
          <div class="text">逝者姓名</div>
          <input type="text" name="name" placeholder="请输入姓名" v-model="firstName" />
        </div>
        <div class="item row j-b a-c" @click="showStartime(1,firstBirthday)">
          <div class="text">逝者生日</div>
          <input type="text" name="birthday" id="birth" readonly="readonly" placeholder="请选择日期" :value="firstBirthday | moment" />
        </div>
        <div class="item row j-b a-c" @click="showStartime(2,firstDeathdate)">
          <div class="text">离世时间</div>
          <input type="text" name="deathdate" id="death" readonly="readonly" placeholder="请选择日期" :value="firstDeathdate | moment" />
        </div>
        <div class="item row j-b a-c" @click="selcetAge(1)">
          <div class="text">逝世年龄</div>
          <input type="text" name="age" readonly="readonly" placeholder="请输入年龄" v-model="firstAge" />
        </div>
        <div class="item row j-b a-c" @click="areaShowList(1)">
          <div class="text">出生地址</div>
          <input type="text" name="birthaddr" id="txt_area" readonly="readonly" placeholder="请选择地址" value="" v-model="firstBirthaddr" />

        </div>
        <div class="item row j-b a-c">
          <div class="text">安葬陵园</div>
          <input type="text" name="buryaddr" placeholder="请输入陵园名称" value="" v-model="firstBuryaddr" />
        </div>
        <div class="headImgCon  row j-b a-c">
          <div class="text">逝者遗相</div>
          <img class="headImg" id="ImageUp" :src='firstImgurl ? firstImgurl : require("./headUp.png")' alt="" @click="cropShow(true,1)" />
        </div>
      </div>

      <div class="peopleMsg" v-if="mechan">
        <div class="item row j-b a-c">
          <div class="text">逝者姓名</div>
          <input type="text" name="name" placeholder="请输入姓名" v-model="secondName" />
        </div>
        <div class="item row j-b a-c" @click="showStartime(3,secondBirthday)">
          <div class="text">逝者生日</div>
          <input type="text" name="birthday" id="birth" readonly="readonly" placeholder="请选择日期" :value="secondBirthday | moment" />
        </div>
        <div class="item row j-b a-c" @click="showStartime(4,secondDeathdate)">
          <div class="text">离世时间</div>
          <input type="text" name="deathdate" id="death" readonly="readonly" placeholder="请选择日期" :value="secondDeathdate | moment" />
        </div>
        <div class="item row j-b a-c" @click="selcetAge(2)">
          <div class="text">逝世年龄</div>
          <input type="text" name="age" readonly="readonly" placeholder="请输入年龄" v-model="secondAge" />
        </div>
        <div class="item row j-b a-c" @click="areaShowList(2)">
          <div class="text">出生地址</div>
          <input type="text" name="birthaddr" id="txt_area" readonly="readonly" placeholder="请选择地址" value="" v-model="secondBirthaddr" />

        </div>
        <div class="item row j-b a-c">
          <div class="text">安葬陵园</div>
          <input type="text" name="buryaddr" placeholder="请输入陵园名称" value="" v-model="secondBuryaddr" />
        </div>
        <div class="headImgCon  row j-b a-c">
          <div class="text">逝者遗相</div>
          <img class="headImg" id="ImageUp" :src='secondImgurl?secondImgurl: require("./headUp.png")' alt="" @click="cropShow(true,2)" />
        </div>
      </div>
      <div class="btmMsg">
        <div class="item row j-b a-c">
          <div class="text">逝者生平</div>
          <div class="btn row a-c j-c" @click="lifeSelect">选择生平模板</div>
        </div>
        <textarea name="life" v-model="life" @blur="getHeight"></textarea>
        <div class="item row j-b a-c">
          <div class="text">追思人姓名</div>
          <input name="fallname" type="text" placeholder="请输入追思人姓名" v-model="fallname" />
        </div>
        <div class="headImgCon  row j-b a-c">
          <div class="text">美好回忆</div>
          <img class="headImg" id="ImageUp" src="./headUp.png" alt="" @click="goodImg" />
        </div>
        <div class="lifeImg row f-w j-b">
          <div class="item" v-for="(item,index) in lifeImg" :key="index">
            <img class="delect" src="./delect.png" alt="" @click="delect(index)">
            <img class="" :src="item" alt="">
            <!-- <img class="" src="http://cdn.fuyulove.com/Upload/userimg/2020/4/20/04c78b8d960844848c4bea5505182ae8.jpg" alt=""> -->
          </div>
        </div>
        <div class="layui-upload-list alltu" id="lblimglist"></div>
      </div>
      <div class="btmCon row j-c a-c" @click="myRecall">
        <div class="btm row j-c a-c"  v-if="showBtn">提交</div>
      </div>
      <div class="bar"></div>
    </div>
    <van-popup v-model="datetime" position="bottom" :columns-placeholder="['请选择', '请选择', '请选择']" :style="{ height: '40%' }">
      <van-datetime-picker v-if="datetime" v-model="currentDate" type="date" :min-date="minDate" :max-date="maxDate" @confirm="confirm" @cancel="cancel" />
    </van-popup>
    <!-- 年龄选择 -->
    <van-popup v-model="showPicker" position="bottom">
      <van-picker show-toolbar :columns="columns" title="请选择年龄" :default-index="this.defaultAge - 1" @cancel="showPicker = false" @confirm="onConfirm" />
    </van-popup>
    <!-- 城市选择 -->
    <van-popup v-model="areaShow" position="bottom">
      <van-area :area-list="areaList" title="请选择出生地址" @confirm="adConfirm" @cancel="adcancel" />
    </van-popup>
    <!-- 头像上传 -->

    <upImg :showCrop="showCrop" :fixedNumber="fixedNumber" @cropShow="cropShow" @photoUp="photoUp" />
    <!-- 逝者生平 -->
    <van-popup v-model="lifeshow" position="bottom" :style="{ height: '80%' }" close-icon="close" closeable>
      <div class="lifeTpl">
        <div class="tplTitle">
          <span>生平模板选用</span>
        </div>
        <div class="tplList">
          <div class="tplItem" v-for="(item,index) in lifelist" :key="index">
            <div class="itemTitle">{{item.title}}</div>
            <div class="itemText">
              {{item.desn}}
            </div>
            <div class="selectedTpl" @click="tempSelect(index)">选用此模板</div>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script type="text/ecmascript-6">
import { view, edit } from 'api/index'
import { Toast } from 'vant';
import age from 'assets/js/age';
import area from 'assets/js/area';
var wx = require('weixin-js-sdk')
import upImg from 'components/upImg/upImg'
import axios from 'axios'
export default {
  data() {
    return {
      lifeshow: false,
      imglist: '',
      life: '',
      secondBirthaddr: '',
      areaselect: 1,
      fallname: '',
      secondBuryaddr: '',
      secondAge: '',
      selcteage: 1,
      selecetImgurl: 1,
      secondImgurl: '',
      firstImgurl: '',
      fixed: true,
      fixedNumber: [1, 1.17],
      fileName: '',

      showCrop: false,
      firstBuryaddr: '',
      value: '',
      areaShow: false,
      areaList: area,
      showPicker: false,
      columns: age.columns,
      datetime: false,
      minDate: new Date(1790, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date("1970/6/6"),
      menu: ['单人', '双人'],
      index: 0,
      mechan: false,
      person: true,
      list: [],
      firstName: '',
      secondName: '',
      firstBirthday: '',
      firstDeathdate: '',
      secondBirthday: '',
      secondDeathdate: '',
      firstBirthaddr: '',
      flag: '',
      cardtype: 1,
      firstAge: '',
      defaultAge: 1,
      lifeImg: [],
      lifelist: [],
      lifelistSingle: [
        {
          title: '妈妈',
          desn: "亲爱的妈妈，每当我在心里喊出这句话，总是忍不住红了眼眶。\n就像歌里唱的“世上只有妈妈好”，这是童年时光里必唱的歌谣，越长大才越明白妈妈。\n委屈的泪花，你来擦；下雨的泥泞，你来遮；爱吃的食物，你来做；沉重的书包，你来拿。你给了我生命，给了我一个温暖的家。\n我第一次离开家去上大学的时候，你哭红了眼睛，跟我千叮咛万嘱咐，每天你的电话从不迟到，你总说孩子，还好吗？从一开始认真回答你，到后来慢慢敷衍，甚至生气跟你说，我不是小孩子了，你总是在电话那头笑笑，包容着我。\n工作后，有一次发烧特别厉害，本想发给舍友让帮忙带退烧药，结果发到您的手机上，从南到北的距离，您花了三个小时出现在我的宿舍门口，拿着温热的粥和药，着急的眼神到现在我都一直记得。\n直到你离开我才知道，再没有人可以像你这样给我温暖的爱，也没有人可以这样时刻等候着我，只要我有需要，你一定会陪着我，相信我鼓励我，以我为骄傲，以我为世界。妈妈，我想你，每一天。\n借着你的爱，我长大了，成熟了，慢慢面对世界的风风雨雨，知道这不容易，但是我一定会努力，请你也相信我，为我加油。\n每一年的母亲节，我都会到街上买一束康乃馨，包扎得很漂亮，放在你遗照前，跟你说一声母亲节快乐，我知道你一定听得见。\n有一天，我们总会天上相见，再跟您诉说我的思念，我的爱。 "
        },
        {
          title: '爸爸',
          desn: "敬爱的爸爸，你好。\n还记得小时候，我总爱爬上你的肩头，那是我登过最高的地方，你不爱说话，看着我懂事会笑，我任性的时候巴掌会落下来。我对你又爱又怕。\n记忆里，你总是很忙，妈妈说你像拉牛的车，任劳任怨，勤勤恳恳，不能停下来，只能不停工作，你肩上有很多的压力，上有老下有小。那时候我不懂，后来才知道原本也是男孩的你需要承受多少生活的重担。\n总是习惯向你伸手，却忘记对你认真说声谢谢。每次离开的时候，妈妈哭红眼，你在一旁还要生气凶妈妈，好像很轻松，巴不得我离开一样。\n时光太快了，快得我都忘了怎么像小时候那样牵着你的手，撒娇。\n和你吵过太多次架了，我觉得你不爱我，心里有恨。记得中学时候有一个很喜欢的玩具，是自己亲手用木头一块块做起来的天桥建筑，花了很多时间，有时候功课都忘记做，你非常生气，一下子就把它砸得粉碎，无情地对待我，我当时哭闹了很久，后来和你隔阂越来越深了，面对你只有沉默。\n有一天，妈妈和我坐在院子里回忆，从箱子里拿出了一个玩具，很旧很破，充满了修补的痕迹，妈妈说，你后来非常后悔，也落泪了。\n我内心受到了很大的冲击，原来我并不了解我的爸爸。\n一生要强的你老了，直到你离开那刻我才意识到，原来无坚不摧的爸爸，也会有这样一天。我是你的骄傲吗，你还在为我而担心吗？\n遇到再多困难的时候，我都会想起你风淡云轻的笑，你总说，一切都会过去了的，什么都会好起来的。\n那么现在的你，好吗？"
        },
        {
          title: '爷爷',
          desn: "爷爷，你好吗？\n记得小时候，你总是喜欢陪着我。\n总跟在我后面，一个劲叫我名字，也喜欢牵着我的手走在乡间小路上去买好吃的，不管我喜欢吃什么，你都笑眯眯地掏钱买，回到家后，爸妈不让我吃，你总是板着脸对他们说，难得我疼我孙子，你们管得着嘛！霸气的样子想起来都觉得很温暖。\n你不会说故事，也不会唱歌，总是静静地笑着陪着我，我累了不想走路，你总是背着我走，不管前面路多远。\n暑假的时候，我总是回到您身边，房间的氛围很温暖，摆着我爱吃的东西，你会陪着我做功课，把电视调成静音，如今想起来很怀念。\n那时候你总说，不知道我什么时候长大，不知道能不能参加我的婚礼，抱上曾孙子，那时候的我总觉得一定可以实现的，可是没有想到这样简朴的愿望抵不过命运。\n工作以后，我越来越忙，很难得能回去看你一眼，有天听姑姑说你病了，总是喊着我的名字，我却来不及看你，那是我最深的遗憾。\n你对我那么好，我却只是喊你一声爷爷而已。\n我很想念你，我可爱的爷爷。\n现在的我长大了，有了自己的小家庭，像你说的要好好生活，要存积蓄，正在不断努力中。\n你最担心的孙子，一切都好，希望另一个世界的你也一样，好好的。"
        },

      ],
      lifelistDouble: [
        {
          title: '父母',
          desn: "亲爱的父亲XX，母亲XX：\n天堂的你们，好吗？ \n时间过得太快了，思念却好像静止了。如今，我还时常有恍惚，好像你们都还在我身边，陪着我，不管我遇到多大风雨，有多无助，只要一扭头，你们就会在我身后伸出双手接住我。\n从不放弃，总在那里，默默付出，不求回报，这样无私的感情，天地间，只有你们给予我。\n小时候，我总盼着快点长大，好像长大了就可以主宰世界，不用你们的庇护了，时间很快，我马不停蹄地离开你们，去了很远的城市生活，自由的空气让我非常惬意，慢慢忽视来自你们的关心，电话漏接不回，短信收到不回，仗着你们绝对不会对我生气的包容，有恃无恐。\n这样的傲慢让我看不见你们被岁月染白的鬓毛，看不见你们为我担心的日日夜夜，看不见你们期盼我常回家看看的愿望。 \n没有父母，就没有来时路。儿时看过的一句话，现在才明白。没有了你们，再没有庇护，没有了家，没有了故乡，我只能自己面对前路的艰辛，当我难受的时候，更多是独自抚慰的孤独。 \n在失去你们的日子里，我过得不好，思念和后悔占据了一心，可是渐渐地我好起来了，在往后生活里，你们并没有离开我，曾经教导我的点滴变得越发清晰，呈现在我眼前，慢慢改变我，帮助我过上更好的生活。\n爱，从不会随着逝去而消失，只会越来越强大。\n也许未来的路还很长，也许充满曲折和荆棘，但是你们总会为我引路，和我相扶，谢谢你们，我亲爱的父母。"
        },
        {
          title: '祖辈',
          desn: "亲爱的爷爷XXX，奶奶XXX：\n俗话说：“人老隔辈亲，爷奶疼小孙，人间天伦乐。”\n从小，最疼我的就是你们。\n多想回到20年前那个洒满月光的晚上，跟着爷爷的脚步，踏着地上的脚印，慢慢走在田埂上，只要喊一声，就会有一张大大的笑脸回头看我，他总说不论我去哪，他都会骑着车去接我回家。\n多想回到15年前的暑假，奶奶会在家里面煮上很多好吃的食物，香味飘散一屋子，勾出我肚子里的小馋虫，不停跟我说，快吃，多吃点。牵着我的手到街上买东西，不管我喜欢什么零食和玩具，一定会给我买。\n现在推开驳杂的大门，我好像还可以看见门后独自坐在院落里，茶香隐语，爷爷笑得腼腆而安静，我蹲在一旁问何时可以给我讲个故事和拉二胡，奶奶在一旁唠唠叨叨地说话，笑出满脸褶子，看起来那么漂亮。\n那时候，你们总说常回家看看你们。我都满嘴答应好的，心想多么容易的事情，不成想，在后来的时光里，连这样简单的期待都没能满足，而你们总不会怪罪，总是等着我。\n亲爱的爷爷奶奶，我很后悔，现在也只能后悔，我知道只有我拥有好的生活，你们才能满足，我一定会好好生活，过出自己的精彩，天上的你们是不是也笑着点点头，相信我呢？\n希望思念可以通过这封信飘到云端飘到你们那里，希望你们知道，我从不曾遗忘你们，因为爱，总有美满，谢谢你们的爱。"
        },


      ],
      // 防止被弹起
      showBtn: true,
      clientHeight: document.documentElement.clientHeight,



    }
  },
  mounted() {
    document.body.scrollTop = document.documentElement.scrollTop = 0
    this._view()
    // 防止被弹起
    window.onresize = () => {
      if (this.clientHeight > document.documentElement.clientHeight) {
        this.showBtn = false
      } else {
        this.showBtn = true
      }
    }


  },
  methods: {
    // 选图
    photoUp(flag) {
      Toast.clear();
      if (this.cropstate == 1) {
        this.firstImgurl = flag
      } else if (this.cropstate == 2) {
        this.secondImgurl = flag
      }
    },
    // 上传图片
    cropShow(flag, cropstate) {
      console.log(cropstate)
      if (cropstate) {
        this.cropstate = cropstate
      }

      this.showCrop = flag


    },
    // 选择生平模板
    tempSelect(index) {
      this.life = this.lifelist[index].desn
      this.lifeshow = false

    },
    // 解决输入框高度bug不稳定问题
    getHeight() {
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    },
    // 删除{美好回忆图片
    delect(flag) {
      this.lifeImg.splice(flag, 1)

    },
    // 美好回忆
    goodImg() {
      wx.chooseImage({
        count: 9,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: (res) => {
          console.log('微信返回', res)
          let localIds = res.localIds;
          console.log(localIds.length)
          for (var i = 0; i < localIds.length; i++) {
            this.syncUpload(localIds[i]);

          }
        }
      });
    },
    syncUpload(localId) {
      wx.uploadImage({
        localId: localId,
        success: (res) => {
          console.log('微信上传', res)
          this.wxImgDown(res.serverId);

        }
      });

    },
    wxImgDown(id) {
      axios({
        method: "post",
        url: 'http://cdn.fuyulove.com/action/wxImgDown.ashx',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          media_id: id,
        },
        transformRequest: [function (data) {
          let ret = ''
          for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret
        }],
      }).then((res) => {
        console.log('本地下载', res)
        this.lifeImg = this.lifeImg.concat(res.data.msg)
        console.log('this.lifeImg', this.lifeImg)
      }).catch(function (error) {
        console.log(error);
      });

    },
    // 逝者生平
    lifeSelect() {
      this.lifeshow = true

    },

    // 地址选择
    adConfirm(value) {
      console.log(value)
      let result = value.map(function (item) {
        return item.name;
      }).join("");
      if (this.areaselect == 1) {
        this.firstBirthaddr = result
      } else {
        this.secondBirthaddr = result
      }

      this.areaShow = false
    },
    areaShowList(flag) {
      this.areaselect = flag
      this.areaShow = true
    },
    adcancel() {
      this.areaShow = false
    },
    selcetAge(flag) {
      this.selcteage = flag
      if (flag == 1) {
        this.defaultAge = this.firstAge
      } else {
        this.defaultAge = this.secondAge
      }
      this.showPicker = true

    },
    // 选择年龄
    onConfirm(value) {
      // if (value) {
      if (this.selcteage == 1) {
        this.firstAge = value;
      } else {
        this.secondAge = value;

      }

      console.log(value)
      this.showPicker = false;
    },
    myRecall() {
      this.imglist = this.lifeImg.join("|")
      if (this.cardtype == 1) {
        this._editOne()
      } else {
        this._editTwo()
      }
    },
    _editTwo() {
      console.log('this.firstName', this.firstName)
      console.log('this.firstName', !this.firstName)
      if (this.firstName == '') {
        console.log('执行')
        Toast("请输入逝者姓名")
        return false
      } else if (this.secondName == '') {
        Toast("请输入逝者姓名")
        return false
      } else {
        edit({
          action: 'edit',
          carid: this.$route.query.carid,
          cardtype: this.cardtype,
          firstName: this.firstName,
          firstDeathdate: this.firstDeathdate,
          firstBirthday: this.firstBirthday,
          firstAge: this.firstAge,
          firstBirthaddr: this.firstBirthaddr,
          firstBuryaddr: this.firstBuryaddr,
          firstImgurl: this.firstImgurl,
          // 两个人
          secondName: this.secondName,
          secondBirthday: this.secondBirthday,
          secondDeathdate: this.secondDeathdate,
          secondImgurl: this.secondImgurl,
          secondAge: this.secondAge,
          secondBuryaddr: this.secondBuryaddr,
          secondBirthaddr: this.secondBirthaddr,
          // 其他
          fallname: this.fallname,
          life: this.life,
          imglist: this.imglist


        }).then(res => {
          console.log('编辑', res)
          if (res.code == 0) {
            // this.$router.push({
            //   path: './myRecall'
            // })
            Toast('编辑成功');
          } else {
            Toast('编辑失败，请重试');

          }


        })
      }

    },
    // 一个人呢
    _editOne() {
      if (this.firstName == '') {
        Toast("请输入逝者姓名")
        return false
      } else {
        edit({
          action: 'edit',
          carid: this.$route.query.carid,
          cardtype: this.cardtype,
          firstName: this.firstName,
          firstDeathdate: this.firstDeathdate,
          firstBirthday: this.firstBirthday,
          firstAge: this.firstAge,
          firstBirthaddr: this.firstBirthaddr,
          firstBuryaddr: this.firstBuryaddr,
          firstImgurl: this.firstImgurl,
          // 其他
          fallname: this.fallname,
          life: this.life,
          imglist: this.imglist

        }).then(res => {
          console.log('编辑', res)
          console.log('编辑', this.firstAge)
          if (res.code == 0) {
            // this.$router.push({
            //   path: './myRecall'
            // })
            Toast('编辑成功');
          } else {
            Toast('编辑失败，请重试');

          }

        })
      }

    },
    confirm(value) {
      // console.log(value)
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
    showStartime(flag, time) {
      this.flag = flag
      this.currentDate = new Date(time)
      console.log(this.currentDate)
      this.datetime = true

    },
    _view() {
      view({
        action: 'view',
        carid: this.$route.query.carid
      }).then(res => {
        console.log('纪念堂详情', res)
        this.list = res.data.list
        this.firstName = this.list[0].name
        this.firstBirthday = this.list[0].birthday
        this.firstDeathdate = this.list[0].deathdate
        this.firstAge = this.list[0].age
        this.cardtype = res.data.info.cardtype
        if (this.cardtype == 1) {
          this.lifelist = this.lifelistSingle
        } else {
          this.lifelist = this.lifelistDouble
        }
        this.firstBirthaddr = this.list[0].birthaddr
        this.firstBuryaddr = this.list[0].buryaddr
        this.firstImgurl = this.list[0].imgurl
        // 其他信息
        this.index = this.cardtype - 1
        this.fallname = res.data.info.fallname
        this.life = res.data.info.life
        if (res.data.info.imglist) {
          this.lifeImg = res.data.info.imglist.split("|");
        }
        if (this.list.length == 2) {
          this.secondName = this.list[1].name
          this.secondBirthday = this.list[1].birthday
          this.secondDeathdate = this.list[1].deathdate
          this.secondImgurl = this.list[1].imgurl
          this.secondAge = this.list[1].age
          this.secondBuryaddr = this.list[1].buryaddr
          this.secondBirthaddr = this.list[1].birthaddr
          // 显示双人
          this.mechan = true
        }

      })

    },
    // 切换单双人
    son(item, idx) {
      this.index = idx;
      console.log(idx)
      if (idx) {
        this.mechan = true
        this.cardtype = 2
        this.lifelist = this.lifelistDouble
      } else {
        this.mechan = false
        this.cardtype = 1
        this.lifelist = this.lifelistSingle
      }

    },
    toMechan() {
      this.$router.push({
        path: './mechan'
      })
    },


  },
  components: {
    // VueCropper
    upImg

  }
}
</script>
<style lang="scss" scoped>
.container {
  position: absolute;
  top: 0px;
  width: 100%;
  height: 100%;
}
.con {
  background-color: #f5f5f5;
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
  background-color:$color;
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
  /* height: 220px; */
  border-radius: 0.1rem;
  font-size: 31px;
  color: #000000;
  width: 690px;
  padding: 0 29px;
}
.btmMsg > .item {
  height: 0.96rem;
}
.btmMsg > .item > .btn {
  width: 214px;
  height: 55px;
  background-color: $color;
  color: #ffffff;
  font-size: 30px;
  border-radius: 26px;
  white-space: nowrap;
}
textarea {
  width: 100%;
  height: 450px;
  color: #000000;
  font-size: 31px;
  padding: 15px;
  margin-top: 15px;
  border: 2px solid #f2f2f2;
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
}
.bar {
  height: 18px;
  position: fixed;
  bottom: 0;
  width: 750px;
  background-color: #f5f5f5;
}
.lifeImg {
  padding: 30px 0;
}
.lifeImg > .item {
  width: 48%;
  border: 1px solid #f5f5f5;
  position: relative;
  margin-bottom: 25px;
}
.lifeImg > .item > .delect {
  position: absolute;
  right: -20px;
  top: -20px;
  width: 40px;
  height: 40px;
  display: block;
}
.lifeImg > .item > img {
  width: 100%;
  height: 300px;
  border-radius: 10px;
}
</style>

<style lang="scss"  scoped>
/* 生平模板样式 */
.mask {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 99;
  pointer-events: auto;
}

.lifeTpl {
  width: 100%;
  height: 100%;
  z-index: 101;
  background-color: #f5f5f5;
}

.tplTitle {
  height: 1.3rem;
  line-height: 1.3rem;
  padding-left: 1rem;
  font-size: 33px;
  color: #333333;
  background-color: #ffffff;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.3rem;
}

.tplList {
  margin-bottom: 100px;
}

.tplItem {
  position: relative;
}

.itemTitle {
  height: 60px;
  line-height: 60px;
  font-size: 30px;
  color: #333333;
  padding-left: 0.3rem;
  background-color: #f5f5f5;
}

.itemText {
  padding: 0.3rem;
  padding-bottom: 1rem;
  font-size: 28px;
  color: #666666;
  background-color: #ffffff;
  white-space: pre-line;
}

.selectedTpl {
  padding: 0.15rem 0.5rem;
  background-color:$color;
  border-radius: 2rem;
  position: absolute;
  right: 0.3rem;
  bottom: 0.15rem;
  color: #ffffff;
  font-size: 25px;
}

.closeIcon {
  width: 0.38rem;
  height: 0.38rem;
}
.layui-layer-dialog {
  border-radius: 0.2rem;
}
.layui-layer-btn .layui-layer-btn0 {
  border-color: #6a6198 !important;
  background-color: #6a6198 !important;
}
</style>