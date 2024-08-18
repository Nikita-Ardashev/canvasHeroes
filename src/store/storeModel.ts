import { TSideHero } from '@/model/types';
import { applySnapshot, Instance, types } from 'mobx-state-tree';

export const positionModel = types.model({
	x: types.number,
	y: types.number,
	width: types.string,
	height: types.string,
});

export const heroModel = types
	.model({
		id: types.identifierNumber,
		healthPoints: types.refinement(types.number, (value) => value <= 100),
		countShooting: types.number,
		speed: types.refinement(types.number, (value) => value <= 100),
		speedShooting: types.refinement(types.number, (value) => value <= 100),
		color: types.string,
		colorSpell: types.string,
		position: positionModel,
	})
	.views((self) => ({
		get getHero() {
			return self;
		},
		get getHeroHP() {
			return self.healthPoints;
		},
		get getHeroCountShooting() {
			return self.countShooting;
		},
		get getHeroSpeed() {
			return self.speed;
		},
		get getHeroSpeedShooting() {
			return self.speedShooting;
		},
		get getHerColorSpell() {
			return self.colorSpell;
		},
	}))
	.actions((self) => ({
		setSpeed(newSpeed: number) {
			self.speed = newSpeed;
		},
		setSpeedShooting(newSpeed: number) {
			self.speedShooting = newSpeed;
		},
		setColorSpell(newColor: string) {
			self.colorSpell = newColor;
		},
		setCountShooting(newCount: number) {
			self.countShooting = newCount;
		},
		setHealthPoints(newHP: number) {
			self.countShooting = newHP;
		},
	}));

export const heroesModel = types.model({
	blueHero: heroModel,
	redHero: heroModel,
});

export const cursorModel = types
	.model({
		position: positionModel,
	})
	.views((self) => ({
		get cursor() {
			return self;
		},
	}))
	.actions((self) => ({
		setCursor(newCursor: Partial<Instance<typeof self>>) {
			applySnapshot(self, { ...self, ...newCursor });
		},
		setCursorPosition(newCursorPosition: Partial<Instance<typeof self.position>>) {
			applySnapshot(self.position, { ...self.position, ...newCursorPosition });
		},
	}));

export const storeModel = types
	.model({
		heroes: heroesModel,
		cursor: cursorModel,
	})
	.views((self) => ({
		get getHeroes() {
			return self.heroes;
		},
		getHero(hero: TSideHero) {
			switch (hero) {
				case 'red':
					return self.heroes.redHero;
				case 'blue':
					return self.heroes.blueHero;
			}
		},
	}));
