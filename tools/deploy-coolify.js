const token = "6|MgYOQyTlD88t6ZbEAktbPHUkudJAQdbiHZEy6neA939fd83e";
const base = "http://169.58.145.192/api/v1";

async function deploy() {
  const appsRes = await fetch(`${base}/applications`, {
    headers: { Authorization: `Bearer ${token}`, Accept: "application/json" }
  });
  const apps = await appsRes.json();
  let existing = Array.isArray(apps)
    ? apps.find(a => a.name === "AIC Dominicana" || (a.fqdn && a.fqdn.includes("aicdominicana")))
    : null;

  if (existing) {
    console.log("Existing app found:", existing.uuid, existing.fqdn);
    const dep = await fetch(`${base}/deploy?uuid=${existing.uuid}&force=true`, {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" }
    });
    console.log("Trigger deploy status:", dep.status, await dep.text());
    return;
  }

  const payload = {
    project_uuid: "zgxsjijmql4cq9hznxysoaee",
    server_uuid: "sb9auc6eddkpotjjgamrye1y",
    environment_name: "production",
    git_repository: "https://github.com/underdesignai/aic-dominicana",
    git_branch: "main",
    build_pack: "dockerfile",
    ports_exposes: "80",
    name: "AIC Dominicana",
    description: "Web Inmobiliaria AIC Dominicana (ES/FR/EN + Chatbot)",
    domains: "https://aicdominicana.flowprintcorp.com,http://aicdominicana.flowprintcorp.com",
    instant_deploy: true
  };

  const createRes = await fetch(`${base}/applications/public`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(payload)
  });

  const text = await createRes.text();
  console.log("Create App Status:", createRes.status, text);
}

deploy().catch(console.error);
