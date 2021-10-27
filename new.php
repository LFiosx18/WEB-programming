<?php
session_start();
$start = microtime(true);
$correctR = array(1, 1.5, 2, 2.5, 3);
$r = floatval(htmlspecialchars($_GET["r"]));
$x = floatval(htmlspecialchars($_GET["x"]));
$y = floatval(htmlspecialchars($_GET["y"]));
date_default_timezone_set("Europe/Moscow");
$timeResponse = date("H:i:s");
$answer = "";
$error_msg = "";

//checking
if (!is_null($r) && !is_null($x) && !is_null($y)) {
    if ($r == 0 && $x == 0 && $y == 0) {
        $error_msg = "Поля не могут быть пустыми!";
    } else {
        if ($x < -3 || $x > 5 ) {
            $error_msg  = "X некорректен!";
        }
        if (!in_array($r, $correctR)) {
            $error_msg  = "R некорректен!";
        }
        if ($y < -5 || $y > 5) {
            $error_msg  = "Y некорректен!";
        }
    }
    $timeNow = strval(number_format(microtime(true) - $start, 10, ".", "")*1000) . 'ms';
    $result = array($x, $y, $r, $answer, $timeNow, $timeResponse, $error_msg);
    if (!isset($_SESSION['answers'])) {
        $_SESSION['answers'] = array();
    }
    array_push($_SESSION['answers'], $result);

    if($error_msg != ""){
        print_r('<tr><td><p>'.$error_msg.'<p></td></tr>');
    }
    else {
        if (($x >= 0 && $y >= 0 && $y <= $r/2 && $x<=$r) ||
            ($x <= 0 && $y >= 0 && $y <= sqrt($r*$r - $x*$x)) ||
            ($x >= 0 && $y <= 0 && $y >= $x*2-$r)) {
            $answer = "Yes";
        }else{
            $answer = "No";
        }
        print_r('<tr>
                        <td><p>' . $x . '</p></td>
                        <td><p>' . $y . '</p></td>
                        <td><p>' . $r . '</p></td>
                        <td><p>' . $timeResponse . '</p></td>
                        <td><p>' . $timeNow . '</p></td>
                        <td><p>' . $answer . '</p></td>
                        </tr>');
    }
}

