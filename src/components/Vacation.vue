<template>
  <div class="Vacation">
    <h1 class="van-doc-demo-block__title"></h1>
    <van-cell-group inset="true" class="font">
      <van-cell :value="year" title="假期查询年份" size="large" />
    </van-cell-group>
    <h1 class="van-doc-demo-block__title"></h1>
    <van-cell-group
      v-for="(rest, index) in restHours"
      :key="index"
      class="font"
    >
      <van-cell
        style="white-space: pre-wrap;border-color:#1989fa;"
        :title="rest.fixedDesc"
        center
        size="large"
        is-link
        :border="true"
        :to="'/VacationDetail/' + rest.fixedDesc + '/' + rest.userHours"
      >
        <span class="rest-hours"> 定额时数:{{ rest.totleHours }}小时</span>
        <span class="rest-hours" style="color:red" > 已用时数:{{ rest.userHours }}小时</span>
        <span class="rest-hours" style="color:green"> 可用时数:{{ rest.remainHours }}小时</span>
      </van-cell>
      <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa'}">
      </van-divider>
    </van-cell-group>

    <van-empty description="暂无记录" v-if="this.restHours == ''" />
  </div>
</template>

<script type="text/babel">
function getUrlParam(name) {
  //封装方法
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
  var r = window.location.search.substr(1).match(reg); //匹配目标参数
  if (r != null) return unescape(r[2]);
  return null; //返回参数值
}
import Vue from "vue";
import axios from "axios";
import qs from "qs";
import moment from "moment";
import { Field, Popup, Cell, CellGroup, Picker, Toast, Empty,Divider} from "vant";
Vue.use(Field)
  .use(Popup)
  .use(Cell)
  .use(CellGroup)
  .use(Picker)
  .use(Toast)
  .use(Empty)
  .use(Divider);
export default {
  inject: ["reload"],
  components: {},
  data() {
    return {
      empNo: "",
      year: "",
      fixedDesc: "",
      restHours: [],
    };
  },
  created() {
    // this.year = moment().format("YYYY-MM");
    if ("" == this.$store.getters.year) {
      this.year = moment().format("YYYY");
      this.$store.commit("UPDATE_YEAR", this.year);
    } else {
      this.year = this.$store.getters.year;
    }
    let empNo = this.$store.getters.empNo;
    const code = getUrlParam("code"); // 截取路径中的code，如果没有就去微信授权，如果已经获取到了就直接传code给后台获取openId
    if (code) {
      if (empNo === "" || empNo === null) {
        // 通过code获取 openId等用户信息
        this.$axios
          .get("OAuth2/authorize?name=vacationKS&area=KS&code=" + code)
          .then((res) => {
            let datas = res.data;
            if (datas.code === 1) {
              console.log("授权成功");
              this.empNo = datas.data.empNo;
              this.$store.commit("UPDATE_USERID", datas.data.userId);
              this.$store.commit("UPDATE_EMPNO", datas.data.empNo);
              if (this.empNo != null) {
                this.$axios
                  .get("restHoursQuery/getEmployeeRestList?empNo=" + this.empNo)
                  .then((res) => {
                    let datas = res.data;
                    if (datas.code === 1) {
                      this.restHours = datas.data;
                    } else {
                      this.name = "您未取得应用授权";
                    }
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              }
            } else {
              this.getCodeApi("VacationKS");
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        this.$axios
          .get("restHoursQuery/getEmployeeRestList?empNo=" + empNo)
          .then((res) => {
            let datas = res.data;
            if (datas.code === 1) {
              this.restHours = datas.data;
            } else {
              this.name = "您未取得应用授权";
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } else {
      this.getCodeApi("VacationKS");
    }
  },
  methods: {
    getCodeApi(state) {
      //获取code
      let urlNow = encodeURIComponent("https://wx2.primax.com.cn/holidayKS");
      let scope = "snsapi_base"; //snsapi_userinfo   //静默授权 用户无感知
      let appid = "ww6702157cf83bd8ff";
      let url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${urlNow}&response_type=code&scope=${scope}&state=${state}#wechat_redirect`;
      window.location.replace(url);
    },
  },
};
</script>
<style>
@grey: #969799;
.font {
  font-weight: bolder;
}
.van-doc-demo-block__title {
  margin: 0;
  padding: 8px 16px 16px;
  color: rgba(69, 90, 100, 0.6);
  font-weight: bolder;
  font-size: 15px;
  line-height: 16px;
}
.rest-hours {
  margin: 0;
  text-align: left;
  color: rgba(69, 90, 100, 0.6);
  display: block;
  font-weight: bolder;
  line-height: 14px;
}
</style>
