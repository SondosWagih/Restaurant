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
                    this.reset();
                    return; // أضف هذا السطر
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