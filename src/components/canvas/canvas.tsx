import { useEffect, useRef } from 'react';
import './canvas.style.sass';
import { observer } from 'mobx-react-lite';
const Canvas = observer(() => {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	useEffect(() => {
		const canvas = canvasRef.current;
		if (canvas === null) return;
		const ctx = canvas.getContext('2d');
		if (ctx === null) return;
		ctx.arc(100, 100, 10, 0, 2 * Math.PI);
		ctx.fill();
	}, []);
	return <canvas ref={canvasRef}></canvas>;
});

export default Canvas;
