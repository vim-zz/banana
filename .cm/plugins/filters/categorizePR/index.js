// npm i axios
const axios = require("axios");

// JSON Schema for strict structured output
const prCategoriesSchema = {
  name: "PRCategorization",
  schema: {
    type: "object",
    additionalProperties: false,
    properties: {
      testing: {
        type: "boolean",
        description: "Touches tests or test infrastructure",
      },
      business_logic: {
        type: "boolean",
        description: "Core domain logic or business rules",
      },
      integration: {
        type: "boolean",
        description: "Cross-service/API/third-party integration or config",
      },
      look_and_feel: {
        type: "boolean",
        description: "UI/UX, styles, layout, design changes",
      },
      docs: {
        type: "boolean",
        description: "Documentation files",
      },
      refactoring: {
        type: "boolean",
        description: "Code restructuring without changing behavior",
      },
      performance: {
        type: "boolean",
        description: "Performance improvements or optimizations",
      },
      security: {
        type: "boolean",
        description: "Security fixes or hardening",
      },
      infrastructure: {
        type: "boolean",
        description: "Build, CI/CD, deployment configuration",
      },
      notes: {
        type: "string",
        description: "Brief explanation of why each true label was chosen",
      },
    },
    required: [
      "testing",
      "business_logic",
      "integration",
      "look_and_feel",
      "docs",
      "refactoring",
      "performance",
      "security",
      "infrastructure",
      "notes",
    ],
  },
  strict: true,
};

const SYSTEM = `
You are a PR multi-label categorizer.
Return only JSON matching the provided schema.
Labels are NOT mutually exclusive - a PR can have multiple categories.
Mark a category true if the PR SUBSTANTIALLY concerns it. Otherwise false.
Consider both code diff and PR description if provided.
Be precise: only mark categories that are clearly evidenced in the changes.
`;

/**
 * gitStream filter function wrapper
 * Returns the categorization object to be used in gitStream automations
 *
 * @param {Array} files - Array of changed file paths
 * @param {string} title - PR title
 * @param {string} description - PR description
 * @param {Array} diffFiles - Array of diff file objects from source.diff.files
 * @param {Function} callback - Callback function (err, result)
 */
const categorizePR = async (files, title, description, diffFiles, callback) => {
  try {
    // Build file list
    const filesList = files ? files.join("\n") : "";

    // Build diff summary from diffFiles array
    const diffSummary =
      diffFiles && Array.isArray(diffFiles)
        ? diffFiles
            .map((f) => {
              const filepath = f.new_file || f.original_file || f.file;
              const diff = f.diff || 0;
              return `${filepath}:\n${diff}\n`;
            })
            .join("\n")
        : "";

    const userContent = `
PR Title:
${title || "(none)"}

PR Description:
${description || "(none)"}

Changed Files:
${filesList || "(none)"}

PR Diff / Summary:
${diffSummary || "(none)"}
`;

    const apiKey = process.env.OPEN_AI_TOKEN;
    if (!apiKey) {
      return callback(new Error("OPEN_AI_TOKEN environment variable is required"));
    }

    const resp = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-5-nano",
        messages: [
          { role: "system", content: SYSTEM },
          { role: "user", content: userContent },
        ],
        response_format: {
          type: "json_schema",
          json_schema: prCategoriesSchema,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      },
    );

    const jsonText =
      resp.data.choices &&
      resp.data.choices[0] &&
      resp.data.choices[0].message &&
      resp.data.choices[0].message.content;

    if (!jsonText) {
      return callback(new Error("No content from model"));
    }

    // Return the parsed JSON object, not a string
    console.log(typeof jsonText);
    console.log(jsonText);
    return callback(null, jsonText);
  } catch (error) {
    return callback(error);
  }
};

module.exports = {
  async: true,
  immediate: true,
  filter: categorizePR,
};
