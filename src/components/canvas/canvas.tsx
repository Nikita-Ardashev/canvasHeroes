import { useEffect, useRef, useState } from 'react';
import './canvas.style.sass';
import { observer } from 'mobx-react-lite';
import { store } from '@/store/store';
import { IHeroModel } from '@/model/types';

interface ICreateCircle {
	ctx: CanvasRenderingContext2D;
	x: number;
	y: number;
	radius: number;
	counterclockwise?: boolean;
	color?: string | CanvasGradient | CanvasPattern;
}

const Canvas = observer(() => {
	const [windowResize, setWindowResize] = useState<number>(window.innerWidth);
	const heroes = store.getHeroes;
	const boxCanvasRef = useRef<HTMLDivElement | null>(null);
	const canvasRef = useRef<HTMLCanvasElement | null>(null);

	const createCircle = (props: ICreateCircle): void => {
		const { x, y, radius, counterclockwise, color = 'black', ctx } = props;
		const circle = new Path2D();
		circle.arc(x, y, radius, 0, 2 * Math.PI, counterclockwise);
		ctx.fillStyle = color;
		ctx.fill(circle);
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

		const ctx = canvas.getContext('2d');

		if (ctx === null) return;

		ctx.clearRect(0, 0, width, height);

		const animate = () => {
			ctx.clearRect(0, 0, width, height);
			for (const hero of Object.values(heroes) as IHeroModel[]) {
				const pos = hero.position.getPosition(width, height);
				createCircle({
					ctx,
					x: pos.x,
					y: pos.y,
					radius: pos.radius,
					color: hero.color,
				});
				hero.position.setMove(hero.color === 'red');
			}
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
