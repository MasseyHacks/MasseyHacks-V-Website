<?php
include('MailChimp.php');
use \DrewM\MailChimp\MailChimp;

if($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $MailChimp = new MailChimp('9a3694a4119716258581ccb8f0f0a6ad-us17');

        $list_id = 'f7aab2d91d';

        $subscriber_hash = $MailChimp->subscriberHash($subscriberMail);
        $result = $MailChimp->get("lists/$list_id/members/$subscriber_hash");
        if($result['status'] == '404') {

            $result = $MailChimp->post("lists/$list_id/members", [
                'email_address' => $email,
                'status' => 'subscribed',
            ]);

            if ($MailChimp->success()) {
                echo 'success';
            } else {
                echo $MailChimp->getLastError();
            }
        } else {
            echo 'asubbed';
        }
    } else {
        echo 'invalid';
    }
}
?>