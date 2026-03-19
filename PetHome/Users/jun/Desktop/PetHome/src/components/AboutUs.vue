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
          data: ['现场救助', '医疗协助', '日常护理', '宣传推广'],
          textStyle: {
            color: '#333'
          }
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
            },
            label: {
              show: true,
              formatter: '{b}: {c} ({d}%)'
            },
            labelLine: {
              show: true
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
.about-us {
  padding: 50px 20px;
  text-align: center;
}

#volunteer-chart {
  margin: 20px auto;
}

.donate-section {
  background-color: #f9f9f9;
  padding: 50px 0;
}

.donate-options {
  display: flex;
  justify-content: space-between;
}

.donate-option {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: center;
  width: 22%;
  position: relative;
}

.donate-option i {
  font-size: 36px;
  color: #118ab2;
  margin-bottom: 10px;
}

.donate-option h3 {
  font-size: 20px;
  margin-bottom: 10px;
}

.donate-option p {
  font-size: 14px;
  color: #777;
  margin-bottom: 20px;
}

.secondary-btn {
  background-color: #118ab2;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 100%; /* 确保按钮宽度一致 */
}

.secondary-btn:hover {
  background-color: #0c6a8e;
}

/* 使用Flexbox使按钮水平居中对齐 */
.donate-option .secondary-btn {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
}
