<template>
    <div class="zdfkq">
        <div class="secofbg">
            <div class="ecimg1"></div>
            <div class="ecri">
                <div class="dwtt">商场超市</div>
                <div class="secnum">共计：{{$window.nCov_luchengData.macroscopic.people_type_8}}家</div>
            </div>
        </div>
        <div class="secofbg">
            <div class="ecimg2"></div>
            <div class="ecri">
                <div class="dwtt">农贸市场</div>
                <div class="secnum">共计：{{$window.nCov_luchengData.macroscopic.people_type_9}}家</div>
            </div>
        </div>
        <div class="secofbg">
            <div class="ecimg3"></div>
            <div class="ecri">
                <div class="dwtt">文化场所</div>
                <div class="secnum">共计：{{$window.nCov_luchengData.macroscopic.people_type_11}}家</div>
            </div>
        </div>
        <div class="secofbg">
            <div class="ecimg4"></div>
            <div class="ecri">
                <div class="dwtt">健身房</div>
                <div class="secnum">共计：{{$window.nCov_luchengData.macroscopic.people_type_7}}家</div>
            </div>
        </div>
        <div class="secofbg">
            <div class="ecimg5"></div>
            <div class="ecri">
                <div class="dwtt">城市书房</div>
                <div class="secnum">共计：{{$window.nCov_luchengData.macroscopic.people_type_6}}家</div>
            </div>
        </div>
        <div class="secofbg">
            <div class="ecimg6"></div>
            <div class="ecri">
                <div class="dwtt">博物馆</div>
                <div class="secnum">共计：{{$window.nCov_luchengData.macroscopic.people_type_14}}家</div>
            </div>
        </div>
        <div class="secofbg">
            <div class="ecimg8"></div>
            <div class="ecri">
                <div class="dwtt">专业市场</div>
                <div class="secnum">共计：{{$window.nCov_luchengData.macroscopic.people_type_3}}家</div>
            </div>
        </div>
        <div class="secofbg">
            <div class="ecimg9"></div>
            <div class="ecri">
                <div class="dwtt">天基宗教</div>
                <div class="secnum">共计：{{$window.nCov_luchengData.macroscopic.people_type_2}}家</div>
            </div>
        </div>
        <div class="secofbg">
            <div class="ecimg10"></div>
            <div class="ecri">
                <div class="dwtt">佛道宗教</div>
                <div class="secnum">共计：{{$window.nCov_luchengData.macroscopic.people_type_1}}家</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "zdfkq",
        data() {
            return {
                kindList: [
                    {name: '商场超市', num: 26, img: 'A.png'},
                    {name: '农贸市场', num: 8, img: 'B.png'},
                    {name: '机构培训', num: 8, img: 'C.png'},
                    {name: '健身房', num: 26, img: 'D.png'},
                    {name: '城市书房', num: 8, img: 'E.png'},
                    {name: '酒店旅馆', num: 8, img: 'F.png'},
                    {name: '学校', num: 26, img: 'G.png'},
                    {name: '专业市场', num: 26, img: 'H.png'},
                    {name: '天基宗教', num: 26, img: 'J.png'},
                    {name: '佛道宗教', num: 26, img: 'K.png'}
                ]
            }
        },
    }
</script>

<style scoped>
    .zdfkq {
        width: 100%;
        height: 100%;
    }

    .secofbg {
        flex: 1;
        width: 33%;
        height: 25%;
        display: inline-flex;
    }

    .ecimg1 {
        display: inline;
        float: left;
        width: 50px;
        height: 50px;
        background: url('./img/A.png') no-repeat;
        background-size: 100% 100%;
    }

    .ecimg2 {
        display: inline;
        float: left;
        width: 50px;
        height: 50px;
        background: url('./img/B.png') no-repeat;
        background-size: 100% 100%;
    }

    .ecimg3 {
        display: inline;
        float: left;
        width: 50px;
        height: 50px;
        background: url('./img/C.png') no-repeat;
        background-size: 100% 100%;
    }

    .ecimg4 {
        display: inline;
        float: left;
        width: 50px;
        height: 50px;
        background: url('./img/D.png') no-repeat;
        background-size: 100% 100%;
    }

    .ecimg5 {
        display: inline;
        float: left;
        width: 50px;
        height: 50px;
        background: url('./img/E.png') no-repeat;
        background-size: 100% 100%;
    }

    .ecimg6 {
        display: inline;
        float: left;
        width: 50px;
        height: 50px;
        background: url('./img/F.png') no-repeat;
        background-size: 100% 100%;
    }

    .ecimg7 {
        display: inline;
        float: left;
        width: 50px;
        height: 50px;
        background: url('./img/G.png') no-repeat;
        background-size: 100% 100%;
    }

    .ecimg8 {
        display: inline;
        float: left;
        width: 50px;
        height: 50px;
        background: url('./img/H.png') no-repeat;
        background-size: 100% 100%;
    }

    .ecimg9 {
        display: inline;
        float: left;
        width: 50px;
        height: 50px;
        background: url('./img/J.png') no-repeat;
        background-size: 100% 100%;
    }

    .ecimg10 {
        display: inline;
        float: left;
        width: 50px;
        height: 50px;
        background: url('./img/K.png') no-repeat;
        background-size: 100% 100%;
    }

    .ecri {
        display: inline;
        float: right;
        width: 59%;
        height: 100%;
    }

    .dwtt {
        color: #FFF;
        font-size: 18px;
        text-align: left;
    }

    .secnum {
        color: #3EC6D8;
        font-size: 20px;
        text-align: left;
    }

</style>