import { storeModel } from './storeModel';

export const store = storeModel.create({
	heroes: {
		blueHero: {
			id: 0,
			healthPoints: 100,
			color: 'blue',
			colorSpell: 'blue',
			speed: 20,
			speedShooting: 20,
			countShooting: 0,
			position: {
				x: 0,
				y: 0,
				height: '100px',
				width: '100px',
			},
		},
		redHero: {
			id: 1,
			healthPoints: 100,
			color: 'red',
			colorSpell: 'red',
			speed: 20,
			speedShooting: 20,
			countShooting: 0,
			position: {
				x: 0,
				y: 0,
				height: '100px',
				width: '100px',
			},
		},
	},
	cursor: { position: { x: 0, y: 0, width: '40px', height: '40px' } },
});
