function doGet() {
  return HtmlService.createTemplateFromFile("index").evaluate()
}

function allocateRTM() {
    const ss = SpreadsheetApp.getActiveSpreadsheet();

    // Sheet references
    const roomSheet = ss.getSheetByName("Room Occupancy");
    const mentorSheet = ss.getSheetByName("Mentor List");
    const allocationSheet = ss.getSheetByName("Room Allocation") || ss.insertSheet("Room Allocation");

    // Fetch mentor data: Programme, Sem, Mentor, No. of Mentees, Block Preference
    const mentorData = mentorSheet.getRange(2, 1, mentorSheet.getLastRow() - 1, 5).getValues();
    let roomData = roomSheet.getRange(2, 1, roomSheet.getLastRow() - 1, 2).getValues(); // Room, Capacity

    // Sort rooms by block (B first) and then by capacity ascending
    roomData.sort((a, b) => {
      const aBlock = a[0].charAt(0);
      const bBlock = b[0].charAt(0);
      if (aBlock === bBlock) {
        return a[1] - b[1];
      } else if (aBlock === 'B') {
        return -1;
      } else if (bBlock === 'B') {
        return 1;
      } else {
        return aBlock.localeCompare(bBlock);
      }
    });

    // Clear Room Allocation sheet before writing
    allocationSheet.clearContents();
    allocationSheet.appendRow(["Mentor", "Programme", "No. of Mentee", "Room", "Occupancy", "Block Preference"]);

    mentorData.forEach(([programme, sem, mentor, menteeCount, blockPref]) => {
      let assignedRoom = null;

      // Try to match room with preferred block first
      for (let i = 0; i < roomData.length; i++) {
        const [roomId, capacity] = roomData[i];
        if (roomId.charAt(0).toUpperCase() === blockPref.toUpperCase() && capacity >= menteeCount) {
          assignedRoom = roomData.splice(i, 1)[0]; // Remove and assign
          break;
        }
      }

      // If no room matched the block preference, try any room
      if (!assignedRoom) {
        for (let i = 0; i < roomData.length; i++) {
          const [roomId, capacity] = roomData[i];
          if (capacity >= menteeCount) {
            assignedRoom = roomData.splice(i, 1)[0]; // Remove and assign
            break;
          }
        }
      }

      if (assignedRoom) {
        allocationSheet.appendRow([
          mentor,
          programme,
          menteeCount,
          assignedRoom[0],
          assignedRoom[1],
          blockPref
        ]);
      } else {
        // No suitable room found
        allocationSheet.appendRow([
          mentor,
          programme,
          menteeCount,
          "Not Assigned",
          "N/A",
          blockPref
        ]);
      }
    });

    SpreadsheetApp.flush();
    Logger.log("Room allocation completed.");
}