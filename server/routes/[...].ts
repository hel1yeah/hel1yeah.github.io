export default defineEventHandler((event) => {
	const path = event.path;

	// Handle .well-known routes
	if (path.startsWith('/.well-known/')) {
		return { status: 404 };
	}
});
