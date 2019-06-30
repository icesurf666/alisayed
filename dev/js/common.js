// PHONE MASK //
jQuery(function(e) {
  e(".phone").mask("+7 (999) 999-99-99")
});

// VALIDATE FORM //
$(document).ready(function () {
  $("form").submit(function () {
    var clikedForm = $(this);
    if (clikedForm.find("[name='name']").val() == '') {
      alert('Введите имя');
      return false;
    }
    if (clikedForm.find("[name='phone']").val() == '') {
      alert('Введите телефон');
      return false;
    }
    if (clikedForm.find("[name='email']").val() == '') {
      alert('Введите e-mail');
      return false;
    }
  });
});