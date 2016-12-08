<header ng-include="'pages/header.html'" id="navigation"></header>
<?php
if (isset($_REQUEST['type'])) {
    $action = $_REQUEST['type'];
} else {
    $action = "";
}
?>
<div class="container page-slide">
    <div class="row heading">
        <div class="col-sm-8">       <h2>CRM Users List</h2>
        </div>
        <div class="col-sm-4">
            <a href="#/addUser" class="addcontent">Add Users</a>
        </div>

    </div>
    <?php
    if ($action == "view") {
        ?>
        <div class="row datalist">
            <div class="col-sm-6"><label>Name</label></div>
            <div class="col-sm-6"><p></p></div>
        </div>
        <div class="row datalist">
            <div class="col-sm-6"><label>Email</label></div>
            <div class="col-sm-6"><p></p></div>
        </div>
        <div class="row datalist">
            <div class="col-sm-6"><label>SSN</label></div>
            <div class="col-sm-6"><p></p></div>
        </div>
        <?php
    } else {
        ?>

        <div class="row datalist">

            <div class="col-sm-2"><label>Name</label></div>
            <div class="col-sm-2"><label>Email</label></div>
            <div class="col-sm-2"><label>Phone Number</label></div>
            <div class="col-sm-2"><label>SSN</label></div>
            <div class="col-sm-2"><label>Role</label></div>
            <div class="col-sm-2"><label>Action</label></div>
        </div>

        <div class="row datarepeat" ng-repeat="crmuser in crmuserget">
            <div class="col-sm-2"><p>{{crmuser.fname}} {{crmuser.lname}}</p></div>
            <div class="col-sm-2"><p>{{crmuser.email_id}}</p></div>
            <div class="col-sm-2"><p>{{crmuser.phonenumber}}</p></div>
            <div class="col-sm-2"><p>{{crmuser.ssn}}</p></div>
            <div class="col-sm-2"><p>{{crmuser.user_type}}</p></div>
            <div class="col-sm-2"><a href="#/addCRMuser/{{crmuser.id}}/view">view</a>
                <a href="#/addCRMuser/{{crmuser.id}}/view">edit</a>
                <a>delete</a></div>
        </div>
    <?php } ?>
</div>