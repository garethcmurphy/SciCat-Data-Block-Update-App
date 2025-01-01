# SciCat Data Block Update App 📦🔄  


[![Coverage Status](https://coveralls.io/repos/github/garethcmurphy/scicatorigdatablocks/badge.svg?branch=master)](https://coveralls.io/github/garethcmurphy/scicatorigdatablocks?branch=master)




This repository provides a tool for updating **data block locations** in the **SciCat data catalog** after new registrations. The app replaces outdated block locations with the updated ones, ensuring accurate metadata.

---

## Features ✨  

- **Automated Updates**: Replace original data block locations with new ones.  
- **SciCat Integration**: Connects directly to the SciCat API for updates.  
- **Efficient Workflow**: Simplifies and automates location updates.  

---

## Prerequisites 🛠️  

- Node.js (14+ recommended).  
- Access to a SciCat instance with API credentials.  

---

## Installation  

1. Clone the repository:  
   git clone https://github.com/your-username/scicat-data-block-update.git  
   cd scicat-data-block-update  

2. Install dependencies:  
   npm install  

---

## Usage 🔧  

1. Set your SciCat API credentials and configuration in `config.json`.  

2. Run the app to update data block locations:  
   npm start  

3. Monitor the console for logs and status messages.  

---

## Configuration  

- **API Settings**: Update `config.json` with the following:  
  - SciCat API URL  
  - Authentication token  

---

## File Structure 📂  

- `src/`: Contains the main code for the app.  
  - `updateBlocks.js`: Logic for updating data block locations.  
  - `config.json`: API credentials and configuration.  
- `package.json`: Project configuration and dependencies.  
- `README.md`: Documentation for the repository.  

---

## Example Commands  

- Start the app:  
  npm start  

- Test individual updates:  
  node src/updateBlocks.js  

---

## Contributing 🤝  

1. Fork the repository.  
2. Create a new branch:  
   git checkout -b feature/your-feature  

3. Commit your changes:  
   git commit -m "Add your feature"  

4. Push the branch:  
   git push origin feature/your-feature  

5. Open a pull request.  

---

## License 📝  

This project is licensed under the MIT License. See the LICENSE file for details.  

---

**Keep your SciCat data catalog accurate and up-to-date with this app!** 📦🔄  
