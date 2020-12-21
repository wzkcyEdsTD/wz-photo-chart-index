<template>
  <div id="topDateDiv">
    <ul>
      <li>
        <h3 style="color:#ff283a">{{$window.nCov_luchengData.macroscopic.lc.qzbl}}人</h3>
        <p>确诊病例</p>
      </li>
      <li>
        <h3 style="color:#fcc659">{{$window.nCov_luchengData.macroscopic.lc.zzbl}}人</h3>
        <p>疑似病例</p>
      </li>
      <li>
        <h3 style="color:#f6e31b">{{$window.nCov_luchengData.macroscopic.death}}人</h3>
        <p>死亡病例</p>
      </li>
      <li>
        <h3 style="color:#1eff95">{{$window.nCov_luchengData.macroscopic.cure}}人</h3>
        <p>治愈病例</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {};
</script>

<style>
#topDateDiv {
  position: absolute;
  top: 95px;
  width: 100%;
}
#topDateDiv ul li {
  width: 5%;
  margin: auto;
  display: inline-block;
  background-color: #1b45a7;
  border: 1px solid #07e2e8;
  margin-left: 10px;
  padding: 5px 9px;
  color: #07e2e8;
}
</style>