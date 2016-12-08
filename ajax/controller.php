<?php

include("../ajax/connection.php");

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$email = $request->email_id;
$pass = $request->password;


$action = $request->action;

if ($action == "getdata") {
    $query = "Select id from user where email_id = '$email' and password = '$pass'";
    $result = mysqli_query($conn, $query);
//echo $result[id]
    $row = (mysqli_fetch_assoc($result));
    echo $row['id'];
} else {
    $query = "Select * from user where email_id = '$email' and password = '$pass'";
    $result = mysqli_query($conn, $query);



    if (mysqli_num_rows($result) == 1) {
        while ($row = mysqli_fetch_assoc($result)) {
            $data = $row;
        }
        $a = array("valid" => "true");
        array_push($data, $a);
        print json_encode($data);
    } else {
        echo "false";
    }
}


//$query="SELECT ID, ITEM, STATUS, CREATED_AT from shop where status like '$status' order by status,id desc";
//$result = mysqli_query($conn, $query);