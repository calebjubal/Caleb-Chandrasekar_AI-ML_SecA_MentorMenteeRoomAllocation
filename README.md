# Room Allocation System

![Google Apps Script](https://img.shields.io/badge/Google%20Apps%20Script-Supported-green)

The **Room Allocation System** is a Google Apps Script-based application designed to automatically assign rooms to mentors based on their mentee count and block preference. The system prioritizes efficient allocation by analyzing room capacity and preferred blocks (e.g., 'B').

## Table of Contents
1. [Features](#features)
2. [Prerequisites](#prerequisites)
3. [Setup Instructions](#setup-instructions)
4. [How It Works](#how-it-works)
5. [Usage](#usage)
6. [Contributing](#contributing)
7. [Video Explanation](#video-explanation)

---

## Features

- **Automatic Room Allocation**: Assigns rooms to mentors based on mentee count and block preference.
- **Block Preference Priority**: Prioritizes rooms in the preferred block (e.g., 'B').
- **Fallback Mechanism**: If no room matches the block preference, assigns any available room with sufficient capacity.
- **User-Friendly Interface**: Provides a simple web interface built with Bootstrap for executing the allocation process.
- **Error Handling**: Alerts users if the allocation fails or if no suitable room is found.

---

## Prerequisites

To use this system, ensure you have the following:

- A Google account.
- Access to Google Sheets and Google Apps Script.
- Basic knowledge of Google Apps Script and JavaScript.

---

## Setup Instructions

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/YOUR_GITHUB_REPO.git
   ```

2. **Set Up Google Sheets**:
   - Create a new Google Sheet.
   - Add three sheets named:
     - `Room Occupancy`: Contains room details (`Room`, `Capacity`).
     - `Mentor List`: Contains mentor details (`Programme`, `Sem`, `Mentor`, `No. of Mentees`, `Block Preference`).
     - `Room Allocation`: This sheet will be created automatically to store allocation results.

3. **Deploy the Script**:
   - Open the Google Apps Script editor by clicking `Extensions > Apps Script` in your Google Sheet.
   - Copy and paste the provided `Code.js` script into the editor.
   - Save the script and give it a name (e.g., `Room Allocation System`).

4. **Set Up the Web App**:
   - In the Apps Script editor, click `Deploy > New Deployment`.
   - Select `Web app` as the deployment type.
   - Configure access permissions (e.g., "Anyone with the link").
   - Deploy the app and copy the web app URL.

5. **Integrate the HTML File**:
   - Replace the placeholder `YOUR_GITHUB_REPO` in the HTML file with your actual GitHub repository link.
   - Host the HTML file or use it locally to interact with the deployed web app.

---

## How It Works

1. **Input Data**:
   - Populate the `Room Occupancy` sheet with room details (`Room`, `Capacity`).
   - Populate the `Mentor List` sheet with mentor details (`Programme`, `Sem`, `Mentor`, `No. of Mentees`, `Block Preference`).

2. **Room Sorting**:
   - Rooms are sorted by block (prioritizing 'B') and then by capacity in ascending order.

3. **Allocation Logic**:
   - The system attempts to assign rooms matching the mentor's block preference.
   - If no matching room is found, it assigns any available room with sufficient capacity.
   - If no suitable room is available, the mentor is marked as "Not Assigned".

4. **Output**:
   - Results are written to the `Room Allocation` sheet, including mentor details, assigned room, occupancy, and block preference.

---

## Usage

1. Open the web interface by navigating to the deployed web app URL.
2. Click the **"Run Allocation"** button to execute the allocation process.
3. Check the `Room Allocation` sheet in your Google Sheet for the results.

---

## Contributing

We welcome contributions to improve the Room Allocation System! To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bug fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your commit message here"
   ```
4. Push your changes to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Submit a pull request detailing your changes.

---

## Acknowledgments

- Built using [Google Apps Script](https://developers.google.com/apps-script).
- Styled with [Bootstrap](https://getbootstrap.com/).
- Icons from [Simple Icons](https://simpleicons.org/).

---

## Video Explanation

- [Drive Link](https://drive.google.com/file/d/1WjSjELGdQAZCYUuHTO4AtDQOxPvIgg9v/view?usp=sharing)
---
