# Kubectl Get

The `kubectl get` command displays one or many resources.

## Usage
`kubectl get [(-o|--output=)json|yaml|wide|custom-columns=...|custom-columns-file=...|go-template=...|go-template-file=...|jsonpath=...|jsonpath-file=...] (TYPE[.VERSION][.GROUP] [NAME | -l label] | TYPE[.VERSION][.GROUP]/NAME ...) [flags]`

## Common Flags
-   `-A`, `--all-namespaces`: If present, list the requested object(s) across all namespaces.
-   `-n`, `--namespace string`: If present, the namespace scope for this CLI request.
-   `-o`, `--output string`: Output format. One of: json|yaml|wide|custom-columns=...|custom-columns-file=...|go-template=...|go-template-file=...|jsonpath=...|jsonpath-file=...
-   `-l`, `--selector string`: Selector (label query) to filter on, supports '=', '==', and '!='.(e.g. -l key1=value1,key2=value2).
-   `--watch`, `-w`: After listing/getting the requested object, watch for changes.

## Examples
List all pods in the current namespace:
\`\`\`bash
kubectl get pods
\`\`\`

List all pods in all namespaces:
\`\`\`bash
kubectl get pods -A
\`\`\`

List a particular deployment:
\`\`\`bash
kubectl get deployment my-deployment
\`\`\`

List all services in the namespace "my-ns":
\`\`\`bash
kubectl get services -n my-ns
\`\`\`

Get a pod's YAML definition:
\`\`\`bash
kubectl get pod my-pod -o yaml
\`\`\`

List pods with a specific label:
\`\`\`bash
kubectl get pods -l app=my-app
\`\`\`
