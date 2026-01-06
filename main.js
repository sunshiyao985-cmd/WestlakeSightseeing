// 等待页面所有DOM元素加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 1. 顶部栏“返回”按钮：返回上一页（适配PC/移动端）
    const backBtn = document.querySelector('.top-bar .back');
    backBtn.addEventListener('click', function() {
        // 若有上一页则返回，无则提示
        if (window.history.length > 1) {
            window.history.back();
        } else {
            alert('当前为首页，无法返回');
        }
        // 触摸/鼠标悬浮反馈
        this.style.color = '#ff6b6b';
        setTimeout(() => { this.style.color = '#fff'; }, 300);
    });

    // 2. 顶部栏“设置”按钮：弹窗提示（模拟功能入口）
    const settingBtn = document.querySelector('.top-bar .setting');
    settingBtn.addEventListener('click', function() {
        alert('设置功能：\n1. 账号安全\n2. 消息通知\n3. 主题切换（待上线）');
        // 点击动画反馈
        this.style.transform = 'rotate(90deg)';
        this.style.transition = 'transform 0.3s ease';
        setTimeout(() => { this.style.transform = 'rotate(0)'; }, 300);
    });

    // 3. 个人头像：点击放大预览（移动端触摸友好）
    const userAvatar = document.querySelector('.user-avatar');
    userAvatar.addEventListener('click', function() {
        // 切换“放大/还原”状态
        const isZoomed = this.style.transform === 'scale(1.5)';
        this.style.transform = isZoomed ? 'scale(1)' : 'scale(1.5)';
        this.style.transition = 'transform 0.3s ease';
        this.style.boxShadow = isZoomed ? 'none' : '0 0 15px rgba(0,0,0,0.2)';
    });

    // 4. 功能列表项：点击跳转+触摸反馈（模拟页面跳转逻辑）
    const funcItems = document.querySelectorAll('.func-item');
    funcItems.forEach(item => {
        // 点击事件（核心交互）
        item.addEventListener('click', function() {
            const funcName = this.querySelector('.left span').textContent;
            // 不同功能差异化处理
            switch(funcName) {
                case '勋章墙':
                    alert(`勋章进度：已解锁3/10\n解锁方式：完成“西湖十景”闯关任务`);
                    break;
                case '收藏路线':
                    window.location.href = 'collection.html'; // 假设跳转至“收藏路线”页
                    break;
                default:
                    alert(`【${funcName}】页面加载中...`);
            }
        });

        // 触摸/鼠标悬浮反馈（提升交互感）
        item.addEventListener('touchstart', handleHoverIn);
        item.addEventListener('mouseover', handleHoverIn);
        item.addEventListener('touchend', handleHoverOut);
        item.addEventListener('mouseout', handleHoverOut);

        // 封装“悬浮进入”效果
        function handleHoverIn() {
            item.style.backgroundColor = '#f5f5f5';
            item.querySelector('.right i').style.color = '#ff6b6b';
        }
        // 封装“悬浮离开”效果
        function handleHoverOut() {
            item.style.backgroundColor = '#fff';
            item.querySelector('.right i').style.color = '#999';
        }
    });

    // 5. 底部导航：切换激活状态+页面跳转（核心导航交互）
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const navName = this.textContent.trim();
            // 1. 更新激活状态（移除其他项激活，添加当前项激活）
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            // 2. 模拟页面跳转（对应项目其他页面）
            const navUrlMap = {
                '首页': 'index.html',
                '闯关': 'game.html',
                '路线': 'route.html',
                '我的': 'profile.html'
            };
            // 若点击当前页则不跳转，否则跳转对应页面
            if (navUrlMap[navName] !== window.location.pathname.split('/').pop()) {
                alert(`跳转至“${navName}”页面`);
                // 实际项目中替换为：window.location.href = navUrlMap[navName];
            }
        });
    });

    // 6. 页面滚动：底部导航栏阴影动态显示（优化视觉体验）
    window.addEventListener('scroll', function() {
        const bottomNav = document.querySelector('.bottom-nav');
        // 滚动距离>50px时显示阴影，否则隐藏
        bottomNav.style.boxShadow = window.scrollY > 50 
            ? '0 -2px 10px rgba(0,0,0,0.1)' 
            : 'none';
    });
});

// 在闯关页面景点跳转功能的代码中，替换为以下代码：

// 7. 闯关页面景点跳转功能（修复版）
const sceneryItems = document.querySelectorAll('#scenery-list .func-item');
sceneryItems.forEach(item => {
    item.addEventListener('click', function() {
        const sceneryName = this.querySelector('.left span').textContent.trim();
        
        // 根据景点名称映射到对应的完整文件路径
        const fileMapping = {
            '三潭映月': 'santanyinyue.html/santanyinyue.html.html',  // 在santanyinyue.html文件夹内
            '平湖秋月': '平湖秋月/平湖秋月.html',  // 在平湖秋月文件夹内
            '花港观鱼': '花港观鱼/花港观鱼.html.html',  // 在花港观鱼文件夹内
            '南屏晚钟': 'wanzhong.html',
            '苏堤春晓': 'sudichunxiao.html.html',
            '双峰插云': 'shuangfeng.html',
            '曲苑和风': 'quyuanfenghe.html.html',
            '柳浪闻莺': 'liu.html',
            '雷峰夕照': 'leifeng.html',
            '断桥残雪': 'duanqiao.html'
        };
        
        const fileName = fileMapping[sceneryName];
        
        if (!fileName) {
            alert(`找不到【${sceneryName}】对应的文件！`);
            return;
        }
        
        const confirmJump = confirm(`即将跳转到【${sceneryName}】的闯关页面，确定吗？`);
        
        if (confirmJump) {
            // 使用完整相对路径跳转
            window.location.href = fileName;
        }
    });
});