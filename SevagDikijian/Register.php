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
			$Usernameagain = $_POST['UsernameAgain'];
			if (empty($Usernameagain))
			{
				$error = "You should enter your Username again!";
			} else
			{
				if ($Username != $Usernameagain)
				{
					$error = "Your Username that you entered and entered again must match";

				} else
				{
					$Password = $_POST['Password'];
					if (empty($Password)) 
					{
						$error = "You should enter your Password!";
					} else 
					{
						$Passwordagain = $_POST['PasswordAgain'];
						if (empty($Passwordagain))
						{
							$error = "You should enter your Password again!";
						} else
						{
							if ($Password != $Passwordagain)
							{
								$error = "Your Password that you entered and entered again must match";
							} else
							{
								$Email = $_POST['Email'];
								if (empty($Email)) 
								{
									$error = "You should enter your Email!";
								} else 
								{
									$Emailagain = $_POST['EmailAgain'];
									if (empty($Emailagain))
									{
										$error = "You should enter your Email again!";
									} else
									{
										if ($Email != $Emailagain)
										{
											$error = "Your Email that you entered and entered again must match";
										} else
										{
											$myusername = mysql_real_escape_string($Username);
											$mypassword = mysql_real_escape_string($Password);
											$myemail    = mysql_real_escape_string($Email);
											echo "myusername is " . $myusername . "<BR>";
											$sql = "SELECT * FROM 'UsernamePasswordEmails' WHERE 'Username' = '$myusername'";
											echo "sql is " . $sql . "<BR>";
											$result = mysql_query($sql);
											echo "result is " . $result . "<BR>";
											$row = mysql_fetch_array($result);
											echo "row is " . $row . "<BR>";
											$active = $row['active'];
											echo "active is " . $active . "<BR>";
											$count = mysql_num_rows($result);
											echo "count is " . $count . "<BR>";
											if (empty($count))
											{
												$count = 0;
											}
											echo "count is " . $count . "<BR>";

											// If result did not matched $myusername, table row must be 1 row
											if($count >= 1) 
											{
												$error = "There is already a Username " . $Username . " registered." . "  " . "Try Loggin in with that Username " . $Username . ".";
											} else
											{
												$insertcommand = "INSERT INTO UsernamePasswordEmails(Username,Password,Email) VALUES('$myusername','$mypassword','$myemail')";
												echo "insertcommand is " . $insertcommand . "<BR>";
												mysql_query($insert) or die("Cannot insert");
												session_register("myusername");
												$_SESSION['login_user'] = $myusername;

												header("location: BookTrip.php");
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
?>
<HTML>
	<HEAD>
		<TITLE>MasterCardProject 2021 Register Page</TITLE>
	</HEAD>
   
   	<BODY>
		<b>Login</b>
		<br /><br /><br />
		If you have registered already please click on <a href="Login.php">Login</a>
		<br /><br /><br />
		<FORM action = "" method = "post">
			<label>Enter Username        :</label><input type = "text" name = "Username"/><br /><br />
			<label>Enter Username Again  :</label><input type = "text" name = "UsernameAgain"/><br /><br />
			<label>Enter Password        :</label><input type = "password" name = "Password"/><br/><br />
			<label>Enter Password Again  :</label><input type = "password" name = "PasswordAgain"/><br/><br />
			<label>Enter Email           :</label><input type = "text" name = "Email"/><br /><br />
			<label>Enter Email Again     :</label><input type = "text" name = "EmailAgain"/><br /><br />
			<input type = "submit" value = " Submit "/><br />
		</FORM>
		<?php
			echo $error;
		?>
	</BODY>
</HTML>
