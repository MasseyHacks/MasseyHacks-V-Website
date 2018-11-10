<?php
include('MailChimp.php');
require_once('config.php');

use \DrewM\MailChimp\MailChimp;

if($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $MailChimp = new MailChimp($_CONFIG["mailchip_key"]);

        $list_id = $_CONFIG["mailchip_list_id"];

        $subscriber_hash = $MailChimp->subscriberHash($email);
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
