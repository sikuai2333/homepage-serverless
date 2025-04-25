// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 导航菜单切换
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }

    // 点击导航链接时关闭移动端菜单
    const navItems = document.querySelectorAll('.nav-links ul li a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
            }
        });
    });

    // 滚动时导航栏效果 - 增强版
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        const scrollPosition = window.scrollY;
        
        // 添加渐变效果
        header.classList.toggle('scrolled', scrollPosition > 50);
        
        // 根据滚动位置调整导航栏透明度
        if (scrollPosition > 100) {
            const opacity = Math.min(0.95, 0.8 + scrollPosition / 1000);
            header.style.backgroundColor = `rgba(255, 255, 255, ${opacity})`;
            header.style.boxShadow = `0 2px 10px rgba(0, 0, 0, ${opacity * 0.2})`;
        } else {
            header.style.backgroundColor = '';
            header.style.boxShadow = '';
        }
        
        // 高亮当前滚动位置对应的导航项
        highlightNavOnScroll();
    });
    
    // 根据滚动位置高亮导航项
    function highlightNavOnScroll() {
        const sections = document.querySelectorAll('section');
        const navItems = document.querySelectorAll('.nav-links ul li a');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop - 100 && 
                window.scrollY < sectionTop + sectionHeight - 100) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active-nav');
            if (item.getAttribute('href') === `#${currentSection}`) {
                item.classList.add('active-nav');
            }
        });
    }

    // 表单提交处理
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 获取表单数据
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // 在实际应用中，这里应该发送数据到服务器
            // 由于这是一个静态网站，我们只显示一个成功消息
            alert('感谢您的留言！在实际部署中，这里会将消息发送到服务器。');
            
            // 重置表单
            contactForm.reset();
        });
    }
    
    // GitHub仓库获取功能
    async function fetchGitHubRepos(username) {
        try {
            // 使用提供的GitHub用户名
            const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=3`);
            if (!response.ok) {
                throw new Error('GitHub API请求失败');
            }
            
            const repos = await response.json();
            displayGitHubRepos(repos);
        } catch (error) {
            console.error('获取GitHub仓库失败:', error);
            // 使用默认数据作为后备
            useDefaultRepoData();
        }
    }
    
    // 页面加载时获取GitHub仓库数据
    fetchGitHubRepos('sikuai2333');
    
    function displayGitHubRepos(repos) {
        const projectsGrid = document.querySelector('.projects-grid');
        if (!projectsGrid || repos.length === 0) return;
        
        // 清空现有内容
        projectsGrid.innerHTML = '';
        
        // 添加仓库卡片
        repos.forEach((repo, index) => {
            const card = document.createElement('div');
            card.className = 'project-card github-repo-card';
            card.setAttribute('data-parallax', `0.${index + 1}`);
            
            // 语言颜色映射
            const languageColors = {
                JavaScript: '#f1e05a',
                TypeScript: '#2b7489',
                Python: '#3572A5',
                Java: '#b07219',
                HTML: '#e34c26',
                CSS: '#563d7c',
                'C++': '#f34b7d',
                C: '#555555',
                Ruby: '#701516',
                Go: '#00ADD8',
                PHP: '#4F5D95'
            };
            
            const languageColor = languageColors[repo.language] || '#858585';
            
            card.innerHTML = `
                <div class="project-image">
                    <img src="https://opengraph.githubassets.com/1/${repo.owner.login}/${repo.name}" 
                         alt="${repo.name}" onerror="this.src='https://via.placeholder.com/350x200/e3e3e3/333333?text=${repo.name}'">
                </div>
                <div class="project-info">
                    <h3>${repo.name}</h3>
                    <p>${repo.description || '这是一个GitHub仓库项目'}</p>
                    <div class="project-tags">
                        ${repo.topics ? repo.topics.slice(0, 3).map(topic => `<span>${topic}</span>`).join('') : ''}
                    </div>
                    <div class="github-repo-stats">
                        <div class="github-repo-stat"><i class="fas fa-star"></i> <span>${repo.stargazers_count}</span></div>
                        <div class="github-repo-stat"><i class="fas fa-code-branch"></i> <span>${repo.forks_count}</span></div>
                        <div class="github-repo-stat">
                            <i class="fas fa-code" style="color: ${languageColor};"></i> 
                            <span>${repo.language || 'N/A'}</span>
                        </div>
                    </div>
                    <div class="project-links">
                        ${repo.homepage ? `<a href="${repo.homepage}" class="btn btn-sm" target="_blank"><i class="fas fa-external-link-alt"></i> 查看演示</a>` : ''}
                        <a href="${repo.html_url}" class="btn btn-sm" target="_blank"><i class="fab fa-github"></i> 源代码</a>
                    </div>
                </div>
            `;
            
            projectsGrid.appendChild(card);
        });
        
        // 重新初始化3D卡片效果
        new Card3DEffect('.project-card');
    }
    
    function useDefaultRepoData() {
        // 如果API请求失败，使用默认数据，自行修改
        const username = 'sikuai2333'; // 确保使用正确的GitHub用户名
        const defaultRepos = [
            {
                name: '近期仓库 1',
                description: '这是您近期更新的GitHub仓库，展示您的最新技术成果和项目进展。',
                language: 'JavaScript',
                topics: ['React', 'TypeScript', 'GraphQL'],
                stargazers_count: 24,
                forks_count: 8,
                html_url: `https://github.com/${username}/近期仓库-1`
            },
            {
                name: '近期仓库 2',
                description: '这是您近期更新的另一个GitHub仓库，展示您的技术多样性和项目经验。',
                language: 'Vue',
                topics: ['Vue.js', 'Node.js', 'MongoDB'],
                stargazers_count: 16,
                forks_count: 5,
                html_url: `https://github.com/${username}/近期仓库-2`
            },
            {
                name: '近期仓库 3',
                description: '这是您的第三个近期GitHub仓库，展示您的持续学习和技术创新能力。',
                language: 'Python',
                topics: ['Python', 'Django', 'PostgreSQL'],
                stargazers_count: 32,
                forks_count: 12,
                html_url: `https://github.com/${username}/近期仓库-3`
            }
        ];
        
        // 转换为与API响应格式相似的结构
        const formattedRepos = defaultRepos.map(repo => ({
            ...repo,
            owner: { login: username }, // 使用变量确保一致性
            homepage: null
        }));
        
        displayGitHubRepos(formattedRepos);
    }
    
    // 尝试获取GitHub仓库数据
    // 注意：这里需要替换为实际的GitHub用户名
    // fetchGitHubRepos('your-github-username');
    
    // 由于这是演示，我们使用默认数据
    setTimeout(() => {
        useDefaultRepoData();
    }, 1000);

    // 平滑滚动效果
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // 减去导航栏高度
                    behavior: 'smooth'
                });
            }
        });
    });

    // 项目卡片悬停效果
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // 技能进度条动画
    const skillLevels = document.querySelectorAll('.skill-level');
    const animateSkills = () => {
        skillLevels.forEach(level => {
            const width = level.style.width;
            level.style.width = '0';
            setTimeout(() => {
                level.style.width = width;
                level.style.transition = 'width 1s ease-in-out';
            }, 100);
        });
    };

    // 使用Intersection Observer检测技能部分是否可见
    const skillsSection = document.querySelector('#skills');
    if (skillsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkills();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(skillsSection);
    }
});