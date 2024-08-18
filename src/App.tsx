import './App.style.sass';
import { Canvas } from './components/canvas';
import { Header } from './components/header';
import { HeroSettings } from './components/heroSettings';
import { HeroStat } from './components/heroStat';

const App = () => {
	return (
		<>
			<Header />
			<div className="game-zone">
				<div>
					<HeroStat side="blue" />
					<HeroStat side="red" />
				</div>
				<div>
					<HeroSettings side="blue" />
					<HeroSettings side="red" isReverse />
				</div>
				<Canvas />
			</div>
		</>
	);
};

export default App;
