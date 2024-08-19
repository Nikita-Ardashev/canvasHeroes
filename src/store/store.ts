import { storeModel } from './storeModel';

export const store = storeModel.create({
	heroes: {
		blueHero: {
			id: 0,
			healthPoints: 100,
			color: 'blue',
			colorSpell: 'blue',
			speedShooting: 20,
			countShooting: 0,
			position: {
				x: 10,
				y: 50,
				radius: 5,
				dx: 0.02,
				dy: 0.02,
			},
		},
		redHero: {
			id: 1,
			healthPoints: 100,
			color: 'red',
			colorSpell: 'red',
			speedShooting: 20,
			countShooting: 0,
			position: {
				x: 90,
				y: 50,
				radius: 5,
				dx: 0.02,
				dy: 0.02,
			},
		},
	},
	cursor: { position: { x: 0, y: 0 } },
});
