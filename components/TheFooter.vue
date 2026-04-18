<template>
	<footer class="footer">
		<div class="footer__inner">
			<p class="footer__text">&copy; 2019–{{ year }} · {{ $t('footer.copyright') }}</p>
		</div>
	</footer>
</template>

<script setup lang="ts">
	const year = new Date().getFullYear();
</script>

<style lang="scss" scoped>
	.footer {
		flex-shrink: 0;
		margin-top: clamp(2rem, 5vw, 4rem);
		padding: 1.5rem 0 2rem;
		border-top: 1px solid var(--border);
	}

	.footer__inner {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.footer__text {
		font-family: $font-family-mono;
		font-size: $font-size-xs;
		letter-spacing: $tracking-wide;
		color: var(--fg-subtle);
		text-transform: uppercase;
	}
</style>
