import { TSideHero } from '@/model/types';
import { applySnapshot, cast, Instance, types } from 'mobx-state-tree';

export const cursorModel = types
	.model({
		x: types.number,
		y: types.number,
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
	}));

export const bulletModel = types.model({
	x: types.number,
	y: types.number,
	radius: types.number,
	dx: types.number,
	dy: types.number,
});

export const heroModel = types
	.model({
		id: types.identifierNumber,
		healthPoints: types.number,
		countShooting: types.number,
		speedShooting: types.number,
		color: types.union(types.literal('blue'), types.literal('red')),
		colorSpell: types.string,
		x: types.number,
		y: types.number,
		radius: types.number,
		dx: types.number,
		dy: types.number,
		bullets: types.array(bulletModel),
		targetId: types.maybe(types.number),
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
			return Math.round(Math.abs(self.dx) * 100);
		},
		get getHeroSpeedShooting() {
			return self.speedShooting;
		},
		get getHerColorSpell() {
			return self.colorSpell;
		},
		getPosition(canvasWidth: number, canvasHeight: number) {
			const wPercent = canvasWidth / 100;
			const hPercent = canvasHeight / 100;
			const pxSelf = {
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
		setSpeed(newSpeed: number) {
			this.setMoveSpeed(newSpeed / 100, newSpeed / 100);
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
		createHero(ctx: CanvasRenderingContext2D, width: number, height: number) {
			const { x, y, radius } = self.getPosition(width, height);
			const circle = new Path2D();
			circle.arc(x, y, radius, 0, 2 * Math.PI);
			ctx.fillStyle = self.color;
			ctx.fill(circle);
			self.bullets.forEach((bullet) => {
				ctx.beginPath();
				ctx.arc(bullet.x * width, bullet.y * height, radius / 4, 0, Math.PI * 2);
				ctx.fillStyle = self.color;
				ctx.fill();
				ctx.closePath();
			});
		},
		move(isReverse: boolean = false) {
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
			self.bullets.forEach((b) => {
				b.x += b.dx;
				b.y += b.dy;
			});

			self.bullets = cast(
				self.bullets.filter((b) => b.x >= 0 && b.x <= 1 && b.y >= 0 && b.y <= 1),
			);
		},
		shoot(target: typeof self) {
			const angle = Math.atan2(target.y - self.y, target.x - self.x);
			const bulletSpeed = 0.01;
			self.bullets.push({
				x: self.x,
				y: self.y,
				radius: 0.01,
				dx: bulletSpeed * Math.cos(angle),
				dy: bulletSpeed * Math.sin(angle),
			});
		},
		setMoveSpeed(dx: number, dy: number) {
			self.dx = self.dx > 0 ? dx : -dx;
			self.dy = self.dy > 0 ? dy : -dy;
		},
	}));

export const storeModel = types
	.model({
		width: types.number,
		height: types.number,
		heroes: types.array(heroModel),
		cursor: cursorModel,
	})
	.views((self) => ({
		get getHeroes() {
			return self.heroes;
		},
		getHero(hero: TSideHero) {
			return self.heroes.filter((h) => h.color === hero);
		},
	}))
	.actions((self) => ({
		setSize(width: number, height: number) {
			self.width = width;
			self.height = height;
		},
		handleCollisions() {
			for (let i = 0; i < self.heroes.length; i++) {
				const hero1 = self.heroes[i];
				for (let j = i + 1; j < self.heroes.length; j++) {
					const hero2 = self.heroes[j];

					const dx = hero2.x - hero1.x;
					const dy = hero2.y - hero1.y;
					const x1 = hero1.x;
					const y1 = hero1.y;
					const r1 = hero1.radius;
					const x2 = hero2.x;
					const y2 = hero2.y;
					const r2 = hero2.radius;

					const distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
					const minDist = hero1.radius + hero2.radius;
					if (distance < minDist) {
						const angle = Math.atan2(dy, dx);
						const force = minDist - distance / 2;
						const moveX = force * Math.cos(angle);
						const moveY = force * Math.sin(angle);
						// hero1.x -= moveX;
						// hero1.y -= moveY;
						// hero2.x += moveX;
						// hero2.y += moveY;

						// const swapSpeed = (hero1.dx * dx + hero1.dy * dy) / distance;
						// hero1.dx -= (swapSpeed * dx) / distance;
						// hero1.dy -= (swapSpeed * dy) / distance;
						// hero2.dx += (swapSpeed * dx) / distance;
						// hero2.dy += (swapSpeed * dy) / distance;
					}
				}
			}
		},
		updateCirclePostition(ctx: CanvasRenderingContext2D) {
			ctx.clearRect(0, 0, self.width, self.height);
			self.heroes.forEach((h, i) => {
				h.createHero(ctx, self.width, self.height);
				h.move(i % 2 !== 0);
			});
			this.handleCollisions();
		},
	}));
