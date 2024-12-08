import './App.style.sass';
import { Canvas } from './components/canvas';
import { Header } from './components/header';
import { HeroSettings } from './components/heroSettings';
import { HeroStat } from './components/heroStat';
import { store } from './store/store';

const App = () => {
	const heroes = store.getHeroes;
	return (
		<>
			<Header />
			<div className="game-zone">
				<div>
					{heroes.map((h, i) => (
						<HeroStat key={`${h.id}-${i}`} {...h} />
					))}
				</div>
				<div>
					{heroes.map((h, i) => (
						<HeroSettings
							key={`${h.id}-${i}`}
							hero={h}
							isReverse={i % 2 !== 0}
						/>
					))}
				</div>
				<Canvas />
			</div>
		</>
	);
};

export default App;
