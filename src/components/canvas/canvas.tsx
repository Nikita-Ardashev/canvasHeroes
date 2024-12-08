import { useEffect, useRef, useState } from 'react';
import './canvas.style.sass';
import { observer } from 'mobx-react-lite';
import { store } from '@/store/store';

const Canvas = observer(() => {
	const [windowResize, setWindowResize] = useState<number>(window.innerWidth);
	const heroes = store.getHeroes;
	const boxCanvasRef = useRef<HTMLDivElement | null>(null);
	const canvasRef = useRef<HTMLCanvasElement | null>(null);

	const createCircles = (
		ctx: CanvasRenderingContext2D,
		width: number,
		height: number,
	): void => {
		for (const hero of Object.values(heroes)) {
			const { x, y, radius } = hero.getPosition(width, height);
			const circle = new Path2D();
			circle.arc(x, y, radius, 0, 2 * Math.PI);
			ctx.fillStyle = hero.color;
			ctx.fill(circle);
		}
	};

	useEffect(() => {
		window.addEventListener('resize', () => {
			setWindowResize(window.innerWidth);
		});
	}, []);

	useEffect(() => {
		const boxCanvas = boxCanvasRef.current;
		const canvas = canvasRef.current;

		if (canvas === null || boxCanvas === null) return;
		canvas.width = 0;
		canvas.height = 0;
		const width = boxCanvas.offsetWidth;
		const height = boxCanvas.offsetHeight;
		canvas.width = width;
		canvas.height = height;
		store.setSize(width, height);

		const ctx = canvas.getContext('2d');

		if (ctx === null) return;

		ctx.clearRect(0, 0, width, height);

		const animate = () => {
			store.updateCirclePostition(ctx);
			requestAnimationFrame(animate);
		};

		animate();
	}, [windowResize]);

	return (
		<div className="box-canvas" ref={boxCanvasRef}>
			<canvas ref={canvasRef}></canvas>
		</div>
	);
});

export default Canvas;
