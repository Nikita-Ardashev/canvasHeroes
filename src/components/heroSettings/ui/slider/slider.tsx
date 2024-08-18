import './slider.style.sass';
import { TSideHero } from '@/model/types';
import { store } from '@/store/store';
import { observer } from 'mobx-react-lite';

interface ISlider {
	isSpeedMove: boolean;
	side: TSideHero;
}

const Slider = observer(({ side, isSpeedMove }: ISlider) => {
	const hero = store.getHero(side);
	const onChangeSpeed = (e: React.ChangeEvent<HTMLInputElement>): void => {
		if (isSpeedMove) {
			hero.setSpeed(Number(e.currentTarget.value));
		} else {
			hero.setSpeedShooting(Number(e.currentTarget.value));
		}
	};
	const speed = isSpeedMove ? hero.getHeroSpeed : hero.getHeroSpeedShooting;
	return (
		<label>
			<p>
				{isSpeedMove ? 'Скорость' : 'Скорость выстрела'}: {speed}
			</p>
			<input
				type="range"
				step={1}
				defaultValue={speed}
				style={{ accentColor: hero.color }}
				onChange={onChangeSpeed}
			/>
		</label>
	);
});

export default Slider;
