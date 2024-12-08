import './slider.style.sass';
import { IHeroModel } from '@/model/types';
import { observer } from 'mobx-react-lite';

interface ISlider {
	isSpeedMove: boolean;
	hero: IHeroModel;
}

const Slider = observer(({ hero, isSpeedMove }: ISlider) => {
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
				value={speed}
				style={{ accentColor: hero.color }}
				onChange={onChangeSpeed}
			/>
		</label>
	);
});

export default Slider;
