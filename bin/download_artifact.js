module.exports = async ({ github, context }) => {
  console.log("download_artifact");
  console.log({ github, context });
  const fs = require("fs");
  const artifacts = await github.actions.listWorkflowRunArtifacts({
    owner: context.repo.owner,
    repo: context.repo.repo,
    run_id: github.event.workflow_run.id,
  });
  const matchArtifact = artifacts.data.artifacts.filter((artifact) => {
    return artifact.name == "pr";
  })[0];
  const download = await github.actions.downloadArtifact({
    owner: context.repo.owner,
    repo: context.repo.repo,
    artifact_id: matchArtifact.id,
    archive_format: "zip",
  });
  fs.writeFileSync(`${github.workspace}/pr.zip`, Buffer.from(download.data));
};
