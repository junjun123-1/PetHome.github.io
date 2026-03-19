
<template>
  <div class="about-us">
    <!-- 其他内容 -->
    <div id="volunteer-chart" style="width: 600px; height: 400px;"></div>
    <!-- 其他内容 -->
  </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: 'AboutUs',
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      const chartDom = document.getElementById('volunteer-chart');
      const myChart = echarts.init(chartDom);

      const option = {
        title: {
          text: '志愿者服务领域分布',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'horizontal',
          bottom: 'bottom',
          data: ['现场救助', '医疗协助', '日常护理', '宣传推广']
        },
        series: [
          {
            name: '服务领域',
            type: 'pie',
            radius: '50%',
            data: [
              { value: 35, name: '现场救助' },
              { value: 25, name: '医疗协助' },
              { value: 30, name: '日常护理' },
              { value: 10, name: '宣传推广' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };

      myChart.setOption(option);
    }
  }
};
</script>

<style scoped>
/* ... existing code ... */
#volunteer-chart {
  margin: 20px auto;
}
/* ... existing code ... */
</style>