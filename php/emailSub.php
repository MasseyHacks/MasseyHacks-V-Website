<?php
include('MailChimp.php');
use \DrewM\MailChimp\MailChimp;

if($_SERVER["REQUEST_METHOD"] == "POST") {
    $MailChimp = new MailChimp('9a3694a4119716258581ccb8f0f0a6ad-us17');

    $email = $_POST['email'];

    $list_id = 'f7aab2d91d';

    $result = $MailChimp->post("lists/$list_id/members", [
        'email_address' => $email,
        'status'        => 'subscribed',
    ]);

    print_r($result);
}
?>