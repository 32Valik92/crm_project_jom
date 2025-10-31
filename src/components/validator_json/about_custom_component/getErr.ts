export function getErr(errors: any, path: string): { message: string } {
	return path.split(".").reduce((acc, key) => (acc ? acc[key] : undefined), errors);
}