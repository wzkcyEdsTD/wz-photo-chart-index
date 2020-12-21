<template>
  <div class="qz">
    <div class="qz_num">
      <ul>
        <li v-for="(item,index) in num" :key="index">
          <img :src="fgtop" alt />
          <p>
            {{item.title}}
            <span :style="`color:#${item.color}`">{{item.value}}</span>
            {{item.unit}}
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      fgtop: require("../img/fgtop.png")
    };
  },
  props: ["num"]
};
</script>

<style  lang="less" scoped>
.qz {
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 12px;
  p {
    color: #fff;
    font-size: 12px;
    padding-left: 5px;
    display: inline-block;
    span {
      color: #ff4242;
      font-size: 14px;
      font-weight: bold;
    }
  }
  .qz_num {
    width: 100%;
    box-sizing: border-box;
    padding: 0px 10px;
    ul {
      list-style: none;
      background-image: linear-gradient(to right, #15005b, #4855d6, #15005b);
      padding: 8px;
      li {
        min-height: 23px;
        line-height: 23px;
        display: block;
        text-align: center;
        * {
          display: inline-block;
          vertical-align: top;
        }
        img {
          height: 14px;
          margin-top: 4px;
        }
      }
    }
  }
}
</style>