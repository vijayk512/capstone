<?php

include("../ajax/connection.php");

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$action = $request->action;

if ($action == 'homeget') {
    $query = "Select * from customer_List ORDER BY id desc limit 5";
    $result = mysqli_query($conn, $query);

    $data = array();

    while ($row = mysqli_fetch_array($result)) {
        $data[] = $row;
    }
    if (count($data) == 0) {
        echo '0';
    } else {
        print json_encode($data);
    }
} else if ($action == "customerget") {
    $query = "Select * from customer_List";
    $result = mysqli_query($conn, $query);

    $data = array();

    while ($row = mysqli_fetch_array($result)) {
        $data[] = $row;
    }
    if (count($data) == 0) {
        echo '0';
    } else {
        print json_encode($data);
    }
} else if ($action == "edit") {
    $customerid = $request->uid;
    $query = "Select * from customer_List where id=$customerid";
    $result = mysqli_query($conn, $query);

    $data = array();

    while ($row = mysqli_fetch_array($result)) {
        $data[] = $row;
    }
    print json_encode($data);
} else if ($action == "editcustomer") {
    $customerid = $request->id;
    $query = "update customer_List set email='$request->email',fname='$request->fname',lname='$request->lname'"
            . ",phonenumber='$request->phonenumber',ssn='$request->ssn',address='$request->address'"
            . ",pincode='$request->pincode' where id=$customerid";

    if ($conn->query($query) === TRUE) {
        echo "record updated successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
} else if ($action == "delete") {
    $customerid = $request->id;
    $query = "delete FROM customer_List where id=$customerid";
    if ($conn->query($query) === TRUE) {
        echo "record deleted  successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
} else {
    $query = "insert into customer_List (email,fname,lname,phonenumber,ssn,address,pincode)"
            . " values('$request->email','$request->fname','$request->lname'"
            . ",'$request->phonenumber','$request->ssn','$request->address','$request->pincode')";


    if ($conn->query($query) === TRUE) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}
