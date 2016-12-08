<?php

include("../ajax/connection.php");

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$action = $request->action;

if ($action == 'getlist') {
    $query = "Select * from itemlist";
    $result = mysqli_query($conn, $query);

//    $row = mysqli_fetch_all($result, MYSQLI_ASSOC);
//    cho $row;

    $data = array();

    while ($row = mysqli_fetch_array($result)) {
        $data[] = $row;
    }
    if (count($data) == 0) {
        echo '0';
    } else {
        print json_encode($data);
    }
} else if ($action == "addItem") {
    $query = "insert into itemlist (item_code,quantity,price,description)"
            . " values('$request->item_code','$request->quantity','$request->price'"
            . ",'$request->description')";


    if ($conn->query($query) === TRUE) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
} else if ($action == "edit") {
    $customerid = $request->uid;
    $query = "Select * from itemlist where id=$customerid";
    $result = mysqli_query($conn, $query);

    $data = array();

    while ($row = mysqli_fetch_array($result)) {
        $data[] = $row;
    }
    print json_encode($data);
} else if ($action == "editItem") {
    $customerid = $request->id;
    $query = "update itemlist set item_code='$request->item_code',quantity='$request->quantity'"
            . ",price='$request->price',description='$request->description' where id=$customerid";

    if ($conn->query($query) === TRUE) {
        echo "record updated successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
} else if($action == "delete"){
    $customerid = $request->id;
    $query = "delete FROM itemlist where id=$customerid";
    if ($conn->query($query) === TRUE) {
        echo "record deleted  successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}