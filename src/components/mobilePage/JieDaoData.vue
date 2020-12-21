<template>
  <div class="control-view">
    <div class="control-view-inner" @scroll="scrollHandler">
      <table class="control-view-table-header" cellspacing="0" cellpadding="0" :style="{top: top + 'px'}">
        <thead>
          <tr>
            <th v-for="(value, index) of tableHead" :key="index">{{ value }}</th>  
          </tr>
        </thead>
      </table>
      <table class="control-view-table-body" cellspacing="0" cellpadding="0">
        <tbody>
          <tr v-for="(value, index) of tableData" :key="index">
            <td>{{ value.key }}</td>
            <td v-for="(item, ind) of value.value" :key="ind">{{ item }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "control-view",
  props: {
    tableData: {
      type: Array,
      default: function () {
        return [];
      }
    },
    tableHead: {
      type: Array,
      default: function () {
        return [];
      }
    }
  },
  data() {
    return {
      top: 0
    };
  },
  created() {},
  mounted() {},
  methods: {
    scrollHandler (e) {
      const target = e.target;
      this.top = target.scrollTop;
    }
  }
};
</script>
<style scoped>
  .control-view {
    height: 100%;
    width: 100%;
    padding: 15px 13px;
    box-sizing: border-box;
  }
  .control-view-inner {
    width: 100%;
    /*height: 100%;*/
    padding-top: 25px;
    box-sizing: border-box;
/*    overflow-y: auto;
    overflow-x: hidden;*/
    position: relative;
    border:1px solid rgba(192,187,187,1);
  }
  .control-view-table-header {
    table-layout: fixed;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 10;
  }
  .control-view-table-header th {
    padding: 0;
    font-size: 12px;  
    background-color: #FCF9FC;
    height: 25px;
    color: rgba(0,0,0,1);
    font-weight: bold;
  }
  .control-view-table-body {
    width: 100%;
    height: 100%;
    table-layout: fixed;
  }
  .control-view-table-body td {
    height: 25px;
    font-size: 12px;
    color: #000;
  }
  .control-view-table-body tr:nth-child(even) {
    background: #FCF9FC;
  }
  .control-view-table-body tr td:nth-child(2) {
    color: #fa5350;
  }
  .control-view-table-body tr td:nth-child(3) {
    color: #fa5350;
  }
  .control-view-table-body tr td:nth-child(4) {
    color: #00B87E;
  }
  .control-view-table-body tr td:nth-child(5) {
    color: #7E7E7E;
  }
  .control-view-inner::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }
  .control-view-inner::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: #07e2e8;
  }
  .control-view-inner::-webkit-scrollbar-track {
    border-radius: 10px;
    background: #081942;
  }
</style>