import './heroSettings.style.sass';
import { observer } from 'mobx-react-lite';
import { IHeroModel } from '@/model/types';
import Slider from './ui/slider/slider';

interface IHeroStat {
	isReverse?: boolean;
	hero: IHeroModel;
}

const HeroSettings = observer(({ hero, isReverse = false }: IHeroStat) => {
	return (
		<div className={'hero-settings' + (isReverse ? ' reverse' : '')}>
			<Slider hero={hero} isSpeedMove={true} />
			<Slider hero={hero} isSpeedMove={false} />
		</div>
	);
});

export default HeroSettings;
