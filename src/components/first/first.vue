<template>
  <div class="mainContent">
    <div class="itemContent">
      <div class="itemHeader">
        <p>
          待办事项
          <span class="headerInfo">
            共有
            <span style="color:red;">
              15
            </span>
            条待办事项
          </span>
        </p>
      </div>
      <div class="itemInfo">
        <div class="infoItem" v-for="(item,index) in dataObj.personArr" :key="index">
          <p class="infoTitle">
            {{item.id}}、{{item.title}}
          </p>
        </div>
      </div>
      <span class="bottomInfo" @click="gotoPath">查看更多</span>
    </div>
    <div class="itemContent">
      <div class="itemHeader">
        <p>
          重点任务
          <span class="headerInfo">
            共有
            <span style="color:red;">
              36
            </span>
            条重点任务
          </span>
        </p>
      </div>
      <div id="myChart" class="echartContent">

      </div>
    </div>
    <div class="itemContent">
      <div class="itemHeader">
        <p>
          日程安排
          <span class="headerInfo">
            共有
            <span style="color:red;">
              5
            </span>
            条日程安排
          </span>
        </p>
      </div>
      <div class="dateContent">
        <div class="changeSpan">
          <p>会议</p>
          <p>出差</p>
        </div>
        <div class="dateInfo">
          <div class="dateItem" v-for="(item,index) in dataObj.dateArr" :key="index">
            <div class="dateHeader">
              <p class="iconP">今</p>
              <p>{{item.title}}</p>
            </div>
            <div class="itemInfo">
              <span>{{item.time}}</span>
              <span>{{item.room}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="itemContent">
      <div class="itemHeader">
        <p>
          人员类别构成
        </p>
      </div>
      <div id="myCharts" class="echartContent">

      </div>
    </div>
    <div class="itemContent">
      <div class="itemHeader">
        <p>
          本年度收支统计
        </p>
      </div>
      <div id="myChartMoney" class="echartContent">

      </div>
    </div>
    <div class="itemContent">
      <div class="itemHeader">
        <p>
          通知公告
          <span class="headerInfo">
            查看更多
          </span>
        </p>
      </div>
      <div class="messageContent">
        <ul>
          <li class="messageItem" v-for="(item,index) in dataObj.messageArr" :key="index">
            <div class="infoP">
              <p class="borderIcon"></p>
              <p :class="item.isNew?'messageInfoNew':'messageInfo'">{{item.title}}</p>
              <p class="messageIcon" v-if="item.isNew">新</p>
            </div>
            <p class="timeP">
              <span>
                {{item.time}}
              </span>
            </p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { getCurrentInstance, reactive, onMounted } from "vue";

export default {
  setup() {
    onMounted(() => {
      console.log(111)
      drawPie();
      drawPieSpecial();
      drawLine();
    });
    const { ctx } = getCurrentInstance();
    const dataObj = {
      personArr: [
        {
          title: "张丽的通用审批申请待您审批。",
          company: "山东旗帜信息有限公司",
          name: "张丽",
          time: "04-16 14:34",
          state: "待审批",
          id: 1
        },
        {
          title: "张三的出差申请待您审批。",
          company: "山东旗帜信息有限公司",
          name: "张丽",
          time: "04-16 14:34",
          state: "待审批",
          id: 2
        },
        {
          title: "赵四的开票申请待您审批。",
          company: "山东旗帜信息有限公司",
          name: "张丽",
          time: "04-16 14:34",
          state: "待审批",
          id: 3
        },
        {
          title: "小明的请假申请待您审批。",
          company: "山东旗帜信息有限公司",
          name: "张丽",
          time: "04-16 14:34",
          state: "待审批",
          id: 4
        },
        {
          title: "张丽的补卡申请待您审批。",
          company: "山东旗帜信息有限公司",
          name: "张丽",
          time: "04-16 14:34",
          state: "待审批",
          id: 5
        }
      ],
      dateArr: [
        {
          title: "1、第二季度工作会议",
          time: "时间：9:00-10:00",
          room: "地点：2301会议室"
        },
        {
          title: "2、第三季度工作会议",
          time: "时间：13:30-15:00",
          room: "地点：2304会议室"
        },
        {
          title: "3、项目启动会",
          time: "时间：16:00-18:00",
          room: "地点：2302会议室"
        }
      ],
      messageArr: [
        {
          title: "关于推迟2020年度员工体检时间的通知",
          time: "2020-04-11",
          isNew: true
        },
        {
          title: "关于举办公司四周年庆祝仪式的通知",
          time: "2020-04-11",
          isNew: true
        },
        {
          title: "关于宣传标语和宣传口号征集活动的通知",
          time: "2020-04-10",
          isNew: false
        },
        {
          title: "关于开展个人所得税综合所得会算清缴的通知",
          time: "2020-04-09",
          isNew: false
        }
      ]
    };
    var myChart;
    var myChartPie;
    var myChartLine;
    ctx.$router.beforeResolve((to, from, next) => {
      ctx.$store.commit("setCurrent", to.path);
      myChart.dispose();
      myChartPie.dispose();
      myChartLine.dispose();
      next();
    });
    const gotoPath = () => {
      let obj = {
        path: "/second",
        name: "second",
        title: "第二个"
      };
      ctx.$store.commit("setCurrent", "/second");
      ctx.$store.commit("setPage", obj);
      ctx.$router.push("/second");
    };
    const drawPie = () => {
      myChart = echarts.init(document.getElementById("myChart"));
      myChart.setOption({
        color: ["#fe7481", "#4775ff", "#ffaf40"],
        animation: false,
        series: [
          {
            name: "",
            type: "pie",
            radius: "70%",
            center: ["50%", "50%"],
            label: {
              formatter: "{b}\n{d}%",
              fontSize: 10
            },
            labelLine: {
              length: 15,
              length2: 5
            },
            data: [
              { value: 10, name: "已超期" },
              { value: 26, name: "已完成" },
              { value: 64, name: "未完成" }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      });
    };
    const drawPieSpecial = () => {
      let data = [
        { value: 56, name: "领导班子" },
        { value: 200, name: "在岗员工" },
        { value: 10, name: "内推员工" },
        { value: 100, name: "实习生" },
        { value: 60, name: "劳务外包" },
        { value: 12, name: "退休人员" },
        { value: 20, name: "其他" }
      ];
      let showData = [];
      let sum = 0,
        max = 0;
      data.forEach(item => {
        sum += item.value;
        if (item.value >= max) max = item.value;
      });

      // 放大规则
      let number = Math.round(max * 0.5);

      showData = data.map(item => {
        return {
          value: number + item.value,
          name: item.name
        };
      });
      myChartPie = echarts.init(document.getElementById("myCharts"));
      myChartPie.setOption({
        color: [
          "#4775ff",
          "#ff7582",
          "#ffd35a",
          "#00d688",
          "#51b2ff",
          "#7bf294",
          "#fead41"
        ],
        animation: false,
        legend: {
          orient: "vertical",
          x: "70%",
          icon: "circle",
          itemWidth: 12,
          itemHeight: 5,
          textStyle: {
            fontSize: 10
          },
          data: [
            "领导班子",
            "在岗员工",
            "内推员工",
            "实习生",
            "劳务外包",
            "退休人员",
            "其他"
          ]
        },
        tooltip: {
          trigger: "item",
          formatter: function(param) {
            return param.name + ":" + (param.value - number);
          }
        },
        series: [
          {
            type: "pie",
            radius: [20, 80],
            center: ["25%", "50%"],
            roseType: "radius",
            label: {
              show: false
            },
            emphasis: {
              label: {
                show: false
              }
            },
            data: showData
          }
        ]
      });
    };
    const drawLine = () => {
      myChartLine = echarts.init(document.getElementById("myChartMoney"));
      myChartLine.setOption({
        color: ["#fead41", "#00d587", "#3aa1fe", "#ddebf8"],
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["去年收入", "去年支出", "", "今年收入", "今年支出"],
          x: "right",
          itemWidth: 12,
          itemHeight: 5,
          textStyle: {
            fontSize: 10
          }
        },
        xAxis: {
          type: "category",
          //坐标轴斜着显示
          axisLabel: {
            textStyle: {
              fontSize: 10
            },
            interval: 0,
            rotate: 40
          },
          axisTick: {
            show: false
          },
          data: ["第一季度", "第二季度", "第三季度", "第四季度"]
        },
        yAxis: {
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: "dashed"
            }
          },
          axisLabel: {
            textStyle: {
              fontSize: 10
            }
          }
        },
        grid: {
          top: "25%",
          left: "0%",
          right: "0%",
          bottom: "3%",
          containLabel: true
        },
        series: [
          {
            name: "去年收入",
            type: "line",
            data: [280, 600, 300, 900]
          },
          {
            name: "去年支出",
            type: "line",
            data: [100, 220, 50, 400]
          },
          {
            name: "今年收入",
            type: "bar",
            barWidth: "25%",
            data: [400, 250, 200, 900]
          },
          {
            name: "今年支出",
            type: "bar",
            barWidth: "25%",
            data: [250, 200, 80, 400]
          }
        ]
      });
    };
    return {
      gotoPath,
      dataObj,
      drawPie,
      drawPieSpecial
    };
  }
};
</script>

<style scoped lang='scss'>
@import "index.scss";
</style>
