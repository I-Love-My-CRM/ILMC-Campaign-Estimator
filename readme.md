I ❤️ My CRM - Campaign Cost Calculator
A simple, powerful, and self-contained cost calculator for estimating email and SMS campaign expenses. This tool is designed for clients and agencies using the "I Love My CRM" platform to quickly forecast their marketing spend.

The calculator is a single index.html file, making it incredibly portable and easy to deploy or use locally.

✨ Features
Contact-Based Calculation: Enter the number of contacts, emails per contact, and SMS segments per contact for an intuitive workflow.

Detailed Cost Breakdown: Get a full summary of estimated costs, including:

Email Send Cost

Email Validation Cost (Optional)

SMS Segment Cost

SMS Monthly Fee

Per-Contact Summary: See a clear breakdown of the cost to reach each individual contact via email and SMS.

Customizable Rates: Click the gear icon to open a settings panel where you can define your own markup or agency rates.

Persistent Settings: Custom rates are saved to the browser's localStorage, so they are remembered for future visits.

Optional Validation: Use the checkbox to include or exclude email validation fees from the total cost.

Single-File Application: The entire tool is contained in one index.html file, with no external dependencies required to run.

🚀 How to Use
Local Usage
Download the index.html file from this repository.

Open the file in any modern web browser (like Chrome, Firefox, or Safari).

The calculator is ready to use!

Deployment
This is a static site and can be deployed on any platform that serves HTML files (like Netlify, Vercel, GitHub Pages, or a simple web server).

For platforms like Easypanel that support Docker, you can use the included Dockerfile:

Ensure the Dockerfile is in the root of your repository.

In your Easypanel service, set the Build Type to Dockerfile.

Set the Build Path to /.

Leave the Start Command blank.

Map the network Port to 80.

Deploy the service.

💻 Technology Stack
HTML: For the structure and content.

Tailwind CSS: For all styling, loaded via a CDN.

JavaScript: For all calculation logic, settings management, and interactivity.