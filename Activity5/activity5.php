<!DOCTYPE html>

<html lang="en">
<head>
    <title>Currency Calculation</title>
    <meta name="description" content="CENG 311 Inclass Activity 5" />

</head>

<body>

	<?php
		
		$map = array("USDCAD" => 1.43,"USDEUR" => 0.92, "CADUSD" => 0.7, "CADEUR" => 0.65,"EURUSD" => 1.08,"EURCAD" => 1.54);
		
		$fromCurrency = "FUSD";
		$toCurrency = "FUSD";
		$originalMoney = "";
		$conversionRate = 1.0;
		$convertedMoney = "";
		
		
		if (isset($_GET["convertButton"])){
			
			if (!empty($_GET["from_value"]) && is_numeric($_GET["from_value"])){
				$fromCurrency = $_GET["from_currency"];
				$toCurrency = $_GET["to_currency"];
				$originalMoney = $_GET["from_value"];

				if($fromCurrency == "FUSD"){
					if($toCurrency == "TEUR")
						$conversionRate = $map["USDEUR"];
					else if($toCurrency == "TCAD")
						$conversionRate = $map["USDCAD"];
				}

				else if($fromCurrency == "FCAD"){
					if($toCurrency == "TEUR")
						$conversionRate = $map["CADEUR"];
					else if($toCurrency == "TUSD")
						$conversionRate = $map["CADUSD"];
				}
				else{
					if($toCurrency == "TUSD")
						$conversionRate = $map["EURUSD"];
					else if($toCurrency == "TCAD")
						$conversionRate = $map["EURCAD"];
				}	
				$convertedMoney = $originalMoney * $conversionRate;	

			}
		}

		
	?>

	<form action = "activity5.php" method="GET">
		<table>
			<tr>
				<td>
					From:
				</td>
				<td>
					<input type="text" name="from_value" value="<?php echo $originalMoney ?>"/>
				</td>
				<td>
					Currency:
				</td>
				<td>
					<select name="from_currency">
						<option value="FUSD"> USD </option>
						<option value="FCAD"> CAD </option>
						<option value="FEUR"> EUR </option>
					</select>
				</td>	
			</tr>
			<tr>
				<td>
					To:
				</td>
				<td>
					<input type="text" name="to_value" value="<?php echo $convertedMoney ?>"/>
				</td>
				<td>
					Currency:
				</td>
				<td>
					<select name="to_currency">
						<option value="TUSD"> USD </option>
						<option value="TCAD"> CAD </option>
						<option value="TEUR"> EUR </option>
					</select>
				</td>	
			</tr>
				<tr>
				<td>
					
				</td>
				<td>
					
				</td>
				<td>
					
				</td>
				<td>
					<input type="submit" name="convertButton" value="convert"/>
					
				</td>	
			</tr>
		</table>
		
	</form>		
</body>