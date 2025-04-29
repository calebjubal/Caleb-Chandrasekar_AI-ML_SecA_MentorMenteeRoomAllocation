function doGet() {
    return HtmlService.createTemplateFromFile("index").evaluate()
  }
  
  function allocateRTM() {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
  
    // Sheet references
    const roomSheet = ss.getSheetByName("Room Occupancy");
    const mentorSheet = ss.getSheetByName("Mentor List");
    const allocationSheet = ss.getSheetByName("Room Allocation") || ss.insertSheet("Room Allocation");
  
    // Fetch mentor data
    const mentorData = mentorSheet.getRange(2, 1, mentorSheet.getLastRow() - 1, 5).getValues();
    let roomData = roomSheet.getRange(2, 1, roomSheet.getLastRow() - 1, 2).getValues();
  
    // Sort rooms
    roomData.sort((a, b) => {
      const aBlock = a[0].charAt(0);
      const bBlock = b[0].charAt(0);
      if (aBlock === bBlock) return a[1] - b[1];
      if (aBlock === 'B') return -1;
      if (bBlock === 'B') return 1;
      return aBlock.localeCompare(bBlock);
    });
  
    // Clear allocation sheet
    allocationSheet.clearContents();
    const headers = ["Mentor", "Programme", "No. of Mentee", "Room", "Occupancy", "Block Preference"];
    allocationSheet.appendRow(headers);
  
    mentorData.forEach(([programme, sem, mentor, menteeCount, blockPref]) => {
      let assignedRoom = null;
  
      for (let i = 0; i < roomData.length; i++) {
        const [roomId, capacity] = roomData[i];
        if (roomId.charAt(0).toUpperCase() === blockPref.toUpperCase() && capacity >= menteeCount) {
          assignedRoom = roomData.splice(i, 1)[0];
          break;
        }
      }
  
      if (!assignedRoom) {
        for (let i = 0; i < roomData.length; i++) {
          const [roomId, capacity] = roomData[i];
          if (capacity >= menteeCount) {
            assignedRoom = roomData.splice(i, 1)[0];
            break;
          }
        }
      }
  
      allocationSheet.appendRow([
        mentor,
        programme,
        menteeCount,
        assignedRoom ? assignedRoom[0] : "Not Assigned",
        assignedRoom ? assignedRoom[1] : "N/A",
        blockPref
      ]);
    });
  
    SpreadsheetApp.flush();
  
    // Return the sheet data as array of objects
    const values = allocationSheet.getDataRange().getValues();
    const csv = values.map(row => row.map(String).join(",")).join("\n");
    return csv;
  }
  