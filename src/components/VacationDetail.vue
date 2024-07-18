<template>
  <div class="VacationDetail">
    <h1 class="van-doc-demo-block__title"></h1>

    <van-cell-group class="font">
      <van-cell :title="fixedDesc" :value="userHours" size="large"/>
    </van-cell-group>
    <h1 class="van-doc-demo-block__title"></h1>

    <van-cell-group v-for="(absence, index) in absenceList" :key="index" class="font">
        <van-cell
          style="white-space: pre-wrap"
          :title="absence.absDate"
          :label="
            '起止时间' +
            absence.absTimeDesc +
            '                      已休時數' +
            absence.absHours +
            'H'
          "
          size="large"
        />
    </van-cell-group>
    <van-empty description="暂无记录" v-if="this.absenceList == ''" />
  </div>
</template>

<script type="text/babel">
import Vue from "vue";
import axios from "axios";
import qs from "qs";

import { Field, Popup, Cell, CellGroup, Picker, Toast, Empty } from "vant";
Vue.use(Field)
  .use(Popup)
  .use(Cell)
  .use(CellGroup)
  .use(Picker)
  .use(Toast)
  .use(Empty);
export default {
  inject: ["reload"],
  components: {},
  data() {
    return {
      userHours:'',
      fixedDesc:'',
      absenceList: [],
    };
  },
  created() {
    let empNo = this.$store.getters.empNo;
    let fixedDesc = this.$route.params.fixedDesc;
    this.fixedDesc = this.$store.getters.year+'年休假已休時數';
    this.userHours = '總計'+this.$route.params.userHours+'小时';
    this.$axios
      .get(
        "restHoursQuery/getEmployeeRestDetail?empNo=" + empNo + "&fixedDesc=" + fixedDesc
      )
      .then((res) => {
        let datas = res.data;
        if (datas.code === 1) {
          this.absenceList = datas.data;
        } else {
          this.name = "查询失败,请联系管理员";
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {},
};
</script>
<style>
.van-doc-demo-block__title {
  margin: 0;
  padding: 4px 16px 16px;
  color: rgba(69, 90, 100, 0.6);
  font-weight: bolder;
  font-size: 15px;
  line-height: 16px;
}
.font {
  font-weight: bolder;
}
</style>
