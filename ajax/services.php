<?php

include("../ajax/connection.php");

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$action = $request->action;

if ($action == "getservices") {
    $query = "Select ci.*,cl.fname,cl.lname from customer_item_service as ci JOIN customer_List as cl ON"
            . " ci.customer_itemlist_id = cl.id";
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
} else if ($action == "clist") {
    $query = "Select id,fname,lname from customer_List";
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
} else if ($action == "addservices") {
    $userlogin = $request->userlogin;
    
    $query1 = "Select id from user where email_id = '$userlogin'";
    $result1 = mysqli_query($conn, $query1);
//echo $result[id]
    $row = (mysqli_fetch_assoc($result1));
    $loggedinid = $row['id'];
    
    $query = "insert into customer_item_service (customer_itemlist_id,services_date,feedback,serviceprovider)"
            . " values('$request->customer_itemlist_id','$request->services_date','$request->feedback', '$loggedinid')";

    if ($conn->query($query) === TRUE) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
} else if ($action == "updateservices") {
    
    $servicesid = $request->uid;
//    $query = "Select ci.*,cl.id as clid from customer_item_service as ci JOIN customer_List as cl ON"
//            . " ci.customer_itemlist_id = cl.id where ci.id = $servicesid";

    $query = "Select * from customer_item_service where id = $servicesid";

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
} else if ($action == "editservices") {
    
    $userlogin = $request->userlogin;
    
    $query1 = "Select id from user where email_id = '$userlogin'";
    $result1 = mysqli_query($conn, $query1);
    //echo $result[id]
    $row = (mysqli_fetch_assoc($result1));
    $loggedinid = $row['id'];
    
    $servicesid = $request->id;
    $query = "update customer_item_service set customer_itemlist_id='$request->customer_itemlist_id'"
            . ",services_date='$request->services_date',feedback='$request->feedback'"
            . ",serviceprovider='$loggedinid' where id=$servicesid";

    if ($conn->query($query) === TRUE) {
        echo "record updated successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
} else if ($action == "delete") {
    $servicesid = $request->id;
    $query = "delete FROM customer_item_service where id=$servicesid";
    if ($conn->query($query) === TRUE) {
        echo "services deleted  successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
} else if ($action == "getservicedetails") {
    $customerid = $request->uid;
    $query = "Select ci.*, u.fname, u.lname from customer_item_service as ci JOIN user as u ON ci.serviceprovider = u.id where ci.customer_itemlist_id = $customerid";
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
}