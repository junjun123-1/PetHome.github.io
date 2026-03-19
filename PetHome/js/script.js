// JavaScript代码实现网站交互功能

document.addEventListener('DOMContentLoaded', function() {
    // 移动端导航菜单切换
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });
    
    // 导航链接平滑滚动
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetSection = document.querySelector(targetId);
            if(targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // 关闭移动端菜单
                navMenu.classList.remove('active');
            }
        });
    });
    
    // 浮动按钮动画效果
    const floatingBtns = document.querySelectorAll('.floating-btn');
    floatingBtns.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // 卡片悬停效果
    const cards = document.querySelectorAll('.news-card, .animal-card, .process-step, .donate-option, .education-topic');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // 按钮点击效果
    const buttons = document.querySelectorAll('button, .floating-btn, .secondary-btn, .primary-btn');
    buttons.forEach(button => {
        button.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = '';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // 添加滚动监听，当页面滚动时给导航栏添加阴影效果
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if(window.scrollY > 50) {
            navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
            navbar.style.background = 'white';
        }
    });
    
    // 表单提交模拟（实际应用中需要连接后端）
    const reportButton = document.getElementById('report');
    if(reportButton) {
        reportButton.addEventListener('click', function() {
            alert('即将跳转到救助上报表单，请准备动物的位置、照片和基本信息');
        });
    }
    
    // 动物卡片详情按钮事件
    const animalDetailButtons = document.querySelectorAll('.animal-card .secondary-btn');
    animalDetailButtons.forEach(button => {
        button.addEventListener('click', function() {
            const animalName = this.closest('.animal-card').querySelector('h3').textContent;
            alert(`您想了解关于${animalName}的更多信息，请前往详情页面查看完整的档案和领养流程`);
        });
    });
    
    // 捐赠按钮事件
    const donateButtons = document.querySelectorAll('.donate-option .secondary-btn');
    const donateLabels = ['资金捐赠', '物资捐赠', '云认养', '文创购买'];
    
    donateButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            alert(`${donateLabels[index]}功能即将跳转，请在新页面完成相应操作`);
        });
    });
    
    // 图表交互功能
    const chartWrappers = document.querySelectorAll('.chart-wrapper');
    chartWrappers.forEach(wrapper => {
        wrapper.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
            this.style.transform = 'translateY(-5px)';
        });
        
        wrapper.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 3px 10px rgba(0,0,0,0.05)';
            this.style.transform = 'translateY(0)';
        });
    });
    
    // 添加图表动画效果
    const observerOptions = {
        threshold: 0.1
    };
    
    const chartObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                // 为柱状图添加动画
                if(entry.target.classList.contains('chart-placeholder')) {
                    animateChartBars(entry.target);
                }
                chartObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // 观察所有的图表占位符
    document.querySelectorAll('.chart-placeholder').forEach(placeholder => {
        chartObserver.observe(placeholder);
    });
    
    // 柱状图动画函数
    function animateChartBars(chartContainer) {
        const bars = chartContainer.querySelectorAll('[style*="position:absolute"][style*="background"]');
        bars.forEach((bar, index) => {
            setTimeout(() => {
                const currentHeight = bar.style.height || getComputedStyle(bar).height;
                bar.style.height = '0';
                bar.style.transition = 'height 1s ease-out';
                setTimeout(() => {
                    bar.style.height = currentHeight;
                }, 50);
            }, index * 200);
        });
    }
});

// 动态加载统计数据的函数
function updateStats() {
    // 这里可以调用API获取最新的统计数据
    // 目前只是模拟数据变化的效果
    console.log('正在更新统计数据...');
}

// 页面加载完成后开始更新统计
window.onload = function() {
    updateStats();
};