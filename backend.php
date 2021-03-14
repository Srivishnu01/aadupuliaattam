<?php
$q = $_REQUEST["id"];
$v = $_REQUEST["v"];
$v2 = $_REQUEST["v2"];
$servername = "localhost";
$username = "id16322116_admin";
$password = "3{Ap%|c8JIFdg{~r";
$dbname = "id16322116_livegames";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
//echo "Connected successfully";
$sql = "SELECT pos,v2 FROM Board_pos WHERE b_id=".$q;
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
       
       if($v=='-1')
       {
          
           echo $row["pos"]." ".$row["v2"];
       }
       else
       {
            $sql = "UPDATE Board_pos
      SET pos=". $v .",v2=". $v2 ." WHERE b_id=".$q;
      $conn->query($sql);
       }
    //echo $row["pos"];
  }
}
else
{
    //echo "not found";
    $sql = "INSERT INTO Board_pos VALUES (".$q.",0,252)";

if ($conn->query($sql) === TRUE) {
  //echo "New record created successfully";
  echo "0 252";
} else {
  //echo "Error: " . $sql . "<br>" . $conn->error;
}


}
//$hint = "";

// Output "no suggestion" if no hint was found or output correct values
$conn->close();
//echo $v;
?>