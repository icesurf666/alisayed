<?php

    // Подключение
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    require 'phpmailer/PHPMailer.php';
    require 'phpmailer/Exception.php';
    require 'phpmailer/SMTP.php';

    //Переменные
    $name = $_POST['name'];
    $phone = $_POST['phone'];
    $form = $_POST['form'];

    //Ининциализация
    $mail = new PHPMailer(true);
    $mail->CharSet = 'UTF-8';

    try {

        // Настройки сервера
        $mail->SMTPDebug = 0;
        $mail->isSMTP();
        $mail->Host = 'smtp.mail.ru';
        $mail->SMTPAuth = true;
        $mail->Username = ''; // логин
        $mail->Password = ''; // пароль
        $mail->SMTPSecure = 'ssl'; 
        $mail->Port = 465;

        // Адреса
        $mail->setFrom('info@noreply.ru', 'Название'); // От кого
        $mail->addAddress(''); // Кому

        // Письмо
        $mail->isHTML(true); 
        $mail->Subject = 'Заявка';
        $mail->Body = "<b>Имя:</b><br>".$name."<br><br><b>Телефон:</b><br>".$phone."<br><br><b>Форма:</b><br>".$form;

        $mail->send();

        header("Location: ../thanks.html");
    } catch (Exception $e) {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }

?>