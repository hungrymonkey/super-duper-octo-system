<?php
	define('DB_SERVER', 'sql109.epizy.com');
	define('DB_USERNAME', 'epiz_29409815');
	define('DB_PASSWORD', '2FpTqpPs5p13pB');
	define('DB_DATABASE', 'epiz_29409815_ShippingBusiness');

	$db = mysql_connect(DB_SERVER,DB_USERNAME,DB_PASSWORD,DB_DATABASE) or die("Error connecting to database");

	session_start();
   
	if($_SERVER["REQUEST_METHOD"] == "POST") {
		// username and password sent from form
		$Username = $_POST['Username'];
		if (empty($Username)) 
		{
 			$error = "You should enter your Username!";
		} else 
		{
			$Password = $_POST['Password'];
			if (empty($Password)) 
			{
				$error = "You should enter your Password!";
			} else 
			{
				$myusername = mysql_real_escape_string($Username);
				$mypassword = mysql_real_escape_string($Password);

				$sql = "SELECT * FROM 'UsernamePasswordEmails' WHERE 'Username' = '$myusername'";
				$result = mysql_query($sql);
				$row = mysql_fetch_array($result);
				$active = $row['active'];
      				$count = mysql_num_rows($result);
				if (empty($count))
				{
					$count = 0;
				}

				// If result did not matched $myusername, table row must be 1 row
				if($count == 1) 
				{
					$sql = "SELECT * FROM 'UsernamePasswordEmails' WHERE 'Username' = '$myusername' and 'Password' = '$mypassword'";
					$result = mysql_query($sql);
					$row = mysql_fetch_array($result);
					$active = $row['active'];
      					$count = mysql_num_rows($result);
					if (empty($count))
					{
						$count = 0;
					}

					// If result matched $myusername and $mypassword, table row must be 1 row
					if($count == 1) 
					{
						session_register("myusername");
						$_SESSION['login_user'] = $myusername;

						header("location: BookTrip.php");
					} else 
					{
						$error = "Your Login Name or Password is invalid";
					}
				} else 
				{	
					$error = "Your Username is not registered.  Please click on Register link and Register your account!";
				}
			}
		}
	}
?>
<HTML>
	<HEAD>
		<TITLE>MasterCardProject 2021 Login Page</TITLE>
	</HEAD>
   
   	<BODY>
		<b>Login</b>
		<br /><br /><br />
		If you have not registered yet please click on <a href="Register.php">Register</a>
		<br /><br /><br />
		<FORM action = "" method = "post">
			<label>Username  :</label><input type = "text" name = "Username"/><br /><br />
			<label>Password  :</label><input type = "password" name = "Password"/><br/><br />
			<input type = "submit" value = " Submit "/><br />
		</FORM>
		<?php
			echo $error;
		?>
	</BODY>
</HTML>
