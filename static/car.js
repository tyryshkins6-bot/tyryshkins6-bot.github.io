document.addEventListener("DOMContentLoaded", function() {
    const services = document.querySelectorAll('.service');
    const workItems = document.querySelectorAll('.work-item');
    const modal = document.getElementById('service-info-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalPrice = document.getElementById('modal-price');

    // Скроллинг для смены картинок
    window.addEventListener('scroll', function() {
        services.forEach(service => {
            const rect = service.getBoundingClientRect();
            if (rect.top <= window.innerHeight && rect.bottom >= 0) {
                // Смена картинки при попадании в область видимости
                const img = service.querySelector('img');
                img.src = img.src.replace('/images/', '/images/visible/');
            }
        });
    });

    // Клик по работам для показа подробностей
    workItems.forEach(item => {
        item.addEventListener('click', function() {
            const serviceId = item.dataset.service;
            showServiceInfo(serviceId);
        });
    });

    function showServiceInfo(serviceId) {
        // Пример подробной информации
        if (serviceId === "service-1") {
            modalTitle.innerText = "Антигравийная защита";
            modalDescription.innerText = "Антигравийная защита автомобиля с использованием высококачественных пленок.";
            modalPrice.innerText = "Цена: 20,000 руб.";
        } else if (serviceId === "service-2") {
            modalTitle.innerText = "Техническое обслуживание";
            modalDescription.innerText = "Полное техническое обслуживание вашего автомобиля, включая диагностику и замену жидкостей.";
            modalPrice.innerText = "Цена: 5,000 руб.";
        }
        // Добавить информацию для остальных услуг

        modal.style.display = "flex";
    }

    closeModalBtn.addEventListener('click', function() {
        modal.style.display = "none";
    });
});
