(function () {
    const routeByText = {
        'asosiy': 'mentor-dashboard.html',
        'm енинг kurslarim': 'mentor-courses.html',
        'kurslarim': 'mentor-courses.html',
        'm еning kurslarim': 'my-courses.html',
        'mening kurslarim': 'my-courses.html',
        'natijalarim': 'results.html',
        "o'quv yo'li": 'learning-path.html',
        "o'quvchilar": 'students.html',
        'seminarlar': 'seminars.html',
        'vazifalar': 'tasks.html',
        'sozlamalar': 'admin.html',
        'settings': 'admin.html',
        'ai tutor': 'student-dashboard.html',
        'community': 'students.html'
    };

    document.querySelectorAll('a[href="#"]').forEach(function (link) {
        const text = (link.textContent || '').replace(/\s+/g, ' ').trim().toLowerCase();
        let target = routeByText[text];

        if (!target) {
            if (text.includes('m еning kurslarim') || text.includes('mening kurslarim')) target = 'my-courses.html';
            if (text.includes('kurslarim')) target = 'mentor-courses.html';
            if (text.includes('bosh sahifa') || text === 'home') target = 'home.html';
        }

        if (target) {
            link.setAttribute('href', target);
        }
    });

    let selectedRole = null;
    document.querySelectorAll('.role-btn').forEach(function (button) {
        button.addEventListener('click', function () {
            const card = button.closest('[data-role]');
            if (card) selectedRole = card.dataset.role;
        });
    });

    if (document.querySelector('#login-form-container')) {
        window.handleLogin = function (event) {
            event.preventDefault();
            const routes = {
                student: 'student-dashboard.html',
                teacher: 'mentor-dashboard.html',
                admin: 'admin.html'
            };
            const overlay = document.getElementById('welcome-overlay');
            const welcomeMessage = document.getElementById('welcome-message');
            const username = document.getElementById('username');

            if (overlay && welcomeMessage) {
                welcomeMessage.textContent = 'Xush kelibsiz, ' + ((username && username.value) || 'Foydalanuvchi') + '!';
                overlay.classList.add('active');
            }

            window.setTimeout(function () {
                window.location.href = routes[selectedRole] || 'student-dashboard.html';
            }, 900);
        };
    }

    document.querySelectorAll('button, [role="button"]').forEach(function (button) {
        button.addEventListener('click', function () {
            const text = (button.textContent || '').replace(/\s+/g, ' ').trim().toLowerCase();
            const directRoutes = {
                'barchasini ko\u2018rish': 'tasks.html',
                "barchasini ko'rish": 'tasks.html',
                'kursni boshlash': 'learning-path.html',
                'darsni davom ettirish': 'learning-path.html',
                'jami natijalar': 'results.html'
            };
            if (directRoutes[text] && button.tagName === 'BUTTON') {
                window.location.href = directRoutes[text];
            }
        });
    });
})();
