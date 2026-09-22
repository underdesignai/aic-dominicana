const token = "6|MgYOQyTlD88t6ZbEAktbPHUkudJAQdbiHZEy6neA939fd83e";
const base = "http://169.58.145.192/api/v1";
const uuid = "aymsynfkjoqf82argiqwcaco";

async function check() {
  for (let i = 0; i < 15; i++) {
    const res = await fetch(`${base}/applications/${uuid}`, {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" }
    });
    const app = await res.json();
    console.log(`[Attempt ${i + 1}] App Status:`, app.status, "| FQDN:", app.fqdn);

    if (app.status && app.status.includes("running")) {
      console.log("Application is RUNNING!");
      break;
    }
    await new Promise(r => setTimeout(r, 4000));
  }

  // Test the live domain
  try {
    const httpRes = await fetch("http://aicdominicana.flowprintcorp.com");
    console.log("HTTP Live Check:", httpRes.status);
  } catch (e) {
    console.log("HTTP Check Error:", e.message);
  }

  try {
    const httpsRes = await fetch("https://aicdominicana.flowprintcorp.com");
    console.log("HTTPS Live Check:", httpsRes.status);
  } catch (e) {
    console.log("HTTPS Check Error:", e.message);
  }
}

check().catch(console.error);
