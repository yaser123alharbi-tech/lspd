// التحقق من تسجيل الدخول في كل صفحة
document.addEventListener('DOMContentLoaded', function() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    
    if (!isLoggedIn || isLoggedIn !== 'true') {
        // إذا لم يكن مسجل دخول، توجيه إلى صفحة التسجيل
        window.location.href = 'login.html';
        return;
    }
    
    // عرض اسم المستخدم إذا كان موجوداً
    const username = localStorage.getItem('username');
    if (username) {
        // يمكنك إضافة اسم المستخدم في واجهة المستخدم
        console.log('مرحباً ' + username);
    }
});

// التحقق من الصلاحيات
document.addEventListener('DOMContentLoaded', function() {
    const userRole = localStorage.getItem('userRole');
    
    // إخفاء الأقسام حسب الصلاحيات
    if (userRole === 'user') {
        // إخفاء أقسام الإدارة
        document.querySelectorAll('.admin-only').forEach(el => {
            el.style.display = 'none';
        });
    }
    
    if (userRole === 'officer') {
        // إخفاء أقسام المدير
        document.querySelectorAll('.super-admin-only').forEach(el => {
            el.style.display = 'none';
        });
    }
});

// التحقق من انتهاء الجلسة بعد وقت معين
const loginTime = localStorage.getItem('loginTime');
if (loginTime) {
    const currentTime = new Date().getTime();
    const sessionDuration = 2 * 60 * 60 * 1000; // ساعتين
    
    if (currentTime - loginTime > sessionDuration) {
        // انتهت الجلسة
        logout();
    }
} else {
    // حفظ وقت التسجيل
    localStorage.setItem('loginTime', new Date().getTime());
}