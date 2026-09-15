(function () {
  var toggle = document.getElementById('nav-toggle');
  var nav = document.getElementById('main-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
      toggle.setAttribute('aria-label', isOpen ? '메뉴 닫기' : '메뉴 열기');
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', '메뉴 열기');
      });
    });
  }

  var yearEl = document.getElementById('footer-year');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var data = new FormData(form);
      var name = data.get('name') || '';
      var company = data.get('company') || '';
      var email = data.get('email') || '';
      var phone = data.get('phone') || '';
      var inquiryType = data.get('inquiryType') || '';
      var message = data.get('message') || '';

      var subject = '[나르샤팜 문의] ' + inquiryType + ' - ' + name;
      var body =
        '이름: ' + name + '\n' +
        '회사명: ' + company + '\n' +
        '이메일: ' + email + '\n' +
        '연락처: ' + phone + '\n' +
        '문의 유형: ' + inquiryType + '\n\n' +
        message;

      // [TBD] 수신 이메일 주소 확정 필요 — 확정 전까지는 mailto 폴백만 제공
      var mailto = 'mailto:?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
      window.location.href = mailto;
    });
  }
})();
