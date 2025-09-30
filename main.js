document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const navbar = document.getElementById('navbar');
  const toTopBtn = document.getElementById('toTop');
  const contactForm = document.getElementById('contactForm');
  const formMsg = document.getElementById('formMsg');
  const galleryGrid = document.getElementById('galleryGrid');
  const langToggle = document.getElementById('langToggle');
  const btn = document.getElementById('mobileMenuBtn');

  // تحقق من وجود العناصر قبل إضافة المستمعين
  if(document.getElementById("whatsapp")){
    document.getElementById("whatsapp").addEventListener("click", function () {
      const phone = "966558107645"; 
      const message = encodeURIComponent("أهلاً وسهلاً 👋، مؤسسة تركيب زجاج سيكوريت بالرياض 🇸🇦، أود الاستفسار عن خدماتكم 🌟");
      window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
    });
  }

  if(btn && mobileMenu){
    let open = false;
    btn.addEventListener('click', () => {
      open = !open;
      if (open) {
        mobileMenu.classList.remove('-translate-x-full');
        mobileMenu.classList.add('translate-x-0');
      } else {
        mobileMenu.classList.remove('translate-x-0');
        mobileMenu.classList.add('-translate-x-full');
      }
      const spans = btn.querySelectorAll('span');
      if(spans.length === 3){
        if(open){
          spans[0].classList.add('rotate-45', 'translate-y-2');
          spans[1].classList.add('opacity-0');
          spans[2].classList.add('-rotate-45', '-translate-y-2');
        } else {
          spans[0].classList.remove('rotate-45', 'translate-y-2');
          spans[1].classList.remove('opacity-0');
          spans[2].classList.remove('-rotate-45', '-translate-y-2');
        }
      }
    });
  }

  if(menuBtn && mobileMenu){
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  if(window && navbar){
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) navbar.classList.add('shadow-lg');
      else navbar.classList.remove('shadow-lg');
    });
  }

  if(toTopBtn){
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) toTopBtn.classList.remove('hidden');
      else toTopBtn.classList.add('hidden');
    });
    toTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  if(langToggle){
    let currentLang = 'ar';
    langToggle.addEventListener('click', () => {
      currentLang = currentLang === 'ar' ? 'en' : 'ar';
      document.documentElement.setAttribute('lang', currentLang);
      document.documentElement.setAttribute('dir', currentLang === 'ar' ? 'rtl' : 'ltr');
      langToggle.querySelector('i').classList.toggle('fa-globe');
      langToggle.querySelector('i').classList.toggle('fa-earth-americas');
    });
  }

  if(galleryGrid){
    const galleryImages = [
      'images/1.jpg','images/2.jpg','images/3.jpg','images/4.jpg',
      'images/5.jpg','images/6.jpg','images/7.jpg','images/8.jpg',
    ];
    galleryImages.forEach(src => {
      const div = document.createElement('div');
      div.className = 'overflow-hidden rounded-xl shadow hover:shadow-xl transition';
      div.innerHTML = `<img src="${src}" alt="عمل من أعمالنا" class="w-full h-64 object-cover hover:scale-105 transition duration-500" />`;
      galleryGrid.appendChild(div);
    });
  }

  if(contactForm && formMsg){
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(contactForm).entries());
      formMsg.textContent = 'جاري الإرسال...';
      formMsg.classList.remove('hidden', 'text-green-600', 'text-red-600');
      formMsg.classList.add('text-gray-600');
      setTimeout(() => {
        formMsg.textContent = 'تم الإرسال بنجاح! سنتواصل معك في أقرب وقت ممكن.';
        formMsg.classList.remove('text-gray-600');
        formMsg.classList.add('text-green-600');
        contactForm.reset();
      }, 1000);
    });
  }

});
