// 1. Define the API URL (e.g., Public Holidays for US in 2025)
// Change 'US' to 'IN' for India, 'GB' for UK, etc.
const countryCode = 'US';
const year = 2025;
const apiUrl = `https://nager.at{year}/${countryCode}`;

// 2. Create the Fetch Function
async function loadLiveFestivalData() {
    try {
        const response = await fetch(apiUrl);
        
        // Check if the API call was successful
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const apiData = await response.json();
        console.log("Data fetched successfully:", apiData);

        // 3. Transform API data to match your Calendar's format
        // Most APIs return data in their own format. We must map it to yours.
        const formattedEvents = apiData.map(item => ({
            title: item.name,        // API calls it 'name', you might call it 'title'
            date: item.date,         // Format: "2025-01-01"
            type: 'festival'         // specific tag for your logic
        }));

        // 4. Pass this new data to your existing render function
        // Assuming you have a function named 'initCalendar' or 'render'
        initCalendar(formattedEvents);

    } catch (error) {
        console.error("Failed to load festival data:", error);
        // Optional: Fallback to static data if API fails
        alert("Could not load live data. Check console for details.");
    }
}

// 5. Run the function when the page loads
document.addEventListener('DOMContentLoaded', loadLiveFestivalData);
