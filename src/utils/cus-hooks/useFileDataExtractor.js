export default async function useFileDataExtractor(fileExtension, selectedFile) {
    return new Promise((resolve, reject) => {
        switch (fileExtension) {
            case "csv": {
                console.log("Uploaded CSV file:", selectedFile);
                // Handle CSV file
                resolve({ csv: "data" }); // You can pass data here if needed
            }
                break;
            case "xlsx": {
                console.log("Uploaded Excel file:", selectedFile);
                // Handle Excel file
                resolve({ xlsx: selectedFile }); // You can pass data here if needed
            } break;
            case "json": {
                console.log("Uploaded JSON file:", selectedFile);

                const reader = new FileReader();
                reader.onload = (e) => {
                    try {
                        const parsedData = JSON.parse(e.target.result);
                        console.log(parsedData);
                        resolve({ json: parsedData });
                    } catch (error) {
                        console.error("Error parsing JSON:", error);
                        reject(error);
                    }
                };
                reader.readAsText(selectedFile);

                // Handle JSON file
            }
                break;

            default:
                console.log("Unsupported file type");
                // Handle unsupported file type
                reject("Unsupported file type");
        }
    });
}
