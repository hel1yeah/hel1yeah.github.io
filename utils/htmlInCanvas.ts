interface ElementImageCanvas extends HTMLCanvasElement {
	requestPaint?: () => void;
}

interface ElementImageContext extends CanvasRenderingContext2D {
	drawElementImage?: unknown;
}

/**
 * Detects Chrome's experimental html-in-canvas API (`chrome://flags/#canvas-draw-element`).
 * Same check as canvasui's `supportsHtmlInCanvas`, kept local so the vendored
 * WebGL engines are only downloaded where they can actually run.
 */
export function supportsHtmlInCanvas(): boolean {
	if (typeof document === 'undefined') return false;
	const probe = document.createElement('canvas') as ElementImageCanvas;
	const context = probe.getContext('2d') as ElementImageContext | null;
	return Boolean(
		context &&
			typeof context.drawElementImage === 'function' &&
			typeof probe.requestPaint === 'function',
	);
}
