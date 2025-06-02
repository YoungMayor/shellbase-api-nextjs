# Kubectl Apply

The `kubectl apply` command applies a configuration to a resource by filename or stdin. JSON and YAML formats are accepted.

## Usage
`kubectl apply -f FILENAME [options]`

## Common Flags
-   `-f`, `--filename stringArray`: Filename, directory, or URL to files to use to create or update the resource.
-   `-k`, `--kustomize string`: Process the kustomization directory. This flag can't be used together with -f or -R.
-   `-R`, `--recursive`: Process the directory used in -f, --filename recursively. Useful when you want to manage related manifests organized within the same directory.
-   `--prune`: Automatically delete resources that are no longer defined in the applied configuration. Requires the `--all` flag and a label selector (e.g., `--prune -l app=myapp`).
-   `--dry-run string`: Must be "none", "client", or "server". If "client", only print the object that would be sent, without sending it. If "server", submit server-side request without persisting the resource.
-   `--namespace string`, `-n string`: If present, the namespace scope for this CLI request.

## Examples
Apply the configuration in `pod.json` to a pod:
\`\`\`bash
kubectl apply -f ./pod.json
\`\`\`

Apply the JSON passed into stdin to a pod:
\`\`\`bash
cat pod.json | kubectl apply -f -
\`\`\`

Apply the configuration in all `.yaml`, `.yml`, and `.json` files in the `./my-dir/` directory:
\`\`\`bash
kubectl apply -f ./my-dir/
\`\`\`

Apply a Kustomization directory:
\`\`\`bash
kubectl apply -k ./my-kustomization/
\`\`\`

Apply and view changes before committing them to the cluster (dry run):
\`\`\`bash
kubectl apply -f ./my-manifest.yaml --dry-run=client
\`\`\`
