document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('#contact form');
    
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            
            // تغيير نص الزر أثناء الإرسال
            submitButton.innerHTML = 'جاري الإرسال...';
            submitButton.disabled = true;

            // شريط التقدم
            const progressBar = document.createElement('div');
            progressBar.style.cssText = `
            height: 5px;
            background: var(--primary-color);
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            transition: width 0.1s linear;
            z-index: 9999;
            `;
            document.body.prepend(progressBar);

            // تحديث الشريط
            let width = 0;
            const interval = setInterval(() => {
            width += 1;
            progressBar.style.width = `${width}%`;
            if (width >= 100) {
                clearInterval(interval);
            }
            }, 50);
            
            fetch(this.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    // لا تحاول تحويل الرد إلى JSON إذا لم يكن متوقعاً
                    Swal.fire({
                        title: 'تم الإرسال بنجاح!',
                        text: 'شكراً لتواصلك معنا، سنرد عليك في أقرب وقت.',
                        icon: 'success',
                        confirmButtonText: 'حسناً',
                        confirmButtonColor: '#92400e',
                        background: '#fef3c7',
                        color: '#78350f',
                        iconColor: '#92400e'
                    });

                    let seconds = 5;
                    const counter = document.getElementById('countdown');

                    if (counter) {
                    counter.textContent = seconds; // عشان يبان الرقم 5 من البداية

                    const countdown = setInterval(() => {
                        seconds--;
                        if (seconds >= 0) {
                        counter.textContent = seconds;
                        }
                        if (seconds === 0) {
                        clearInterval(countdown); // نوقف العداد
                        }
                    }, 1000);
                    }

                    this.reset();
                    setTimeout(function() {
                        window.location.href = "index.html";
                    }, 5000);
                    return;
                }
                throw new Error('Network response was not ok');
            })
            .catch(error => {
                console.error('Error:', error);
                // تنبيه الفشل مع ألوان مخصصة
                Swal.fire({
                    title: 'فشل الإرسال!',
                    text: 'تعذر إرسال رسالتك. (' + error.message + ')',
                    icon: 'error',
                    confirmButtonText: 'حسناً',
                    confirmButtonColor: '#b45309', // لون كهرماني متوسط
                    background: '#fef3c7',
                    color: '#78350f',
                    iconColor: '#b45309'
                });
            })
            .finally(() => {
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            });
        });
    }
});