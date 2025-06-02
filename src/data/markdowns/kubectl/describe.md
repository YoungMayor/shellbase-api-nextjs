# Kubectl Describe

The `kubectl describe` command shows details of a specific resource or group of resources.

## Usage
`kubectl describe (-f FILENAME | TYPE [NAME_PREFIX | -l label] | TYPE/NAME) [options]`

## Common Flags
-   `-f`, `--filename stringArray`: Filename, directory, or URL to files containing the resource to describe.
-   `-n`, `--namespace string`: If present, the namespace scope for this CLI request.
-   `-l`, `--selector string`: Selector (label query) to filter on.
-   `-A`, `--all-namespaces`: If present, list the requested object(s) across all namespaces.

## Examples
Describe a node:
\`\`\`bash
kubectl describe nodes my-node
\`\`\`

Describe a pod in the current namespace:
\`\`\`bash
kubectl describe pods/my-pod
\`\`\`

Describe all pods in the namespace "my-ns" with label "app=nginx":
\`\`\`bash
kubectl describe pods -n my-ns -l app=nginx
\`\`\`

Describe a pod identified by type and name in `pod.json`:
\`\`\`bash
kubectl describe -f pod.json
\`\`\`

Describe all pods managed by a specific ReplicaSet:
\`\`\`bash
# First, get the ReplicaSet name
kubectl get rs
# Then describe pods matching the ReplicaSet's selector
# (Assuming ReplicaSet 'my-replicaset' has selector 'app=my-app')
kubectl describe pods -l app=my-app
\`\`\`
