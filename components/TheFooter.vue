<template>
	<footer class="footer">
		<div class="footer__inner">
			<img
				class="footer__logo"
				src="/logo.svg"
				alt="HELL_YEAH logo"
				width="48"
				height="48"
				decoding="async"
				loading="lazy"
			/>
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
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.75rem;
	}

	.footer__logo {
		display: block;
		width: 48px;
		height: 48px;
		object-fit: contain;
		opacity: 0.85;
		transition: opacity 0.3s;

		&:hover {
			opacity: 1;
		}
	}

	.footer__text {
		font-family: $font-family-mono;
		font-size: $font-size-xs;
		letter-spacing: $tracking-wide;
		color: var(--fg-subtle);
		text-transform: uppercase;
	}
</style>
