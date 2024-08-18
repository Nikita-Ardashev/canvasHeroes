import { TSideHero } from '@/model/types';
import { observer } from 'mobx-react-lite';
import './heroStat.style.sass';
import { store } from '@/store/store';

interface IHeroStat {
	side: TSideHero;
}

const HeroStat = observer(({ side }: IHeroStat) => {
	const hero = store.getHero(side);
	return (
		<div className="command-count">
			<p>
				Команада: <span style={{ color: side }}>{side}</span>
			</p>
			<p>Кол-во здоровья: {hero.getHeroHP}</p>
			<p>Кол-во поподаний: {hero.getHeroCountShooting}</p>
		</div>
	);
});

export default HeroStat;
