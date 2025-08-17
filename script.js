function doGet(e) {
  // Allow GET with ?id=G001
  var id = e.parameter.id;
  if (!id) {
    return ContentService.createTextOutput("❌ Missing id parameter");
  }

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Sheet1"); // change if different
  var data = sheet.getDataRange().getValues();

  for (var i = 1; i < data.length; i++) {
    var rowId = data[i][1] + ""; // Guest ID column (index 1)
    if (rowId === id) {
      var checked = (data[i][2] + "").trim(); // Checked In? column (index 2)
      if (checked === "Yes") {
        return ContentService.createTextOutput("⚠️ Already Checked In");
      } else {
        sheet.getRange(i+1, 3).setValue("Yes"); // set Checked In? to Yes
        // optional: timestamp in another column: sheet.getRange(i+1,4).setValue(new Date());
        return ContentService.createTextOutput("✅ Welcome " + data[i][0] + " 🎉");
      }
    }
  }
  return ContentService.createTextOutput("❌ Invalid Code");
}
