/**
 * @module suggestedIssues
 * @description Fetches ticket recommendations based on given pull request details.
 * @param {object} pr - The pull request object containing title, author, and created_at properties.
 * @param {string} apiKey - The API key used to authenticate requests.
 * @returns {Promise<string>} A markdown string of the top three recommended Jira issues, each formatted with the issue key, title, and URL.
 * @example
 * suggestedIssues({pr, "your-api-key").then(result => {
 *   console.log(result);
 * }).catch(error => {
 *   console.error(error);
 * });
 * @license MIT
 */

const suggestedIssues = async (pr, apiKey) => {
  const url =
    "https://public-api.linearb-dev-01.io/api/v1/inference/get_ticket_recommendation";

  const requestData = {
    request_id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, // <-- local UUID per call
    pull_request: {
      title: pr.title, // PR title
      issuer_name: pr.author, // PR author
      created_at: pr.created_at, // PR creation date
    },
  };

  const result = await fetch(url, {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify(requestData),
  })
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => console.log("Error:", error));

  if (result && result.recommendations && result.recommendations.jira_tickets) {
    // Extract the first 3 issues
    const issues = result.recommendations.jira_tickets.slice(0, 3);

    // Map to the desired object format containing the issue URL and issue title
    const issuesMarkdown = issues
      .map((issue) => ({
        url: issue.issue_provider_url,
        title: issue.title.replace(/\n/g, "").trim(),
        key: issue.issue_key,
      }))
      // Map to the desired object format containing the issue URL and issue title
      .map((issue) => `- [ ] [${issue.key} - ${issue.title}](${issue.url})`)
      .join("\n");

    return issuesMarkdown;
  } else {
    console.log(
      "Invalid response structure:",
      JSON.stringify(result, null, 2),
    );
  }
};

module.exports = {
    async: true,
    filter: suggestedIssues
}
