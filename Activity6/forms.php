<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>

<?php

$name = "";
$username = "";
$password = "";
$address = "";
$country = "";
$zip_code = "";
$email = "";
$sex = "";
$language = [];
$about = "";

?>

<body>

    <p>
        <?php 
        if(empty($_POST['name_var'])==true){
            echo "Name: not provided";
        }
        else {
            $name= $_POST['name_var'];
            echo $name;
        }
        ?>
    </p>

    <p>
        <?php 
        if(empty($_POST['username_var'])==true){
            echo "Username: not provided";
        }
        else {
            $username= $_POST['username_var'];
            echo $username;
        }
        ?>
    </p>

    <p>
        <?php 
        if(empty($_POST['password_var'])==true){
            echo "Password: not provided";
        }
        else {
            $password= $_POST['password_var'];
            echo $password;
        }
        ?>
    </p>

    <p>
        <?php 
        if(empty($_POST['address_var'])==true){
            echo "Address: not provided";
        }
        else {
            $address= $_POST['address_var'];
            echo $address;
        }
        ?>
    </p>

    <p>
        <?php 
        if(empty($_POST['country_var'])==true){
            echo "Country: not provided";
        }
        else {
            $country= $_POST['country_var'];
            echo $country;
        }
        ?>
    </p>

    <p>
        <?php 
        if(empty($_POST['zipcode_var'])==true){
            echo "Zipcode: not provided";
        }
        else {
            $zip_code= $_POST['zipcode_var'];
            echo $zip_code;
        }
        ?>
    </p>

    <p>
        <?php 
        if(empty($_POST['email_var'])==true){
            echo "Email: not provided";
        }
        else {
            $email= $_POST['email_var'];
            echo $email;
        }
        ?>
    </p>

    <p>
        <?php 
        if(empty($_POST['sex_var'])==true){
            echo "Sex: not provided";
        }
        else {
            $sex= $_POST['sex_var'];
            echo $sex;
        }
        ?>
    </p>

    <p>
        <?php 
        if(empty($_POST['language_var'])==true){
            echo "Language: not provided";
        }
        else {
            $language= $_POST['language_var'];
            echo implode(", ", $language);
        }
        ?>
    </p>

    <p>
        <?php 
        if(empty($_POST['textarea_var'])==true){
            echo "About: not provided";
        }
        else {
            $about= $_POST['textarea_var'];
            echo nl2br($about);
        }
        ?>
    </p>

</body>
</html>