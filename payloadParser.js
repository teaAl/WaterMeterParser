const payloadHex = payload.find(item => item.variable === "payload")

if(payloadHex) {
  //grab the payload hex value
  const payloadHexValue = payloadHex.value

  // Save each of the values needed for visualisation. 
  // Hexadecimal format has 32 characters => 2 character/byte. 
  // So counter1 that lies from bytes 1-4 will be a substring of the hex value from characters 2-8(including 8)
  const counter1Hex = payloadHexValue.substring(2,10)
  const batteryVoltHex = payloadHexValue.substring(18, 20)
  const tempHex = payloadHexValue.substring(20, 22)

  //After saving each value needed for visualisation in hex, convert them to decimal format with parseInt(hex, base) method
  const counter1Dec = parseInt(counter1Hex, 16)
  const batteryVoltDec = parseInt(batteryVoltHex, 16)
  const tempDec = parseInt(tempHex, 16)

  //Do the calculations needed for the battery voltage and temperature values to actually visualise them
  const batteryVal = (3.3/256)* batteryVoltDec
  const tempVal = 90/256 * tempDec -30

  // Push the variables and values
  payload.push({"variable" : "counter1", "value": counter1Dec});
  payload.push({"variable" : "battery_voltage", "value" : batteryVal});
  payload.push({"variable" : "temperature", "value" : tempVal });
  
} else { 
  payload.push({"variable" : "error message", "value" : "Could not visualize data at the given moment" })
}

//PS: There is another longer and less efficent way (for this particular task) to do this. 
// But if in the future this app gets bigger and has a lot of values than I think this approach is better and cleaner
// 1. Convert the hex payload string to bytes array with a function that runs a for() loop that increments with 2.
// 2. Separate accordingly to given bytes. Ex: counter1 = bytesArray.slice(1,5)
// 3. Convert each of the values from bytes to hex again with another function
// 4. Do the calculations for battery and temperature 