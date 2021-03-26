
import Vue from 'vue';

import axios from 'axios';
new Vue({
  el: '#app',
  data: {
    message: [],
    tab: 'all',
    page: 1
  },
  beforeMount(s1, s2) {
    this.tab = s1,
    this.page = s2
    axios({
      url: 'https://cnodejs.org/api/v1/topics',
      method: 'get',
      params: { tab: s1, limit: 20, page: s2 },
    }).then(response => {
      console.log(response);
      this.message = response.data;
      this.$refs.all.className = 'active'
    }).catch(err => {
      console.log(err);
    })
  },
  titleHead() {
    if (this.message.data.top === true) {
      this.message.data.tap = '置顶'
    }
  },
  methods: {
    fetchMessage(s1, s2) {
      this.tab = s1,
      this.page = s2
      axios({
        url: 'https://cnodejs.org/api/v1/topics',
        method: 'get',
        params: { tab: s1, limit: 20, page: s2 },
      }).then(response => {
        console.log(response);
        this.message = response.data;
        if(s1 == 'all'){
          this.$refs.all.className = 'active'
        }else{
          this.$refs.all.className = ''
        }
      }).catch(err => {
        console.log(err);
      })
    },
    titleHead() {
      if (this.message.data.top === true) {
        this.message.data.tap = '置顶'
      }
    }
  },
  filters: {
    sinicized: value => {
      if (value == 'share') {
        return value = '分享'
      } else if (value == 'ask') {
        return value = '问答'
      } else if (value == 'good') {
        return value = '精华'
      } else {
        return value = '招聘'
      }
    },
    nowTime: value => {
      let time1 = new Date();
      let time2 = new Date(value);
      let time = Math.abs(time1 - time2);
      let day = parseFloat(time / 1000 / 3600 / 24).toFixed(3)
      if (day >= 1) {
        return value = `${Math.ceil(day)}天前`;
      } else if (day > 365) {
        let year = parseInt(day / 365);
        return value = `${year}年前`;
      } else if (day < 1) {
        let hour = parseFloat(day * 24).toFixed(0);
        let min = parseInt((day * 24).toFixed(2)*60);
        if(min < 60){
          return value = `${min}分钟前`
        }
        return value = `${hour}小时前`;
      }
    }
  },

})