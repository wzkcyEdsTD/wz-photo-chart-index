<template>
  <div id="sbDateDiv">
    <h3>- 确诊病例动态更新 -</h3>
    <ul>
      <li>
        <span>1.患者：张**，女，温州市鹿城区荷花大厦*栋***号，68岁</span>
      </li>
      <li>
        <span>2.患者：安**，男，温州市鹿城区马鞍池***号，54岁</span>
      </li>
      <li>
        <span>3.患者：涛**，女，温州市鹿城区信河街***号，67岁</span>
      </li>
      <li>
        <span>4.患者：姚**，男，温州市鹿城区学院西路***号，34岁</span>
      </li>
      <li>
        <span>5.患者：张**，女，温州市鹿城区锦春大厦*栋***号，76岁</span>
      </li>
    </ul>
  </div>
</template>

<script>
/* eslint-disable */
export default {};
</script>

<style>
#fy-rightDiv #sbDateDiv {
  width: 100%;
  height: 32%;
  background-color: rgba(5, 26, 79, 0.5);
  border: 1px solid #035acd;
}
#fy-rightDiv #sbDateDiv h3 {
  color: #23c9f3;
  margin-top: 10px;
}
#fy-rightDiv #sbDateDiv ul {
  list-style: none;
  width: 96%;
  margin-left: 2%;
  margin-top: 3%;
}
#fy-rightDiv #sbDateDiv ul li {
  padding: 10px 0;
  background: #122960;
  text-align: left;
  padding-left: 15px;
  overflow: hidden; /*超出部分隐藏*/
  white-space: nowrap; /*不换行*/
  text-overflow: ellipsis; /*超出部分文字以...显示*/
}
#fy-rightDiv #sbDateDiv ul li:nth-child(even) {
  background: #081942;
}
#fy-rightDiv #sbDateDiv ul li:hover 
{
  cursor: pointer;
  background-color: #0b5cc7;
}
</style>