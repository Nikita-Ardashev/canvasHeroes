import { storeModel } from './storeModel';

const DEFAULT_HERO = {
	healthPoints: 100,
	speedShooting: 20,
	countShooting: 0,
	radius: 5,
	dx: 0.01,
	dy: 0.01,
};

export const store = storeModel.create({
	width: 0,
	height: 0,
	heroes: [
		{
			id: 0,
			color: 'blue',
			colorSpell: 'blue',
			x: 10,
			y: 20,
			...DEFAULT_HERO,
		},
		{
			id: 1,
			color: 'red',
			colorSpell: 'red',
			x: 30,
			y: 40,
			...DEFAULT_HERO,
		},
	],
	cursor: { x: 0, y: 0 },
});
