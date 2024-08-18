import './heroSettings.style.sass';
import { observer } from 'mobx-react-lite';
import { TSideHero } from '@/model/types';
import Slider from './ui/slider/slider';

interface IHeroStat {
	isReverse?: boolean;
	side: TSideHero;
}

const HeroSettings = observer(({ side, isReverse = false }: IHeroStat) => {
	return (
		<div className={'hero-settings' + (isReverse ? ' reverse' : '')}>
			<Slider side={side} isSpeedMove={true} />
			<Slider side={side} isSpeedMove={false} />
		</div>
	);
});

export default HeroSettings;
