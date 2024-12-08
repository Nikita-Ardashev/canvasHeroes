import { IHeroModel } from '@/model/types';
import { observer } from 'mobx-react-lite';
import './heroStat.style.sass';

const HeroStat = observer((hero: IHeroModel) => {
	return (
		<div className="command-count">
			<p>
				Команада: <span style={{ color: hero.color }}>{hero.color}</span>
			</p>
			<p>Кол-во здоровья: {hero.healthPoints}</p>
			<p>Кол-во поподаний: {hero.countShooting}</p>
		</div>
	);
});

export default HeroStat;
