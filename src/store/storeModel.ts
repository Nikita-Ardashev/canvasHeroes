import { TSideHero } from '@/model/types';
import { applySnapshot, Instance, types } from 'mobx-state-tree';

export const positionModel = types.model({
	x: types.number,
	y: types.number,
});

const movePositionModel = types
	.compose(
		positionModel,
		types.model({
			radius: types.number,
			dx: types.number,
			dy: types.number,
		}),
	)
	.views((self) => ({
		getPosition(canvasWidth: number, canvasHeight: number) {
			const wPercent = canvasWidth / 100;
			const hPercent = canvasHeight / 100;

			const pxSelf: typeof self = {
				x: self.x * wPercent,
				y: self.y * hPercent,
				radius: self.radius * wPercent,
				dx: self.dx * wPercent,
				dy: self.dy * hPercent,
			};
			return pxSelf;
		},
	}))
	.actions((self) => ({
		setMove(isReverse: boolean = false) {
			if (isReverse) {
				self.x -= self.dx;
				self.y -= self.dy;
			} else {
				self.x += self.dx;
				self.y += self.dy;
			}

			if (self.x + self.radius > 100 || self.x - self.radius < 0) {
				self.dx = -self.dx;
			}

			if (
				self.y + self.radius > 100 - self.radius ||
				self.y - self.radius < self.radius
			) {
				self.dy = -self.dy;
			}
		},
		setMoveSpeed(dx: number, dy: number) {
			self.dx = self.dx > 0 ? dx : -dx;
			self.dy = self.dy > 0 ? dy : -dy;
		},
	}));

export const heroModel = types
	.model({
		id: types.identifierNumber,
		healthPoints: types.number,
		countShooting: types.number,
		speedShooting: types.number,
		color: types.union(types.literal('blue'), types.literal('red')),
		colorSpell: types.string,
		position: movePositionModel,
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
			return Math.round(Math.abs(self.position.dx) * 100);
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
			self.position.setMoveSpeed(newSpeed / 100, newSpeed / 100);
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
