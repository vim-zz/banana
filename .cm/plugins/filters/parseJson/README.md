# parseJson plugin

Example:

```yaml+jinja
manifest:
  version: 1.0

automations:
  check:
    if:
      - {{ json_output.medium > 1 }}
    run:
      - action: add-comment@v1
        args:
          comment: = {{ json_output.high + json_output.low }} 

json_output: {{ "{low: 1, medium:2, high:3}" | parseJson }}

```