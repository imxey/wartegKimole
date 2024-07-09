<?php
require_once dirname(__FILE__) . '/midtrans-php-master/Midtrans.php'; 

// Konfigurasi Midtrans
\Midtrans\Config::$serverKey = 'SB-Mid-server-vtSRpU_F8KiKbH2JhjGVJeNv';
\Midtrans\Config::$isProduction = false; // Gunakan true untuk production
\Midtrans\Config::$isSanitized = true;
\Midtrans\Config::$is3ds = true;

header('Content-Type: application/json');


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    if (isset($data['finalPrice'])) {
        $finalPrice = $data['finalPrice'];
    } else {
        echo "Error: finalPrice tidak ada dalam data POST";
    }
    if (isset($data['namaBuyerValue'])) {
        $namaBuyerValue = $data['namaBuyerValue'];
    } else {
        echo "Error: namaBuyerValue tidak ada dalam data POST";
    }
    if (isset($data['emailBuyerValue'])) {
        $emailBuyerValue = $data['emailBuyerValue'];
    } else {
        echo "Error: emailBuyerValue tidak ada dalam data POST";
    }
    if (isset($data['alamatBuyerValue'])) {
        $alamatBuyerValue = $data['alamatBuyerValue'];
    } else {
        echo "Error: alamatBuyerValue tidak ada dalam data POST";
    }
    if (isset($data['noBuyerValue'])) {
        $noBuyerValue = $data['noBuyerValue'];
    } else {
        echo "Error: noBuyerValue tidak ada dalam data POST";
    }
}



$params = array(
    'transaction_details' => array(
        'order_id' => rand(),
        'gross_amount' => $finalPrice, 
    ),
    'customer_details' => array(
        'first_name' => $namaBuyerValue,
        'alamat' => $alamatBuyerValue,
        'email' => $emailBuyerValue,
        'phone' => $noBuyerValue,
    ),
);


$snapToken = \Midtrans\Snap::getSnapToken($params);
echo $snapToken;

?>