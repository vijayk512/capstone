<?php

include("../ajax/connection.php");

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$action = $request->action;

if ($action == 'get') {
    $query = "Select * from user";
    $result = mysqli_query($conn, $query);

//    $row = mysqli_fetch_all($result, MYSQLI_ASSOC);
//    cho $row;

    $data = array();

    while ($row = mysqli_fetch_array($result)) {
        $data[] = $row;
    }
    print json_encode($data);
} else if ($action == 'edit') {

    $userid = $request->uid;
    $query = "Select * from user where id=$userid";
    $result = mysqli_query($conn, $query);

//    $row = mysqli_fetch_all($result, MYSQLI_ASSOC);
//    cho $row;

    $data = array();

    while ($row = mysqli_fetch_array($result)) {
        $data[] = $row;
    }
    print json_encode($data);
} else if ($action == 'editCrmUser') {
    $customerid = $request->id;
    $query = "update user set email_id='$request->email_id',fname='$request->fname',lname='$request->lname'"
            . ",phonenumber='$request->phonenumber',ssn='$request->ssn',address='$request->address'"
            . ",pincode='$request->pincode', role='$request->role', state='$request->state' where id=$customerid";

    if ($conn->query($query) === TRUE) {
        echo "record updated successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
} else if ($action == 'homepage') {
    $query = "SELECT * FROM user ORDER BY id desc limit 5 ";
    $result = mysqli_query($conn, $query);

//    $row = mysqli_fetch_all($result, MYSQLI_ASSOC);
//    cho $row;

    $data = array();

    while ($row = mysqli_fetch_array($result)) {
        $data[] = $row;
    }
    print json_encode($data);
} else if ($action == 'delete') {
    $crmid = $request->id;
    $query = "delete FROM user where id=$crmid";
    if ($conn->query($query) === TRUE) {
        echo "record deleted  successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
} else {
    $seed = str_split('abcdefghijklmnopqrstuvwxyz'
            . 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
            . '0123456789!@#$%^&*()'); // and any other characters
    shuffle($seed); // probably optional since array_is randomized; this may be redundant
    $rand = '';
    foreach (array_rand($seed, 8) as $k) {
        $rand .= $seed[$k];
    }

    $password = $rand;

    $query = "insert into user (email_id,password,fname,lname,phonenumber,ssn,address,pincode,state,user_type)"
            . " values('$request->email_id','$password','$request->fname','$request->lname'"
            . ",'$request->phonenumber','$request->ssn','$request->address','$request->pincode'"
            . ",'$request->state','$request->user_type')";

    if ($conn->query($query) === TRUE) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}